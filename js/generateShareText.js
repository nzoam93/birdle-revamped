import { guessResults } from './gameState.js';

let gameNumber = 1;

export function generateShareText(guessesUsed) {
    let result = `Noam's Wordle #${gameNumber} ${guessesUsed}/6\n\n`;
    guessResults.forEach(row => {
        result += row.join('') + '\n';
    });
    console.log(result)
    return result;
}
