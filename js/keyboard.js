import { handleKey } from "./handleKey.js";

export function createKeyboard(){
    const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"]
    ];
    const keyboardContainer = document.getElementById("keyboard");
    // keyboardContainer.innerHTML = "";

    for (const row of keyboardLayout){
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("keyboard-row");

        for (const key of row) {
            const keyButton = document.createElement("button");
            const display = key === "Backspace" ? "⌫" : key;
            keyButton.textContent = display;
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
