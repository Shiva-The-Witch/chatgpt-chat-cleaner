const openButton = document.querySelector("#open-cleaner");
const statusBox = document.querySelector("#status");

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  statusBox.textContent = "Opening…";

  chrome.runtime.sendMessage({ type: "OPEN_CHAT_CLEANER" }, (response) => {
    if (chrome.runtime.lastError) {
      statusBox.textContent = chrome.runtime.lastError.message;
      openButton.disabled = false;
      return;
    }

    if (!response?.ok) {
      statusBox.textContent = response?.error || "Unable to open the extension.";
      openButton.disabled = false;
      return;
    }

    statusBox.textContent = "";
    setTimeout(() => window.close(), 450);
  });
});
