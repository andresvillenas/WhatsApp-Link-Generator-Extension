function removeButton() {
  const existingButton = document.getElementById("whatsapp-link-button");
  if (existingButton) {
    existingButton.remove();
  }
}

document.addEventListener("mouseup", (event) => {
  // Don't run if the mouseup occurred on our button.
  if (event.target.closest("#whatsapp-link-button")) return;

  setTimeout(() => {
    const selectionText = window.getSelection().toString().trim();
    removeButton();
    if (selectionText) {
      const phoneNumber = selectionText.replace(/\D/g, "");
      const isValidPhone = phoneNumber.length >= 10;
      if (isValidPhone) {
        const btn = document.createElement("button");
        btn.id = "whatsapp-link-button";
        // Prevent website styles from interfering.
        btn.style.all = "unset";
        // Add our custom styles.
        btn.style.position = "absolute";
        btn.style.top = event.pageY + 5 + "px";
        btn.style.left = event.pageX + 5 + "px";
        btn.style.zIndex = 9999;
        btn.style.padding = "6px 10px";
        btn.style.backgroundColor = "#29A71A";
        btn.style.color = "white";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.style.fontFamily = "Arial, sans-serif";
        btn.style.fontSize = "14px";
        // Create content with icon for better alignment.
        btn.innerHTML = `<img src="${chrome.runtime.getURL('whatsapp.png')}" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;">Send WhatsApp`;

        btn.addEventListener("click", () => {
          chrome.runtime.sendMessage({ action: "openWhatsApp", phoneNumber: phoneNumber });
          removeButton();
        });

        document.body.appendChild(btn);
      }
    }
  }, 10);
});

document.addEventListener("mousedown", (event) => {
  if (!event.target.closest("#whatsapp-link-button")) {
    removeButton();
  }
});