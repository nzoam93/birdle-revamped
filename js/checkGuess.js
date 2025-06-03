import {currentGuess, secretWord, wordLength, numberOfGuesses, dictionary, setCurrentGuess, setGameOver, setNumberOfGuesses } from "./gameState.js"
import { shakeRow } from "./utils.js"

export function checkGuess(){
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
        setGameOver(true);
    }
    else {
        setNumberOfGuesses(numberOfGuesses + 1);
        if (numberOfGuesses === 6) {
            document.getElementById("gameInfo").textContent = `The secret word was ${secretWord}`
            setGameOver(true);
        }
    }

    //reset the guess array
    setCurrentGuess([]);
}
