export function shakeRow(rowId) {
  const row = document.getElementById(rowId);
  row.classList.add('shake');

  // Remove the class after animation ends so it can be triggered again later
  row.addEventListener('animationend', () => {
    row.classList.remove('shake');
  }, { once: true });
}
