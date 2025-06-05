import {currentGuess, secretWord, wordLength, numberOfGuesses, dictionary, setCurrentGuess, setGameOver, setNumberOfGuesses, guessResults, gameOver } from "./gameState.js"
import { shakeRow, showAlert } from "./utils.js"
import { randomBirdFacts } from "./generateShareText.js"

function endGameActions(){
    // do once the game ends (regardless of win or lose)
    setGameOver(true);
    document.getElementById("board-container").classList.add("blur");
    document.getElementById("shareBtn").style.display = "block";
    document.querySelectorAll(".newGameBtn").forEach(button => {
        button.style.display = "block";
    });
    document.getElementById("randomBirdFact").style.display = "block";
    document.getElementById("randomBirdFact").innerHTML = "Did you know? " + randomBirdFacts[Math.floor(Math.random() * randomBirdFacts.length)];
}

export function checkGuess(){
    let emojiRow = []
    let guess = currentGuess.join("")
    const letterCount = {}

     // Check if guess is in dictionary of words
    if (!dictionary.includes(guess)) {
        shakeRow(`row-${numberOfGuesses}`)
        showAlert("Guess not in word list")
        return; // Exit early, don't process the guess
    }

    // keep track of words with multiple of the same letter
    for (let char of secretWord) {
        letterCount[char] = (letterCount[char] || 0) + 1;
    }

    // Determine the colors
    for (let i = 0; i < wordLength; i++) {
        const square = document.getElementById(`square-${numberOfGuesses}-${i}`);
        const letter = currentGuess[i];
        const keyButton = document.querySelector(`button[data-key="${letter}"]`);

        //green letters
        if (letter === secretWord[i]){
            square.classList.add("correct");
            letterCount[letter]-- // don't allow the same letter to be counted twice

            // update the keyboard
            if (keyButton) {
                keyButton.classList.remove("half-right", "wrong");
                keyButton.classList.add("correct");
            }

            //update the emojiRow
            emojiRow.push("🟩")
        }
        else {
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
        showAlert("Congrats, you got it right!", 2000, 15)
        endGameActions()
    }
    else {
        if (numberOfGuesses === 6) {
            showAlert(`The secret word was ${secretWord}`, 2000, 15)
            endGameActions()
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
