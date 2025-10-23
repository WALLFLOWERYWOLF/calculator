const buttons = document.querySelector(".buttons");
const displayExpression = document.querySelector(".display-expression");
const displayAnswer = document.querySelector(".display-answer");
const footer = document.querySelector(".footer");
let operand1 = "";
let operand2 = "";
let operator = "";
let answer = "0";

function add(a, b) {
  a = Number(a);
  b = Number(b);
  return `${a + b}`;
}

function subtract(a, b) {
  a = Number(a);
  b = Number(b);
  return `${a - b}`;
}

function multiply(a, b) {
  a = Number(a);
  b = Number(b);
  return `${a * b}`;
}

function divide(a, b) {
  a = Number(a);
  b = Number(b);
  return `${a / b}`;
}

function operate(operand1, operator, operand2) {
  switch (operator) {
    case "add":
      return add(operand1, operand2);
      break;
    case "subtract":
      return subtract(operand1, operand2);
      break;
    case "multiply":
      return multiply(operand1, operand2);
      break;
    case "divide":
      if (operand2 == "0") alert("You don't divide by zero, Einstein");
      else return divide(operand1, operand2);
      break;
  }
}

function populator() {
  let conOp = "";
  switch (operator) {
    case "add":
      conOp = "+";
      break;
    case "subtract":
      conOp = "-";
      break;
    case "multiply":
      conOp = "×";
      break;
    case "divide":
      conOp = "÷";
      break;
  }
  displayExpression.textContent = `${operand1} ${conOp} ${operand2}`;
  displayAnswer.textContent = answer;
}

function clear() {
  operand1 = "";
  operand2 = "";
  operator = "";
  answer = "0";
  populator();
}

function copyright() {
  let currentYear = new Date().getFullYear();
  footer.textContent = `${footer.textContent} ${currentYear} WALLFLOWERYWOLF`;
}

buttons.addEventListener("click", (e) => {
  let className = e.target.className;
  let value = e.target.value;
  switch (className) {
    case "number":
      if (answer != "0") {
        clear();
      }
      if (operator == "" && operand2 == "") {
        if (value == ".") {
          if (operand1.split("").includes(".")) {
            alert("invalid input");
            populator();
          } else {
            operand1 = operand1 + value;
            populator();
          }
        } else {
          operand1 = operand1 + value;
          populator();
        }
      } else {
        if (value == ".") {
          if (operand2.split("").includes(".")) {
            alert("invalid input");
            populator();
          } else {
            operand2 = operand2 + value;
            populator();
          }
        } else {
          operand2 = operand2 + value;
          populator();
        }
      }
      break;
    case "operator":
      if (answer != "0") {
        operand1 = answer;
        operator = value;
        operand2 = "";
        answer = "0";
        populator();
      } else if (answer == "0" && operand1 != "" && operand2 != "") {
        answer = operate(operand1, operator, operand2);
        operand1 = answer;
        operator = value;
        operand2 = "";
        answer = "0";
        populator();
      }
      operator = value;
      populator();
      break;
    case "equals":
      answer = operate(operand1, operator, operand2);
      populator();
      break;
    case "special":
      if (value == "all-clear") {
        clear();
      } else if (value == "backspace") {
        if (operand2 != "") {
          operand2 = operand2.slice(0, -1);
          populator();
        } else if (operator != "") {
          operator = "";
          populator();
        } else {
          operand1 = operand1.slice(0, -1);
          populator();
        }
      }
      break;
  }
});

populator();
copyright();

// keyboard support

let keyboardMappings = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
  ".": ".",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "=": "equals",
  Enter: "equals",
  Backspace: "backspace",
  Delete: "all-clear",
};

document.addEventListener("keydown", (e) => {
  if (e.key in keyboardMappings) {
    let elementButton = document.querySelector(
      `[value='${keyboardMappings[e.key]}']`
    );
    elementButton.click();
  } else {
    console.log(`Unmapped Key: ${e.key}`);
  }
  e.preventDefault;
});
