import { guessResults } from './gameState.js';

export function generateShareText(guessesUsed) {
    let result = `Birdle Results: ${guessesUsed}/6\n\n`;
    guessResults.forEach(row => {
        result += row.join('') + '\n';
    });
    result += "\nYou can play at https://nzoam93.github.io/birdle-revamped/"
    console.log(result)
    return result;
}
