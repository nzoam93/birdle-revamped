import {currentGuess, secretWord, wordLength, numberOfGuesses, dictionary, setCurrentGuess, setGameOver, setNumberOfGuesses, guessResults, gameOver, setGameWon } from "./gameState.js"
import { shakeRow, showAlert } from "./utils.js"
import { fetchBirdFact } from "./birdFetch.js";

//actions at the end of the game (regardless of win or lose)
function endGameActions(){
    setGameOver(true);
    document.getElementById("board-container").classList.add("blur");
    document.getElementById("shareBtn").style.display = "block";
    document.querySelectorAll(".newGameBtn").forEach(button => {
        button.style.display = "block";
    });
    document.getElementById("randomBirdFact").style.display = "block";
    fetchBirdFact(secretWord).then(birdFact => {
        document.getElementById("randomBirdFact").innerHTML = `Did you know? ${birdFact}`;
    });
}

export function checkGuess(){
    let emojiRow = []
    let guess = currentGuess.join("")
    const letterCount = {};

     // Check if guess is in dictionary of words
    if (!dictionary.includes(guess)) {
        shakeRow(`row-${numberOfGuesses}`)
        showAlert("Guess not in word list")
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
        if (letter === secretWord[i]){
            //update the emojiRow
            emojiRow.push("🟩")
        }
        if (letter !== secretWord[i]) {
            if (secretWord.includes(letter) && letterCount[letter] > 0){
                square.classList.add("half-right");
                letterCount[letter]--;

                //update keyboard color
                if (keyButton && !keyButton.classList.contains("correct")) {
                    keyButton.classList.remove("wrong");
                    keyButton.classList.add("half-right");
                }

                //update the emojiRow
                emojiRow.push("🟨")
            }
            else {
                square.classList.add("wrong");

                //update keyboard color
                if (keyButton && !keyButton.classList.contains("correct") && !keyButton.classList.contains("half-right")) {
                    keyButton.classList.add("wrong");
                }

                //update the emojiRow
                emojiRow.push("⬛")
            }
        }
    }
    guessResults.push(emojiRow)

    //check to see if the word was right
    setNumberOfGuesses(numberOfGuesses + 1);
    if (guess === secretWord) {
        showAlert("Congrats, you got it right!", 2000, 15);
        setGameWon(true);
        endGameActions();
    }
    else {
        if (numberOfGuesses === 6) {
            showAlert(`The secret word was ${secretWord}`, 2000, 15);
            setGameWon(false);
            endGameActions();
        }
    }

    //set the bird blurriness
    if (!gameOver){
        let blurFactor = 20 - numberOfGuesses * 4;
        let blurLevel = "blur("+blurFactor+"px)";
        document.getElementById("bird").style.filter = blurLevel;
    }
    else {
        let blurLevel = "blur(0px)";
        document.getElementById("bird").style.filter = blurLevel;
    }


    //reset the guess array
    setCurrentGuess([]);
}
