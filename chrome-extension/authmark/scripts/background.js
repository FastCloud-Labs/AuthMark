
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    config.getStorage().then(features => {
      chrome.storage.local.set(features);
    });
  }

  if (details.reason === "update") {

  }
  chrome.action.setBadgeBackgroundColor({ color: [240, 104, 104, 1] });
  chrome.action.setBadgeText({ text: "new" });

});

chrome.runtime.onMessage.addListener((message) => {
  if (message.popupOpen) {
    chrome.action.setBadgeText({ text: "" });
  }
});
 
