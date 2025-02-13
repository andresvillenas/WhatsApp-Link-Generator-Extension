document.getElementById("generateBtn").addEventListener("click", () => {
  const input = document.getElementById("phoneNumber");
  const phoneNumber = input.value.replace(/\D/g, "");
  if (phoneNumber.length >= 10) {
    chrome.runtime.sendMessage({ action: "openWhatsApp", phoneNumber: phoneNumber });
    window.close(); // Close the popup after sending the message.
  } else {
    alert("Please enter a valid phone number with at least 10 digits.");
  }
});