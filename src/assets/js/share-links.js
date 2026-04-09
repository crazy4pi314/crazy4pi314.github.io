document.querySelectorAll("[data-copy-link]").forEach(button => {
  button.addEventListener("click", async () => {
    const url = button.dataset.copyUrl;
    const status = button.closest(".share-panel")?.querySelector("[data-copy-status]");

    if (!url || !status) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      status.textContent = "Link copied to clipboard.";
    } catch {
      status.textContent = "Copy failed. You can still copy the URL from the address bar.";
    }
  });
});
