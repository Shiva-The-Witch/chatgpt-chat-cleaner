chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== "OPEN_CHAT_CLEANER") {
    return false;
  }

  (async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id || !tab.url) {
      throw new Error("No active browser tab was found.");
    }

    const url = new URL(tab.url);
    const allowedHosts = new Set(["chatgpt.com", "chat.openai.com"]);
    if (!allowedHosts.has(url.hostname)) {
      throw new Error("Open a ChatGPT page before launching the extension.");
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["page-app.js"],
      world: "MAIN"
    });

    sendResponse({ ok: true });
  })().catch((error) => {
    sendResponse({ ok: false, error: error?.message || "Unable to open the extension." });
  });

  return true;
});
