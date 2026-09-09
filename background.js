const LANGUAGE_KEY = "chat-cleaner-language-v1";

const ERRORS = {
  en: {
    noActiveTab: "No active browser tab was found.",
    openChatGPT: "Open a ChatGPT page before launching the extension.",
    openFailed: "Unable to open the extension."
  },
  fa: {
    noActiveTab: "تب فعال پیدا نشد.",
    openChatGPT: "قبل از اجرای افزونه، یک صفحه ChatGPT باز کن.",
    openFailed: "افزونه باز نشد."
  }
};

const allowedHosts = new Set(["chatgpt.com", "chat.openai.com"]);

async function getActiveChatGPTTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) return null;
  try {
    const url = new URL(tab.url);
    return allowedHosts.has(url.hostname) ? tab : null;
  } catch {
    return null;
  }
}

async function setPageLanguage(tabId, language) {
  await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: (key, value) => {
      try { localStorage.setItem(key, value); } catch {}
      window.dispatchEvent(new CustomEvent("chat-cleaner-language-change", { detail: value }));
    },
    args: [LANGUAGE_KEY, language]
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message?.type) return false;

  if (message.type === "GET_CHAT_CLEANER_LANGUAGE") {
    (async () => {
      const tab = await getActiveChatGPTTab();
      if (!tab) return sendResponse({ ok: false });
      const [{ result } = {}] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        world: "MAIN",
        func: (key) => {
          try { return localStorage.getItem(key); } catch { return null; }
        },
        args: [LANGUAGE_KEY]
      });
      sendResponse({ ok: true, language: result === "fa" ? "fa" : result === "en" ? "en" : null });
    })().catch(() => sendResponse({ ok: false }));
    return true;
  }

  if (message.type === "SET_CHAT_CLEANER_LANGUAGE") {
    (async () => {
      const language = message?.language === "fa" ? "fa" : "en";
      const tab = await getActiveChatGPTTab();
      if (tab) await setPageLanguage(tab.id, language);
      sendResponse({ ok: true });
    })().catch(() => sendResponse({ ok: false }));
    return true;
  }

  if (message.type !== "OPEN_CHAT_CLEANER") return false;

  const language = message?.language === "fa" ? "fa" : "en";
  const strings = ERRORS[language];

  (async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab.url) {
      throw new Error(strings.noActiveTab);
    }

    const url = new URL(tab.url);
    if (!allowedHosts.has(url.hostname)) {
      throw new Error(strings.openChatGPT);
    }

    await setPageLanguage(tab.id, language);
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["queue-runner.js"],
      world: "MAIN"
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["page-app.js"],
      world: "MAIN"
    });

    sendResponse({ ok: true });
  })().catch((error) => {
    sendResponse({ ok: false, error: error?.message || strings.openFailed });
  });

  return true;
});
