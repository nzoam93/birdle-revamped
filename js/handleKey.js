import { gameOver, currentGuess, wordLength } from './gameState.js';
import { updateBoard } from './updateBoard.js';
import { checkGuess } from './checkGuess.js';

export function handleKey(e) {
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
