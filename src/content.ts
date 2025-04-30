const songSelector = '[data-testid="context-item-link"]';
let lastSong = '';
let lastChangeTime = Date.now();

const observer = new MutationObserver(() => {
  console.log("MutationObserver triggered"); // Debug log
  const songEl = document.querySelector(songSelector);
  const nextButton = document.querySelector('[data-testid="control-button-skip-forward"]');

  if (!songEl) {
    console.log("Song element not found"); // Debug log
  } else {
    console.log("Song element found:", songEl.textContent); // Debug log
  }
  const currentSong = songEl?.textContent ?? '';
  // 
  if (currentSong && currentSong !== lastSong) {
    const now = Date.now();
    const timePassed = now - lastChangeTime;

    if (timePassed < 30 * 1000 || nextButton) {
      nextButton?.addEventListener('click', () => {
        console.log('🎵 Song skipped!');

      });
      console.log("🎵 Song skipped or changed too quickly:", currentSong);
    } else {
      lastSong = currentSong;
      console.log("🎵 New song detected:", currentSong);
      lastChangeTime = now;

      // Get, increment, store
      chrome.storage.local.get(['songCount'], (result) => {
        console.log("Current song count:", result.songCount); // Debug log
        const updatedCount = (result.songCount || 0) + 1;
        console.log("Updated song count:", updatedCount); // Debug log
        chrome.storage.local.set({ songCount: updatedCount });

        // Send update to popup
        chrome.runtime.sendMessage({ songCount: updatedCount });
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("🎧 Content script running...");
