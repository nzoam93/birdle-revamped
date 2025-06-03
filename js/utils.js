export function shakeRow(rowId) {
  const row = document.getElementById(rowId);
  row.classList.add('shake');

  // Remove the class after animation ends so it can be triggered again later
  row.addEventListener('animationend', () => {
    row.classList.remove('shake');
  }, { once: true });
}

export function showAlert(message, duration = 2000, position=15) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.classList.add("show");
    alertBox.style.top = `${position}vh`;  // dynamically set position

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, duration);
}
