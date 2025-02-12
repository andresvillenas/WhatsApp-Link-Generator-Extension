// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generateWhatsApp",
    title: "Generate WhatsApp Link",
    contexts: ["selection"]
  });
});

// Listen for click events on the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generateWhatsApp" && info.selectionText) {
    // Remove non-numeric characters from the phone number
    const phoneNumber = info.selectionText.replace(/\D/g, "");
    // Construct the WhatsApp URL
    const whatsAppUrl = `https://wa.me/${phoneNumber}`;
    
    // Open the WhatsApp link in a new tab
    chrome.tabs.create({ url: whatsAppUrl });
  }
});