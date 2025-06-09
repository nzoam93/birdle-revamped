//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, setSecretWord, setDictionary, numberOfGuesses, secretWord, setCurrentGuess, setNumberOfGuesses, setGameOver, setGuessResults } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";
import { fetchBirdImage } from "./birdFetch.js";
import { hasPlayedToday, markGamePlayedToday, timerInterval } from "./onceADay.js";

// event listener - keydown
document.addEventListener("keydown", handleKey);

// event listener - share button
document.getElementById("shareBtn").addEventListener("click", () => {
    const text = generateShareText(numberOfGuesses);
    navigator.clipboard.writeText(text).then(() => {
        showAlert("Result copied to clipboard. Paste to share results!", 4000, 22);
    });
});

// event listener - new game
const newGameButtons = document.querySelectorAll(".newGameBtn");
newGameButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Determine difficulty by checking the classList
    let difficulty = button.classList.contains("easy") ? "easy" : "hard";
    newGame(difficulty);
  });
});

// bird options
export const birdWordsEasy = [
  "Booby","Crane","Eagle","Egret","Finch","Goose","Heron","Quail","Raven","Robin","Stork","Swift", "Scaup", "Ducks"
];

export const birdWordsHard = [
  "Asity","Batis","Besra","Carib","Crake","Diver","Fairy","Galah","Grebe","Hobby","Maleo","Mango","Mesia","Miner","Minla","Monal","Munia","Noddy","Ouzel","Potoo","Prion","Sibia","Stint","Sylph","Topaz","Vanga","Veery"
]

function getTodaysWord(difficulty) {
  const now = new Date();
  const startDate = new Date("2025-06-09");
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const arrayToUse = difficulty === 'easy' ? birdWordsEasy : birdWordsHard;
  const index = daysSinceStart % arrayToUse.length;
  return arrayToUse[index];
}

function resetGameState(){
  // hide the info screen and bird fact unhide the bird
  document.getElementById('infoScreen').style.display = "none";
  document.getElementById("randomBirdFact").style.display = "none";
  document.getElementById('bird').style.display = "block";

  // ready the alreadyPlayed screen
  document.getElementById("alreadyPlayedMessage").style.display = "none";
  clearInterval(timerInterval);

  // reset game state
  setCurrentGuess([]);
  setNumberOfGuesses(0);
  setGameOver(false);
  setGuessResults([]);
  markGamePlayedToday();


  //reset board and keyboard
  const board = document.getElementById("board");
  board.innerHTML = "";
  const keyboardContainer = document.getElementById("keyboard");
  keyboardContainer.innerHTML = "";

  //hide the buttons again
  document.getElementById("shareBtn").style.display = "none";
  document.querySelectorAll(".newGameBtn").forEach(button => {
    button.style.display = "none";
  });
  //remove board blur
  document.getElementById("board-container").classList.remove("blur");
}

function chooseWord(difficulty){
  let todaysWord = getTodaysWord(difficulty);
  setSecretWord(todaysWord.toUpperCase());

  // choose a random word
    // if (difficulty === "easy"){
    //   let randomWord = birdWordsEasy[Math.floor(Math.random() * birdWordsEasy.length)];
    //   setSecretWord(randomWord.toUpperCase())
    // }
    // else {
    //   let randomWord = birdWordsHard[Math.floor(Math.random() * birdWordsHard.length)];
    //   setSecretWord(randomWord.toUpperCase())
    // }
}

// Game Logic
function newGame(difficulty){
  // reset to new game
  resetGameState()

  // choose a word
  chooseWord(difficulty)

  fetch('./word-bank.txt')
    .then(res => res.text())
    .then(text => {
      // set the dictionary of words to the allowed list of words
      const fileWords = text.split('\n').map(word => word.trim().toUpperCase());
      const allBirdWords = [...birdWordsEasy, ...birdWordsHard].map(word => word.toUpperCase())
      const dict = [...new Set([...fileWords, ...allBirdWords])]
      setDictionary(dict)

      //create the board and keyboard
      createBoard(numRows, wordLength);
      createKeyboard();

      //allow the board to be dynamic to not just 6x5
      const board = document.getElementById("board");
      board.style.setProperty("--numRows", numRows);
      board.style.setProperty("--wordLength", wordLength);
    });

  //birdle blur
  document.getElementById("bird").style.filter = "blur(20px)";
  fetchBirdImage(secretWord).then(url => {
      if (url) {
        document.getElementById("bird").src = url;
      }
  });
}


//Once a day features
window.addEventListener("DOMContentLoaded", () => {
  if (hasPlayedToday()) {
    // Game was already played today — show message or block game
    document.getElementById("infoScreen").style.display = "none";
    // document.getElementById("game").style.display = "block"
    document.getElementById("alreadyPlayedMessage").style.display = "block";
  } else {
    // Game can be played — show game
    document.getElementById("game").style.display = "block";
    document.getElementById("alreadyPlayedMessage").style.display = "none";
  }
});
