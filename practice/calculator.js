const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const isdecimalpresent = calculator.dataset.isdecimalpresent;

    if (!action) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
        calculator.dataset.previousKeyType = "number";
      }
    }
    if (
      calculator.dataset.previousKeyType === "number" &&
      (action === "add" ||
        action === "subtract" ||
        action === "multiply" ||
        action === "divide")
    ) {
      display.textContent = displayedNum + keyContent;
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.isdecimalpresent = "0";
    }

    if (action === "decimal" && isdecimalpresent === "0") {
      if (!displayedNum.includes(".") || previousKeyType === "number") {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = displayedNum + "0.";
      }
      calculator.dataset.previousKey = "decimal";
      calculator.dataset.isdecimalpresent = "1";
    }

    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
      calculator.dataset.isdecimalpresent = "0";
    }

    if (action === "calculate") {
      display.textContent = eval(display.textContent);
      calculator.dataset.isdecimalpresent = "0";
    }
  }
});
