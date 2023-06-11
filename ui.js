const buttons = document.querySelectorAll(".button");
const screen = document.getElementById("screen");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");

buttons.forEach(button => {
  button.addEventListener("click", handleButtonClick);
});

clearButton.addEventListener("click", clearScreen);
equalButton.addEventListener("click", evaluateExpression);

function handleButtonClick(event) {
  const buttonValue = event.target.textContent;

  if (buttonValue === "C") {
    clearScreen();
  } else if (buttonValue === "=") {
    evaluateExpression();
  } else {
    if (screen.textContent.length < 15) {
      screen.textContent += buttonValue;
    }
  }
}

function clearScreen() {
  screen.textContent = "";
}

function evaluateExpression() {
  try {
    const expression = screen.textContent;
    const result = evaluateArithmeticExpression(expression);
    screen.textContent = result;
  } catch (error) {
    screen.textContent = "Error";
  }
}

function evaluateArithmeticExpression(expression) {
  const operators = ['+', '-', '*', '/'];
  const operatorRegex = new RegExp(`[${operators.join('')}]`, 'g');
  const operatorMatches = expression.match(operatorRegex);

  if (!operatorMatches) {
    return parseFloat(expression);
  }

  let result = parseFloat(expression.split(operatorMatches[0])[0]);

  for (let i = 0; i < operatorMatches.length; i++) {
    const operator = operatorMatches[i];
    const operand = parseFloat(expression.split(operator)[i + 1]);

    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    } else if (operator === '*') {
      result *= operand;
    } else if (operator === '/') {
      result /= operand;
    }
  }

  return result;
}






