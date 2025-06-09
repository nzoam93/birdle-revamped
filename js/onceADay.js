export function markGamePlayedToday() {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'
  localStorage.setItem("gamePlayedDate", today);
}

// has the game been played today?
export function hasPlayedToday() {
  const today = new Date().toISOString().split("T")[0];
  const storedDate = localStorage.getItem("gamePlayedDate");
  if (storedDate === today) {
    startTimer()
  }
  return storedDate === today;
}

export let timerInterval = 0;

function startTimer() {
  const timer = document.getElementById("timer");

  function updateTimer() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0); // set to midnight of tomorrow

    const diff = tomorrow - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  function pad(num) { // so it formats like 07 instead of 7
    return num.toString().padStart(2, '0');
  }

  updateTimer(); // initial call (so it isn't delayed)
  timerInterval = setInterval(updateTimer, 1000); // update every second
}

window.addEventListener("pagehide", () => {
    clearInterval(timerInterval);
});
