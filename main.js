// variables

let dictionary = [];

fetch('/word-bank.txt')
  .then(res => res.text())
  .then(text => {
    dictionary = text.split('\n').map(word => word.trim().toUpperCase());
  });


const secretWord = "ROBIN"
let currentGuess = [];
let numberOfGuesses = 0;
let numRows = 6;
let wordLength = secretWord.length;
let gameOver = false;

//create the board
function createBoard() {
    const board = document.getElementById("board");
    // for (let i = 0; i < numRows * wordLength; i++){
    //     const square = document.createElement("div");
    //     square.classList.add("square");
    //     square.setAttribute("id", `square-${i}`);
    //     board.appendChild(square);
    // }
    for (let row = 0; row < numRows; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.setAttribute("id", `row-${row}`);

        for (let col = 0; col < wordLength; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", `square-${row}-${col}`);
            rowDiv.appendChild(square);
        }
    board.appendChild(rowDiv);
    }
}

function createKeyboard(){
    const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
    ];
    const keyboardContainer = document.getElementById("keyboard");
    // keyboardContainer.innerHTML = "";

    for (const row of keyboardLayout){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        for (const key of row) {
            const keyButton = document.createElement("button");
            const display = key === "Backspace" ? "⌫" : key;
            keyButton.textContent = display;
            keyButton.setAttribute("data-key", key);
            keyButton.classList.add("key");

            keyButton.addEventListener("click", () => {
                keyButton.blur() //removes focus so it doesn't hang on the next word
                handleKey({key: key})
            });

            rowDiv.appendChild(keyButton);
        }
        keyboardContainer.appendChild(rowDiv)
    }
}


// handle key presses
document.addEventListener("keydown", handleKey);

function handleKey(e) {
    const key = e.key.toUpperCase() || e;
    if (!gameOver){
         if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength){ //regex
        currentGuess.push(key);
        updateBoard();
        }
        else if(key === "BACKSPACE") {
            currentGuess.pop();
            updateBoard();
        }
        else if (key === "ENTER" && currentGuess.length === wordLength){
            checkGuess();
        }
    }
}

// update the board
function updateBoard(){
    for (let i = 0; i < wordLength; i++) {
        const square = document.getElementById(`square-${numberOfGuesses}-${i}`);
        square.textContent = currentGuess[i] || "";
    }
}

//check the guess
function checkGuess(){
    let guess = currentGuess.join("")
    const letterCount = {}

     // Check if guess is in dictionary of words
    if (!dictionary.includes(guess)) {
        shakeRow(`row-${numberOfGuesses}`)
        return; // Exit early, don't process the guess
    }


    for (let char of secretWord) { //used to keep track of words with multiple of the same letter
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // First pass: determine the green letters
    for (let i = 0; i < wordLength; i++) {
        const square = document.getElementById(`square-${numberOfGuesses}-${i}`);
        const letter = currentGuess[i];
        const keyButton = document.querySelector(`button[data-key="${letter}"]`);
        if (letter === secretWord[i]) {
            square.classList.add("correct");
            letterCount[letter]-- // don't allow the same letter to be counted twice

            // update the keyboard
            if (keyButton) {
                keyButton.classList.remove("half-right", "wrong");
                keyButton.classList.add("correct");
            }
        }
    }

    //Second pass: determine the yellow letters
    for (let i = 0; i < wordLength; i++) {
        const square = document.getElementById(`square-${numberOfGuesses}-${i}`);
        const letter = currentGuess[i];
        const keyButton = document.querySelector(`button[data-key="${letter}"]`);
        if (letter !== secretWord[i]) {
            if (secretWord.includes(letter) && letterCount[letter] > 0){
                square.classList.add("half-right");
                letterCount[letter]--;

                //update keyboard color
                if (keyButton && !keyButton.classList.contains("correct")) {
                    keyButton.classList.remove("wrong");
                    keyButton.classList.add("half-right");
                }
            }
            else {
                square.classList.add("wrong");

                //update keyboard color
                if (keyButton && !keyButton.classList.contains("correct") && !keyButton.classList.contains("half-right")) {
                    keyButton.classList.add("wrong");
                }
            }
        }
    }

    //check to see if the word was right
    if (guess === secretWord) {
        document.getElementById("gameInfo").textContent = "Congrats, you got it right!"
        gameOver = true;
    }
    else {
        numberOfGuesses ++;
        if (numberOfGuesses === 6) {
            document.getElementById("gameInfo").textContent = `Sorry, you didn't get it. The secret word was ${secretWord}`
            gameOver = true;
        }
    }

    //reset the guess array
    currentGuess = [];
}

function shakeRow(rowId) {
  const row = document.getElementById(rowId);
  row.classList.add('shake');

  // Remove the class after animation ends so it can be triggered again later
  row.addEventListener('animationend', () => {
    row.classList.remove('shake');
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    createKeyboard();
    const board = document.getElementById("board");
    board.style.setProperty("--numRows", numRows);
    board.style.setProperty("--wordLength", wordLength)
});
