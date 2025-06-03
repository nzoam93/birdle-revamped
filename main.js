// variables
const secretWord = "ROBIN"
let currentGuess = [];
let numberOfGuesses = 0;
let numRows = 6;
let wordLength = secretWord.length;
let gameOver = false;

//create the board
function createBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < numRows * wordLength; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", `square-${i}`);
        board.appendChild(square);
    }
}

function createKeyboard(){
    const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"]
    ];
    const keyboardContainer = document.getElementById("keyboard");
    // keyboardContainer.innerHTML = "";

    for (const row of keyboardLayout){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        for (const key of row) {
            const keyButton = document.createElement("button");
            keyButton.textContent = key;
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
        const square = document.getElementById(`square-${numberOfGuesses * wordLength + i}`);
        square.textContent = currentGuess[i] || "";
    }
}

//check the guess
function checkGuess(){
    let guess = currentGuess.join("")
    const letterCount = {}


    for (let char of secretWord) { //used to keep track of words with multiple of the same letter
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // First pass: determine the green letters
    for (let i = 0; i < wordLength; i++) {
        const indexOffset = numberOfGuesses * wordLength;
        const square = document.getElementById(`square-${indexOffset + i}`);
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
        const indexOffset = numberOfGuesses * wordLength;
        const square = document.getElementById(`square-${indexOffset + i}`);
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


document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    createKeyboard();
    const board = document.getElementById("board");
    board.style.setProperty("--numRows", numRows);
    board.style.setProperty("--wordLength", wordLength)
});
