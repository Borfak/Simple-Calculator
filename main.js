"use strict";

let display = document.getElementById("display");
let buttons = Array.from(document.getElementsByClassName("button"));


const specialChars = ["+", "-", "*", "/", "."];
const allowedChars = [...specialChars, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")"];

let displayBuffer = "";
display.innerText = displayBuffer; // setting initial value for the <input> html tag

const calculate = (removeLastChar = false) => {
  try {
    if (removeLastChar) {
      displayBuffer = displayBuffer.slice(0, -1); // (to remove the "=" sign at the end due to displayBuffer += e.target.innerText)
    }

    displayBuffer = eval(displayBuffer);
  }
  catch (e) {
    displayBuffer = "Error";
  }
}

const verifyInput = (lastChar) => {
  if (specialChars.includes(lastChar) && displayBuffer.length === 0) {
    return false;
  }

  if (specialChars.includes(displayBuffer[displayBuffer.length - 1]) && specialChars.includes(lastChar)) {
    displayBuffer = displayBuffer.slice(0, -1);
  }

  return true;
}

// calculate the stuff when pressing 'Enter'
window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculate();
    display.innerText = displayBuffer;
    return
  }


  if (e.key === "Backspace") {
    displayBuffer = displayBuffer.slice(0, -1);
    display.innerText = displayBuffer;
    return
  }

  const lastInputChar = e.key;

  if (!allowedChars.includes(lastInputChar) && lastInputChar !== undefined) {
    return
  }

  if (specialChars.includes(displayBuffer[displayBuffer.length - 1]) && specialChars.includes(lastInputChar)) {
    displayBuffer = displayBuffer.slice(0, -1);
  }

  displayBuffer += lastInputChar;
  display.innerText = displayBuffer;
})

buttons.map(button => {
  button.addEventListener("click", (e) => {
    if (!verifyInput(e.target.innerText)) {
      return;
    }

    displayBuffer += e.target.innerText;

    switch (e.target.innerText) {
      case "C": {
        displayBuffer = "";
        break;
      }

      case "=": {
        calculate(true)
        break;
      }

      case "⌫": {
        if (displayBuffer) {
          // -2 because:
          // -1 -> to remove the last character
          // -1 -> // (to remove the "⌫" sign at the end due to displayBuffer += e.target.innerText)
          displayBuffer = displayBuffer.slice(0, -2);
          break;
        }
      }

      default: { }
    }

    display.innerText = displayBuffer;
  });
});