//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, setSecretWord, setDictionary, numberOfGuesses, secretWord, currentGuess, gameOver, setCurrentGuess, setNumberOfGuesses, setGameOver } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";
import { fetchBirdImage } from "./birdFetch.js";

// bird options
const birdWordsEasy = [
  "Booby","Crane","Eagle","Egret","Finch","Goose","Heron","Quail","Raven","Robin","Stork","Swift"
];

const birdWordsHard = [
  "Argus","Asity","Batis","Besra","Carib","Comet","Crake","Diver","Fairy","Galah","Grass","Grebe","Hobby","Maleo","Mango","Mesia","Miner","Minla","Monal","Munia","Noddy","Ouzel","Potoo","Prion","Scaup","Sibia","Stint","Sylph","Topaz","Tsuru","Vanga","Veery"
]

// event listener - keydown
document.addEventListener("keydown", handleKey);

// event listener - share button
document.getElementById("shareBtn").addEventListener("click", () => {
    const text = generateShareText(numberOfGuesses);
    navigator.clipboard.writeText(text).then(() => {
        showAlert("Result copied to clipboard. Paste to share results!", 5000, 30);
    });
});

// event listener - new game
let difficulty = "easy";
document.getElementById('newGameBtnEasy').addEventListener("click", () => {
  difficulty = "easy";
  newGame();
})

document.getElementById('newGameBtnHard').addEventListener("click", () => {
  difficulty = "hard";
  newGame();
})

function resetGameState(){
  // reset game state
  setCurrentGuess([]);
  setNumberOfGuesses(0);
  setGameOver(false);

  //reset board and keyboard
  const board = document.getElementById("board");
  board.innerHTML = "";
  const keyboardContainer = document.getElementById("keyboard");
  keyboardContainer.innerHTML = "";

  //hide the buttons again
  document.getElementById("shareBtn").style.display = "none";
  document.getElementById("newGameBtnEasy").style.display = "none";
  document.getElementById("newGameBtnHard").style.display = "none";

  //remove board blur
  document.getElementById("board-container").classList.remove("blur");
}

// Game Logic
function newGame(){
  // reset to new game
  resetGameState()

  // choose a random word

  if (difficulty === "easy"){
    let randomWord = birdWordsEasy[Math.floor(Math.random() * birdWordsEasy.length)];
    setSecretWord(randomWord.toUpperCase())
  }
  else {
    let randomWord = birdWordsHard[Math.floor(Math.random() * birdWordsHard.length)];
    setSecretWord(randomWord.toUpperCase())
  }
  console.log(secretWord)

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



  //birdle related
  document.getElementById("bird").style.filter = "blur(20px)";
  fetchBirdImage(secretWord).then(url => {
      if (url) {
        document.getElementById("bird").src = url;
      }
  });
}

newGame()
