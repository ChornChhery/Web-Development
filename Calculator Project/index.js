let memory = 0;
let memoryInUse = false;
let isInverse = false;
let isSecond = false;
let isScientificNotation = false;
let lastResult = 0;

function appendToDisplay(value) {
  let display = document.getElementById("display");

  // If the display only shows 0, and the value is not a closing parenthesis
  if (display.value === "0") {
    // For "(" and other buttons, replace "0"
    if (value === "(") {
      display.value = value;
    } else if (!isNaN(value)) {
      // Replace 0 with the clicked number
      display.value = value;
    } else {
      display.value = "0" + value;
    }
  } else if (/(\d|\))\(/.test(display.value + value)) {
    // If the current value is a digit or closing parenthesis followed by an open parenthesis, insert '*'
    display.value += `*${value}`;
  } else {
    display.value += value;
  }
  highlightBrackets(); // Call to highlight matching brackets (if needed)
}

// Bracket highlighting function
function highlightBrackets() {
  let display = document.getElementById("display");
  let input = display.value;

  let openBracketCount = (input.match(/\(/g) || []).length;
  let closeBracketCount = (input.match(/\)/g) || []).length;

  display.style.backgroundColor =
    openBracketCount !== closeBracketCount ? "lightcoral" : "";
}

// function highlightBrackets() {
//   let display = document.getElementById("display");
//   let input = display.value;
//   let openBracketIndex = input.lastIndexOf("(");
//   let closeBracketIndex = input.lastIndexOf(")");

//   if (openBracketIndex !== -1 && closeBracketIndex > openBracketIndex) {
//     // Highlight the matching brackets
//     display.value =
//       input.substring(0, openBracketIndex) +
//       '<span class="highlighted-bracket">(</span>' +
//       input.substring(openBracketIndex + 1, closeBracketIndex) +
//       '<span class="highlighted-bracket">)</span>' +
//       input.substring(closeBracketIndex + 1);
//   }
// }

// Updated clearDisplay function
function clearDisplay() {
  document.getElementById("display").value = "0"; // Reset to 0
  lastResult = 0;
}

function clearEntry() {
  let display = document.getElementById("display");
  let values = display.value.split(/[\+\-\*\/]/);
  display.value = display.value.slice(
    0,
    display.value.length - values[values.length - 1].length
  );
}

function backspace() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  if (display.value === "") display.value = "0"; // Ensure 0 is displayed if it's empty
}

// function calculate() {
//   let display = document.getElementById("display");
//   let expression = display.value;

//   try {
//     // Insert '*' between a number and an open parenthesis
//     expression = expression.replace(/(\d)(\()/g, "$1*$2");

//     // Evaluate the modified expression
//     let result = eval(expression);

//     // Check if the result is undefined or NaN
//     if (result === undefined || isNaN(result)) {
//       display.value = "Error";
//     } else {
//       display.value = formatResult(result);
//     }

//     // Optionally, add to history
//     history.push(`${expression} = ${result}`);
//     updateHistoryPanel(); // Update the history panel
//   } catch (error) {
//     // If eval fails (e.g., due to syntax errors), show "Error" in the display
//     display.value = "Error";
//   }
// }
function calculate() {
  let display = document.getElementById("display");
  let expression = display.value;

  try {
    // Insert '*' for implicit multiplication between numbers and parentheses
    expression = expression
      .replace(/(\d|\))(\()/g, "$1*$2") // Handle implicit multiplication
      .replace(/(\d)\(/g, "$1*(") // Handle numbers followed by '('
      .replace(/\)(\d)/g, ")*$1") // Handle ')' followed by a number
      .replace(/\^/g, "**"); // Handle exponentiation

    if (/[+\-*/]$/.test(expression)) {
      display.value = "Error";
      return;
    }

    let result = eval(expression); // Evaluate the expression
    if (result === undefined || isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = formatResult(result);
    }

    history.push(`${expression} = ${result}`); // Add to history
    updateHistoryPanel(); // Update history panel
  } catch (error) {
    display.value = "Error"; // Handle invalid expressions
  }
}

// Format result with scientific notation or precision
function formatResult(value) {
  if (
    isScientificNotation ||
    Math.abs(value) > 1e10 ||
    Math.abs(value) < 1e-10
  ) {
    return value.toExponential(10);
  }
  return parseFloat(value.toPrecision(12));
}

function getAngleMultiplier() {
  let angleUnit = document.querySelector(
    'input[name="angleUnit"]:checked'
  ).value;
  switch (angleUnit) {
    case "degrees":
      return Math.PI / 180;
    case "radians":
      return 1;
    case "grads":
      return Math.PI / 200;
  }
}

function trigFunction(func) {
  let display = document.getElementById("display");
  try {
    let value = eval(display.value);
    let angleMultiplier = getAngleMultiplier();
    if (isInverse) {
      if (["sinh", "cosh", "tanh"].includes(func)) {
        display.value = formatResult(Math[`ar${func}`](value));
      } else {
        display.value = formatResult(Math[`a${func}`](value) / angleMultiplier);
      }
    } else {
      if (["sinh", "cosh", "tanh"].includes(func)) {
        display.value = formatResult(Math[func](value));
      } else {
        display.value = formatResult(Math[func](value * angleMultiplier));
      }
    }
  } catch (error) {
    display.value = "Error";
  }
}

function mathFunction(func) {
  let display = document.getElementById("display");
  try {
    let value = eval(display.value);
    switch (func) {
      case "ln":
        display.value = formatResult(Math.log(value));
        break;
      case "log":
        display.value = formatResult(Math.log10(value));
        break;
      case "yRootx":
        let y = prompt("Enter the value of y: ");
        if (y && !isNaN(y)) {
          display.value = formatResult(Math.pow(value, 1 / y));
        } else {
          display.value = "Error";
        }
        break;
      case "floor":
        display.value = formatResult(Math.floor(value));
        break;
      case "dms":
        let deg = Math.floor(value);
        let min = Math.floor((value - deg) * 60);
        let sec = ((value - deg - min / 60) * 3600).toFixed(2);
        display.value = `${deg}° ${min}' ${sec}"`;
        break;
      case "pow2":
        display.value = formatResult(Math.pow(value, 2));
        break;
      case "pow3":
        display.value = formatResult(Math.pow(value, 3));
        break;
      case "sqrt":
        display.value = formatResult(Math.sqrt(value));
        break;
      case "cbrt":
        display.value = formatResult(Math.cbrt(value));
        break;
      case "powY":
        appendToDisplay("**");
        return;
      case "pow10":
        display.value = formatResult(Math.pow(10, value));
        break;
      case "reciprocal":
        display.value = formatResult(1 / value);
        break;
      case "factorial":
        if (value < 0 || Math.floor(value) !== value) {
          display.value = "Error";
          return;
        }
        let result = 1;
        for (let i = 2; i <= value; i++) result *= i;
        display.value = formatResult(result);
        break;
      case "exp":
        display.value += "*10**";
        return;
      case "abs":
        display.value = formatResult(Math.abs(value));
        break;
      case "rand":
        display.value = formatResult(Math.random());
        break;
      case "percent":
        if (lastResult !== 0) {
          display.value = formatResult(lastResult * (value / 100));
        } else {
          display.value = formatResult(value / 100);
        }
        break;

      default:
        display.value = "Error";
    }
  } catch (error) {
    display.value = "Error";
  }
}

function mathConstant(constant) {
  switch (constant) {
    case "pi":
      document.getElementById("display").value += Math.PI;
      break;
    case "e":
      document.getElementById("display").value += Math.E;
      break;
  }
}

function memoryOperation(operation) {
  let display = document.getElementById("display");
  let memoryIndicator = document.getElementById("memoryIndicator");

  switch (operation) {
    case "MC":
      memory = 0;
      memoryInUse = false;
      break;
    case "MR":
      display.value = memory;
      break;
    case "MS":
      memory = parseFloat(display.value) || 0;
      memoryInUse = true;
      break;
    case "M+":
      memory += parseFloat(display.value) || 0;
      memoryInUse = true;
      break;
    case "M-":
      memory -= parseFloat(display.value) || 0;
      memoryInUse = true;
      break;
  }

  memoryIndicator.textContent = memoryInUse ? "M" : "";
  memoryIndicator.style.visibility = memoryInUse ? "visible" : "hidden"; // Better visibility control
}

function toggleInverse() {
  isInverse = !isInverse;
  document.getElementById("invBtn").classList.toggle("toggled");
}

function toggleSecond() {
  isSecond = !isSecond;
  document.getElementById("secondBtn").classList.toggle("toggled");
  // Here you would change the function of certain buttons
}

function toggleFE() {
  isScientificNotation = !isScientificNotation;
  document.getElementById("feBtn").classList.toggle("toggled");
  let display = document.getElementById("display");
  if (display.value) {
    display.value = formatResult(parseFloat(display.value));
  }
}

function toggleSign() {
  let display = document.getElementById("display");
  if (display.value !== "" && display.value !== "0") {
    display.value = formatResult(parseFloat(display.value) * -1);
  }
}
// document.addEventListener("keydown", function (event) {
//   const key = event.key;

//   if (key === "Escape") {
//     clearDisplay();
//   } else if (key === "Shift") {
//     toggleSecond();
//   } else if (
//     !isNaN(key) ||
//     ["+", "-", "*", "/", ".", "Enter", "Backspace"].includes(key)
//   ) {
//     if (key === "Enter") {
//       document.querySelector('button[onclick="calculate()"]').click();
//     } else if (key === "Backspace") {
//       document.querySelector('button[onclick="backspace()"]').click();
//     } else {
//       document
//         .querySelector(`button[onclick="appendToDisplay('${key}')"]`)
//         .click();
//     }
//   }
// });
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === "Escape") {
    clearDisplay(); // Clear the display
  } else if (key === "Shift") {
    toggleSecond(); // Toggle the second function
  } else if (!isNaN(key)) {
    appendToDisplay(key); // Append number key to display
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendToDisplay(key); // Append operator key to display
  } else if (key === ".") {
    appendToDisplay("."); // Append decimal point
  } else if (key === "Enter") {
    event.preventDefault(); // Prevent default behavior
    calculate(); // Perform calculation
  } else if (key === "Backspace") {
    event.preventDefault(); // Prevent default back navigation
    backspace(); // Remove last character
  } else if (key === "(" || key === ")") {
    appendToDisplay(key); // Append parentheses
  }
});

function toggleTheme() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  const calculator = document.querySelector(".calculator");
  calculator.classList.toggle("dark-mode");
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => button.classList.toggle("dark-mode"));

  // Save theme to localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Apply saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const calculator = document.querySelector(".calculator");
    calculator.classList.add("dark-mode");
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.add("dark-mode"));
  }
};

let history = [];
let historyVisible = false;

// Modify the calculate function to add expressions + results to history
function calculate() {
  let display = document.getElementById("display");
  try {
    let expression = display.value;
    let result = eval(expression); // Evaluate the expression
    display.value = formatResult(result);

    // Add expression and result to history in "expression = result" format
    history.push(`${expression} = ${formatResult(result)}`);
    updateHistoryPanel(); // Update the history panel
  } catch (error) {
    display.value = "Error";
  }
}

// Function to update the history panel with full expression + result
function updateHistoryPanel() {
  let historyPanel = document.getElementById("historyPanel");
  historyPanel.innerHTML = ""; // Clear the current history display

  history.forEach((item, index) => {
    let historyItem = document.createElement("div");
    historyItem.classList.add("history-item");

    // Display full expression and result (e.g., "7 * 5 = 35")
    historyItem.textContent = item;

    // Add click event to load the expression back into the display (only the expression part)
    historyItem.addEventListener("click", () => {
      let expression = item.split("=")[0].trim(); // Extract only the expression
      document.getElementById("display").value = expression;
    });

    historyPanel.appendChild(historyItem);
  });
}

// Toggle history panel visibility
function toggleHistory() {
  let historyPanel = document.getElementById("historyPanel");
  historyVisible = !historyVisible; // Toggle visibility state

  if (historyVisible) {
    historyPanel.style.display = "block"; // Show history
    document.getElementById("toggleHistoryBtn").textContent = "Off";
  } else {
    historyPanel.style.display = "none"; // Hide history
    document.getElementById("toggleHistoryBtn").textContent = "On";
  }
}
// Clear history function
function clearHistory() {
  history = []; // Clear the history array
  updateHistoryPanel(); // Update the history panel
}

function convertTemperature(value, fromUnit, toUnit) {
  value = parseFloat(value);
  let result;

  // Convert value from "fromUnit" to Celsius first
  switch (fromUnit) {
    case "celsius":
      result = value;
      break;
    case "fahrenheit":
      result = ((value - 32) * 5) / 9; // Fahrenheit to Celsius
      break;
    case "kelvin":
      result = value - 273.15; // Kelvin to Celsius
      break;
  }

  // Convert from Celsius to the desired "toUnit"
  switch (toUnit) {
    case "celsius":
      return result;
    case "fahrenheit":
      return (result * 9) / 5 + 32; // Celsius to Fahrenheit
    case "kelvin":
      return result + 273.15; // Celsius to Kelvin
  }
}

function performUnitConversion() {
  let display = document.getElementById("display");
  let value = display.value;
  let unitType = document.querySelector('input[name="unitType"]:checked').value;

  // Determine which type of conversion we need (angles or temperature)
  if (
    unitType === "degrees" ||
    unitType === "radians" ||
    unitType === "grads"
  ) {
    trigFunction(unitType); // Call trig function for angle units
  } else if (
    unitType === "celsius" ||
    unitType === "fahrenheit" ||
    unitType === "kelvin"
  ) {
    let fromUnit = unitType;
    let toUnit = prompt("Convert to: celsius, fahrenheit, or kelvin?");

    if (["celsius", "fahrenheit", "kelvin"].includes(toUnit)) {
      display.value = convertTemperature(value, fromUnit, toUnit);
    } else {
      display.value = "Error: Invalid unit";
    }
  }
}
function appendValue(value) {
  let display = document.getElementById("display");

  // If the display only shows 0, replace it with the clicked value
  if (display.value === "0") {
    display.value = value;
  } else {
    display.value += value;
  }
}
// เพิ่มฟังก์ชันนี้เพื่อล้างประวัติ
function clearHistory() {
  history = [];
  updateHistoryPanel();
}

// เพิ่มฟังก์ชันนี้เพื่อสลับการแสดงประวัติ
function toggleHistory() {
  let historyPanel = document.getElementById("historyPanel");
  if (historyPanel.style.display === "none") {
    historyPanel.style.display = "block";
    updateHistoryPanel();
  } else {
    historyPanel.style.display = "none";
  }
}

// ปรับปรุงฟังก์ชัน updateHistoryPanel ให้แสดงประวัติทั้งหมด
function updateHistoryPanel() {
  let historyPanel = document.getElementById("historyPanel");
  historyPanel.innerHTML = "";
  history.forEach((item, index) => {
    let historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.textContent = item;
    historyItem.addEventListener("click", () => {
      let expression = item.split("=")[0].trim();
      document.getElementById("display").value = expression;
    });
    historyPanel.appendChild(historyItem);
  });
}

