//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, dictionary, setSecretWord, setDictionary, numberOfGuesses } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";

fetch('./word-bank.txt')
  .then(res => res.text())
  .then(text => {
    // set the dictionary of words to the allowed list of words
    const dict = text.split('\n').map(word => word.trim().toUpperCase());
    setDictionary(dict)

    //set our word to a randomly selected word from the dictionary
    // const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    let randomWord = "GOOSE"
    setSecretWord(randomWord)

    //create the board and keyboard
    createBoard(numRows, wordLength);
    createKeyboard();

    //allow the board to be dynamic to not just 6x5
    const board = document.getElementById("board");
    board.style.setProperty("--numRows", numRows);
    board.style.setProperty("--wordLength", wordLength);
  });

// handle key presses
document.addEventListener("keydown", handleKey);

document.getElementById("shareBtn").addEventListener("click", () => {
    const text = generateShareText(numberOfGuesses);
    navigator.clipboard.writeText(text).then(() => {
        showAlert("Result copied to clipboard", 4000, 860)
    });
});
