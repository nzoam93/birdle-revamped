import { numberOfGuesses, currentGuess, wordLength } from "./gameState.js";

export function updateBoard(){
    for (let i = 0; i < wordLength; i++) {
        const square = document.getElementById(`square-${numberOfGuesses}-${i}`);
        square.textContent = currentGuess[i] || "";
    }
}
