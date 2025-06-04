//imports
import { createBoard } from "./board.js";
import { createKeyboard } from "./keyboard.js";
import { handleKey } from "./handleKey.js";
import {numRows, wordLength, dictionary, setSecretWord, setDictionary, numberOfGuesses, secretWord } from "./gameState.js";
import { generateShareText } from "./generateShareText.js";
import { showAlert } from "./utils.js";

// const birdWords = [
//   "goose"
// ]

const birdWords = [
  "Booby","Crane","Eagle","Egret","Finch","Goose","Grebe","Heron","Quail","Raven","Robin","Stork","Swift"
];

const completeBirdWords = [
  "Argus","Asity","Batis","Besra","Booby","Brant","Carib","Comet","Crake","Crane","Diver","Eagle","Egret","Eider","Fairy","Finch","Galah","Goose","Grass","Grebe","Heron","Hobby","Junco","Maleo","Mango","Mesia","Miner","Minla","Monal","Murre","Munia","Noddy","Ouzel","Owlet","Pewee","Pipit","Pitta","Potoo","Prion","Quail","Raven","Robin","Scaup","Sibia","Snipe","Stilt","Stint","Stork","Swift","Sylph","Topaz","Tsuru","Vanga","Veery","Vireo"
]

let randomWord = birdWords[Math.floor(Math.random() * birdWords.length)];
setSecretWord(randomWord.toUpperCase())
console.log(randomWord)

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

// handle key presses
document.addEventListener("keydown", handleKey);

document.getElementById("shareBtn").addEventListener("click", () => {
    const text = generateShareText(numberOfGuesses);
    navigator.clipboard.writeText(text).then(() => {
        showAlert("Result copied to clipboard", 4000, 50);
        document.getElementById("overlay").classList.add("overlay-hidden");
    });
});

//birdle related
document.getElementById("bird").style.filter = "blur(0px)";

async function fetchBirdImage(birdName) {
  const response = await fetch(`https://api.inaturalist.org/v1/search?q=${encodeURIComponent(birdName)}&sources=taxa&taxon_id=3`);
  const data = await response.json();
  console.log(data)
  // const bird = data.results?.find(result => result.record?.default_photo && result.record?.iconic_taxon_name === "Aves");
  const bird = data.results?.find(result => {
    const record = result.record;
    return (
      record?.default_photo &&
      record?.iconic_taxon_name === "Aves" &&
      record?.rank === "species"
    );
  });
  return bird?.record?.default_photo?.medium_url || './imgs/fallback-image.jpeg';
}

fetchBirdImage(secretWord).then(url => {
    if (url) {
       document.getElementById("bird").src = url;
    }
});


// async function isBirdReal(birdName) {
//   const response = await fetch(`https://api.inaturalist.org/v1/search?q=${birdName}&sources=taxa`);
//   const data = await response.json();
//   const bird = data.results?.find(result => result.record?.default_photo);
//   return bird
// }

// async function checkBirdImages(completeBirdWords) {
//   const missingImages = [];

//   for (const bird of completeBirdWords) {
//     const imageUrl = await isBirdReal(bird);
//     if (!imageUrl) {
//       console.warn(`No image found for: ${bird}`);
//       missingImages.push(bird);
//     }
//   }

//   console.log("Birds with missing images:", missingImages);
//   return missingImages;
// }

// checkBirdImages(birdWords)
