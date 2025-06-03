export function shakeRow(rowId) {
  const row = document.getElementById(rowId);
  row.classList.add('shake');

  // Remove the class after animation ends so it can be triggered again later
  row.addEventListener('animationend', () => {
    row.classList.remove('shake');
  }, { once: true });
}

export function showAlert(message, duration = 2000, position=20) {
    const alertBox = document.getElementById("custom-alert");
    alertBox.textContent = message;
    alertBox.style.top = `${position}px`;  // dynamically set position

    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, duration);



}
