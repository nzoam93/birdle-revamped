//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, setSecretWord, setDictionary, numberOfGuesses, secretWord } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";
import { fetchBirdImage } from "./birdFetch.js";

// secretWord
const birdWords = [
  "Booby","Crane","Eagle","Egret","Finch","Goose","Grebe","Heron","Quail","Raven","Robin","Stork","Swift"
];

const completeBirdWords = [
  "Argus","Asity","Batis","Besra","Booby","Brant","Carib","Comet","Crake","Crane","Diver","Eagle","Egret","Eider","Fairy","Finch","Galah","Goose","Grass","Grebe","Heron","Hobby","Junco","Maleo","Mango","Mesia","Miner","Minla","Monal","Murre","Munia","Noddy","Ouzel","Owlet","Pewee","Pipit","Pitta","Potoo","Prion","Quail","Raven","Robin","Scaup","Sibia","Snipe","Stilt","Stint","Stork","Swift","Sylph","Topaz","Tsuru","Vanga","Veery","Vireo"
]

let randomWord = birdWords[Math.floor(Math.random() * birdWords.length)];
setSecretWord(randomWord.toUpperCase())


fetch('./word-bank.txt')
  .then(res => res.text())
  .then(text => {
    // set the dictionary of words to the allowed list of words
    const dict = text.split('\n').map(word => word.trim().toUpperCase());
    setDictionary(dict)

    //create the board and keyboard
    createBoard(numRows, wordLength);
    createKeyboard();

    //allow the board to be dynamic to not just 6x5
    const board = document.getElementById("board");
    board.style.setProperty("--numRows", numRows);
    board.style.setProperty("--wordLength", wordLength);
  });

// event listener - keydown
document.addEventListener("keydown", handleKey);

// event listener - share button
document.getElementById("shareBtn").addEventListener("click", () => {
    const text = generateShareText(numberOfGuesses);
    navigator.clipboard.writeText(text).then(() => {
        showAlert("Result copied to clipboard", 4000, 50);
    });
});

//birdle related
document.getElementById("bird").style.filter = "blur(15px)";
fetchBirdImage(secretWord).then(url => {
    if (url) {
       document.getElementById("bird").src = url;
    }
});
