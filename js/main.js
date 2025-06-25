//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, setSecretWord, setDictionary, numberOfGuesses, secretWord, setCurrentGuess, setNumberOfGuesses, setGameOver, setGuessResults } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";
import { fetchBirdImage, preloadBirdSound } from "./birdFetch.js";
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
    let practice = button.classList.contains("practice") ? true : false
    newGame(difficulty, practice);
  });
});

// event listener - play bird call
// const birdCallButton = document.getElementById("playBirdSound");
// birdCallButton.addEventListener("click", () => {
//   //bird sounds
//     playPreloadedBirdSound(secretWord);
// })

// bird options

export const birdWordsEasy = [
  "Booby", "Crane","Eagle", "Egret", "Finch", "Goose", "Heron", "Quail", "Raven", "Robin", "Stork", "Scaup",
  "Condor", "Falcon", "Magpie", "Osprey", "Parrot", "Pigeon", "Puffin"
];

export const birdWordsHard = [
  "Asity", "Batis", "Besra", "Carib", "Crake", "Fairy", "Galah", "Grebe", "Hobby", "Maleo", "Mango", "Mesia", "Miner", "Minla", "Monal", "Munia", "Noddy", "Ouzel", "Potoo", "Prion","Sibia","Stint","Sylph","Topaz","Vanga","Veery",
  "Avocet", "Bulbul", "Curlew", "Gannet", "Godwit", "Jacana", "Plover", "Towhee"
]

//Once a day features
window.addEventListener("DOMContentLoaded", () => {
  if (hasPlayedToday()) {
    // Game was already played today — show message
    document.getElementById("beginningInfoScreen").style.display = "none";
    document.getElementById("alreadyPlayedMessage").style.display = "block";
  } else {
    // Game can be played — show game
    document.getElementById("game").style.display = "block";
    document.getElementById("alreadyPlayedMessage").style.display = "none";
  }
});

function getTodaysWord(difficulty) {
  const now = new Date();
  const startDate = new Date("2025-06-09");
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  const arrayToUse = difficulty === 'easy' ? birdWordsEasy : birdWordsHard;
  const index = daysSinceStart % arrayToUse.length;
  return arrayToUse[index];
}

function chooseWord(difficulty, practice=false){
  if (!practice){
    let todaysWord = getTodaysWord(difficulty);
    setSecretWord(todaysWord.toUpperCase());
  }
  else {
  // choose a random word
    if (difficulty === "easy"){
      let randomWord = birdWordsEasy[Math.floor(Math.random() * birdWordsEasy.length)];
      setSecretWord(randomWord.toUpperCase())
    }
    else {
      let randomWord = birdWordsHard[Math.floor(Math.random() * birdWordsHard.length)];
      setSecretWord(randomWord.toUpperCase())
    }
  }
  return secretWord;
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

  document.getElementById("playBirdSound").classList.add("visible");

  //remove board blur
  document.getElementById("board-container").classList.remove("blur");


}



function loadDictionaryAndInitializeBoard(wordFilePath) {
  fetch(wordFilePath)
    .then(res => res.text())
    .then(text => {
      const fileWords = text.split('\n').map(word => word.trim().toUpperCase());
      const allBirdWords = [...birdWordsEasy, ...birdWordsHard].map(word => word.toUpperCase());
      const dict = [...new Set([...fileWords, ...allBirdWords])];
      setDictionary(dict);

      // Create board and keyboard
      createBoard(numRows, wordLength);
      createKeyboard();

      // Make board dimensions dynamic
      const board = document.getElementById("board");
      board.style.setProperty("--numRows", numRows);
      board.style.setProperty("--wordLength", wordLength);

      // alter sizes of squares based on word length
      if (secretWord.length === 5){
        let squares = document.querySelectorAll('.square');
        squares.forEach(square => {
          square.style.height = '60px';
          square.style.width = '60px';
          square.style.fontSize = '32px';
        });
      }
      if (secretWord.length === 6){
        let squares = document.querySelectorAll('.square');
        squares.forEach(square => {
          square.style.height = '50px';
          square.style.width = '50px';
          square.style.fontSize = '28px';
        });
      }
    });
}


// Game Logic
function newGame(difficulty, practice){
  // reset to new game
  resetGameState()

  // choose a word
  let chosenBird = chooseWord(difficulty, practice)

  // bird sounds (load sound to use later asyncrhonously)
  preloadBirdSound(chosenBird);

  // load dictionary and initalize board
  const wordFilePath = chosenBird.length === 5 ? './word-bank.txt' : './6_letter_words.txt';
  loadDictionaryAndInitializeBoard(wordFilePath);

  //birdle blur
  document.getElementById("bird").style.filter = "blur(20px)";
  fetchBirdImage(secretWord).then(url => {
      if (url) {
        document.getElementById("bird").src = url;
      }
  });
}
