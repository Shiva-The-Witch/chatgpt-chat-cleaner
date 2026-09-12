const LANGUAGE_KEY = "chat-cleaner-popup-language-v1";

const STRINGS = {
  en: {
    title: "Chat Cleaner & Organizer",
    description: "Organize and manage ChatGPT conversations",
    open: "Open cleaner",
    opening: "Opening…",
    openError: "Unable to open the extension.",
    switchLanguage: "Switch to Persian"
  },
  fa: {
    title: "پاک‌ساز و سامان‌دهنده چت",
    description: "مدیریت و دسته‌بندی گفتگوهای ChatGPT",
    open: "باز کردن پاک‌ساز",
    opening: "در حال باز کردن…",
    openError: "افزونه باز نشد.",
    switchLanguage: "تغییر زبان به انگلیسی"
  }
};

const openButton = document.querySelector("#open-cleaner");
const statusBox = document.querySelector("#status");
const languageToggle = document.querySelector("#language-toggle");
const appTitle = document.querySelector("#app-title");
const appDescription = document.querySelector("#app-description");

let language = getInitialLanguage();
applyLanguage(language, false);

chrome.runtime.sendMessage({ type: "GET_CHAT_CLEANER_LANGUAGE" }, (response) => {
  if (chrome.runtime.lastError) return;
  if (response?.ok && (response.language === "fa" || response.language === "en")) {
    applyLanguage(response.language);
  }
});

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    if (saved === "fa" || saved === "en") return saved;
  } catch {}

  const preferred = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
  return preferred.startsWith("fa") ? "fa" : "en";
}

function t(key) {
  return STRINGS[language]?.[key] ?? STRINGS.en[key] ?? key;
}

function applyLanguage(nextLanguage, persist = true) {
  language = nextLanguage === "fa" ? "fa" : "en";
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.title = language === "fa" ? "پاک‌ساز و سامان‌دهنده چت" : "Chat Cleaner & Organizer";

  appTitle.textContent = t("title");
  appDescription.textContent = t("description");
  openButton.textContent = t("open");
  languageToggle.textContent = language === "fa" ? "EN" : "فا";
  languageToggle.setAttribute("aria-label", t("switchLanguage"));
  languageToggle.title = t("switchLanguage");

  if (persist) {
    try { localStorage.setItem(LANGUAGE_KEY, language); } catch {}
  }
}

languageToggle.addEventListener("click", () => {
  applyLanguage(language === "fa" ? "en" : "fa");
  statusBox.textContent = "";
  chrome.runtime.sendMessage({ type: "SET_CHAT_CLEANER_LANGUAGE", language }, () => {
    void chrome.runtime.lastError;
  });
});

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  statusBox.textContent = t("opening");

  chrome.runtime.sendMessage({ type: "OPEN_CHAT_CLEANER", language }, (response) => {
    if (chrome.runtime.lastError) {
      statusBox.textContent = chrome.runtime.lastError.message;
      openButton.disabled = false;
      return;
    }

    if (!response?.ok) {
      statusBox.textContent = response?.error || t("openError");
      openButton.disabled = false;
      return;
    }

    statusBox.textContent = "";
    setTimeout(() => window.close(), 450);
  });
});
