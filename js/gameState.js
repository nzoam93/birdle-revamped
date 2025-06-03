export let currentGuess = [];
export let gameOver = false;
export let secretWord = "";
export let numRows = 6;
export let wordLength = 5;
export let numberOfGuesses = 0;
export let dictionary = [];

export function setCurrentGuess(guess) {
  currentGuess = guess;
  console.log(currentGuess)
}
export function setGameOver(value) {
  gameOver = value;
}
export function setSecretWord(word) {
  secretWord = word;
  wordLength = word.length;
}
export function setNumberOfGuesses(n) {
  numberOfGuesses = n;
}
export function setDictionary(dict) {
  dictionary = dict;
}
