import {currentGuess, secretWord, wordLength, numberOfGuesses, dictionary, setCurrentGuess, setGameOver, setNumberOfGuesses, guessResults } from "./gameState.js"
import { shakeRow, showAlert } from "./utils.js"

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

            //update the emojiRow
            emojiRow.push("🟩")
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
                emojiRow.push("⬜")
            }
        }
    }
    guessResults.push(emojiRow)

    //check to see if the word was right
    setNumberOfGuesses(numberOfGuesses + 1);
    if (guess === secretWord) {
        document.getElementById("gameInfo").textContent = "Congrats, you got it right!"
        setGameOver(true);
        document.getElementById("shareBtn").style.display = "block";
    }
    else {
        if (numberOfGuesses === 6) {
            document.getElementById("gameInfo").textContent = `The secret word was ${secretWord}`
            setGameOver(true);
            document.getElementById("shareBtn").style.display = "block";
        }
    }

    //reset the guess array
    setCurrentGuess([]);
}
