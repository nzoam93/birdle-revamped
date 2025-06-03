export function createBoard(numRows, wordLength) {
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
