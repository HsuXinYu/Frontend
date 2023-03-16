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

    if (
      !action ||
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      if (!action) {
        calculator.dataset.previousKeyType = "number";
      } else {
        calculator.dataset.previousKeyType = "operator";
      }
    }

    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (previousKeyType === "operator") {
        display.textContent = displayedNum + "0.";
      }
      calculator.dataset.previousKey = "decimal";
    }

    if (action === "clear") {
      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      display.textContent = eval(display.textContent);
    }
  }
});
