(() => {
  "use strict";

  const QUEUE_KEY = "chat-cleaner-native-move-queue-v1";
  const RESULT_KEY = "chat-cleaner-last-move-result-v1";
  const TOAST_ID = "chat-cleaner-move-toast";
  if (window.__chatCleanerMoveQueueRunner) return;
  window.__chatCleanerMoveQueueRunner = true;

  let running = false;

  window.addEventListener("chat-cleaner-run-native-move-queue", () => {
    setTimeout(runQueue, 50);
  });
  setTimeout(runQueue, 650);

  function readQueue() {
    try {
      const value = JSON.parse(localStorage.getItem(QUEUE_KEY) || "null");
      if (!value || value.version !== 1 || !Array.isArray(value.items)) return null;
      if (Date.now() - Number(value.startedAt || 0) > 30 * 60 * 1000) {
        localStorage.removeItem(QUEUE_KEY);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  }

  function saveQueue(queue) {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLocaleLowerCase("en-US")
      .replace(/[\u200c\u200f\u202a-\u202e]/g, "")
      .replace(/\s+/g, " ");
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function isVisible(element) {
    if (!element || !element.isConnected) return false;
    const style = getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  async function waitFor(getter, timeout = 8000, interval = 120) {
    const started = Date.now();
    while (Date.now() - started < timeout) {
      const value = getter();
      if (value) return value;
      await wait(interval);
    }
    return null;
  }

  function text(language, en, fa) {
    return language === "fa" ? fa : en;
  }

  function showToast(message, error = false) {
    let toast = document.getElementById(TOAST_ID);
    if (!toast) {
      toast = document.createElement("div");
      toast.id = TOAST_ID;
      toast.style.cssText = [
        "position:fixed",
        "z-index:2147483647",
        "right:18px",
        "bottom:18px",
        "max-width:min(440px,calc(100vw - 36px))",
        "padding:11px 14px",
        "border-radius:12px",
        "font:500 13px/1.55 ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif",
        "box-shadow:0 12px 40px rgba(0,0,0,.28)",
        "border:1px solid rgba(255,255,255,.14)",
        "background:#212121",
        "color:#ececec"
      ].join(";");
      document.documentElement.appendChild(toast);
    }
    toast.style.borderColor = error ? "rgba(255,107,107,.55)" : "rgba(16,163,127,.5)";
    toast.textContent = message;
  }

  function currentPathHasConversation(id) {
    try {
      return new RegExp(`/c/${String(id).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:/|$)`, "i").test(location.pathname);
    } catch {
      return location.pathname.includes(`/c/${id}`);
    }
  }

  function conversationUrl(item) {
    if (item.currentGizmoId) return `${location.origin}/g/${encodeURIComponent(item.currentGizmoId)}/c/${encodeURIComponent(item.id)}`;
    return `${location.origin}/c/${encodeURIComponent(item.id)}`;
  }

  function findConversationAnchor(id) {
    const suffix = `/c/${id}`;
    const anchors = Array.from(document.querySelectorAll("nav a[href], aside a[href], a[href]"));
    const exact = anchors.filter((anchor) => {
      try {
        const url = new URL(anchor.getAttribute("href") || anchor.href, location.origin);
        return url.origin === location.origin && url.pathname.endsWith(suffix) && isVisible(anchor);
      } catch {
        return false;
      }
    });
    return exact[0] || null;
  }

  function dispatchHover(element) {
    const options = { bubbles: true, cancelable: true, view: window };
    try { element.dispatchEvent(new PointerEvent("pointerover", options)); } catch {}
    try { element.dispatchEvent(new MouseEvent("mouseover", options)); } catch {}
    try { element.dispatchEvent(new MouseEvent("mouseenter", { ...options, bubbles: false })); } catch {}
  }

  function findMenuButton(anchor) {
    const containers = [
      anchor,
      anchor.closest("li"),
      anchor.closest('[data-testid]'),
      anchor.parentElement,
      anchor.parentElement?.parentElement
    ].filter(Boolean);

    for (const container of containers) {
      const candidates = Array.from(container.querySelectorAll([
        "button.__menu-item-trailing-btn",
        'button[aria-haspopup="menu"]',
        'button[aria-label*="More" i]',
        'button[aria-label*="Options" i]',
        'button[aria-label*="بیشتر"]',
        'button[aria-label*="گزینه"]',
        "button"
      ].join(","))).filter(isVisible);
      if (candidates.length) return candidates.at(-1);
    }
    return null;
  }

  function visibleMenuItems() {
    return Array.from(document.querySelectorAll('[role="menuitem"], [role="menu"] button, [data-radix-menu-content] [role="menuitem"]'))
      .filter(isVisible);
  }

  function isMoveToProjectText(value) {
    const valueNorm = normalize(value);
    return [
      "move to project",
      "move to a project",
      "add to project",
      "انتقال به پروژه",
      "انتقال به یک پروژه",
      "افزودن به پروژه"
    ].some((term) => valueNorm.startsWith(normalize(term)) || valueNorm.includes(normalize(term)));
  }

  function tryOpenSidebar() {
    const visibleSidebar = Array.from(document.querySelectorAll("nav, aside, [data-testid*=\"sidebar\" i]")).some(isVisible);
    if (visibleSidebar) return false;
    const button = Array.from(document.querySelectorAll("button")).find((candidate) => {
      if (!isVisible(candidate)) return false;
      const label = normalize(candidate.getAttribute("aria-label") || candidate.title || candidate.textContent);
      return label.includes("open sidebar") || label.includes("show sidebar") ||
        label.includes("باز کردن نوار کناری") || label.includes("نمایش نوار کناری");
    });
    if (!button) return false;
    button.click();
    return true;
  }

  async function openMoveMenu(item) {
    let anchor = await waitFor(() => findConversationAnchor(item.id), 4500);
    if (!anchor && tryOpenSidebar()) {
      await wait(500);
      anchor = await waitFor(() => findConversationAnchor(item.id), 5000);
    }
    if (!anchor) throw new Error("Conversation menu was not found in the sidebar.");

    anchor.scrollIntoView({ block: "nearest" });
    dispatchHover(anchor);
    await wait(180);

    const button = await waitFor(() => findMenuButton(anchor), 3500);
    if (!button) throw new Error("Conversation options button was not found.");
    button.click();

    const moveItem = await waitFor(
      () => visibleMenuItems().find((element) => isMoveToProjectText(element.textContent)),
      5000
    );
    if (!moveItem) throw new Error("“Move to project” is unavailable for this conversation.");
    moveItem.click();
    await wait(180);

    const target = await waitFor(() => {
      const desired = normalize(item.targetProjectName);
      return visibleMenuItems().find((element) => normalize(element.textContent) === desired) ||
        Array.from(document.querySelectorAll('[role="menu"] button, [role="menu"] [tabindex], [data-radix-menu-content] *'))
          .filter(isVisible)
          .find((element) => normalize(element.textContent) === desired);
    }, 6000);

    if (!target) throw new Error(`Project “${item.targetProjectName}” was not found in the move menu.`);
    target.click();
  }

  async function getHeaders() {
    const headers = { Accept: "application/json" };
    try {
      const response = await fetch("/api/auth/session", { credentials: "include", headers });
      if (response.ok) {
        const data = await response.json();
        const token = data?.accessToken || data?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      }
    } catch {}
    return headers;
  }

  async function projectContainsConversation(projectId, conversationId) {
    let cursor = "0";
    let page = 0;
    do {
      const params = new URLSearchParams({ cursor: cursor || "0" });
      const response = await fetch(`/backend-api/gizmos/${encodeURIComponent(projectId)}/conversations?${params}`, {
        credentials: "include",
        headers: await getHeaders()
      });
      if (!response.ok) return false;
      const data = await response.json();
      const items = Array.isArray(data?.items) ? data.items : [];
      if (items.some((item) => String(item?.id || "") === String(conversationId))) return true;
      cursor = typeof data?.cursor === "string" && data.cursor ? data.cursor : null;
      page += 1;
    } while (cursor && page < 100);
    return false;
  }

  async function verifyMove(item) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (location.pathname.includes(`/g/${item.targetNativeId}/c/${item.id}`)) return true;
      if (await projectContainsConversation(item.targetNativeId, item.id)) return true;
      await wait(850 + attempt * 250);
    }
    return false;
  }

  async function moveOne(item) {
    if (item.currentGizmoId === item.targetNativeId) return { status: "skipped", reason: "already-in-project" };
    await openMoveMenu(item);
    const verified = await verifyMove(item);
    if (!verified) throw new Error("The move could not be verified.");
    return { status: "moved" };
  }

  async function runQueue() {
    if (running) return;
    const queue = readQueue();
    if (!queue || queue.index >= queue.items.length) return;
    running = true;

    try {
      document.getElementById("chat-cleaner-root")?.remove();
      const item = queue.items[queue.index];
      const language = queue.language === "fa" ? "fa" : "en";
      showToast(text(language,
        `Moving ${queue.index + 1} of ${queue.items.length}: ${item.title}`,
        `در حال انتقال ${queue.index + 1} از ${queue.items.length}: ${item.title}`
      ));

      if (!currentPathHasConversation(item.id)) {
        saveQueue(queue);
        location.assign(conversationUrl(item));
        return;
      }

      await wait(900);
      try {
        const result = await moveOne(item);
        queue.results.push({ id: item.id, title: item.title, targetNativeId: item.targetNativeId, ...result });
      } catch (error) {
        queue.results.push({
          id: item.id,
          title: item.title,
          targetNativeId: item.targetNativeId,
          status: "failed",
          reason: String(error?.message || error || "Unknown error")
        });
      }

      queue.index += 1;
      saveQueue(queue);

      if (queue.index < queue.items.length) {
        const next = queue.items[queue.index];
        showToast(text(language,
          `Moving ${queue.index + 1} of ${queue.items.length}: ${next.title}`,
          `در حال انتقال ${queue.index + 1} از ${queue.items.length}: ${next.title}`
        ));
        await wait(500);
        location.assign(conversationUrl(next));
        return;
      }

      const moved = queue.results.filter((result) => result.status === "moved").length;
      const skipped = queue.results.filter((result) => result.status === "skipped").length;
      const failed = queue.results.filter((result) => result.status === "failed").length;
      const result = { moved, skipped, failed, results: queue.results, finishedAt: Date.now() };
      localStorage.setItem(RESULT_KEY, JSON.stringify(result));
      localStorage.removeItem(QUEUE_KEY);

      showToast(text(language,
        `Finished: ${moved} moved${skipped ? `, ${skipped} already there` : ""}${failed ? `, ${failed} failed` : ""}.`,
        `تمام شد: ${moved} منتقل شد${skipped ? `، ${skipped} مورد از قبل داخل پروژه بود` : ""}${failed ? `، ${failed} مورد ناموفق` : ""}.`
      ), failed > 0);

      if (queue.returnUrl && queue.returnUrl !== location.href) {
        await wait(1300);
        location.assign(queue.returnUrl);
      }
    } finally {
      running = false;
    }
  }
})();
