let calculatorArray = [];

const buttonClick = function(e) {

    // Search buttonValues for id
    const buttonValue = buttonValues.find(item => item.id === e.target.id);

    if (typeof(buttonValue) !== "undefined") {
        checkInput(buttonValue);  // Check if number or operator
    }

    if (e.target.id === "key-ac") {
        clearDisplay();
    }

    if (e.target.id === "key-equals") {
        // Evaluate Calculation
    }

    updateDisplay();
}

const checkInput = function(buttonValue) {
    if (typeof(calculatorArray.at(-1)) === "number") {
        buildNumber(buttonValue.value);
    } else {
        appendOperator(buttonValue.value);
    }
}

const buildNumber = function(value) {
    // Get last item in calculator array as string
    const previousValue = calculatorArray.pop();
    // append new value to string
    const newValue = `${previousValue}${value}`;
    // replace last item in array
    calculatorArray.push(parseInt(newValue));
}

const appendOperator = function(value) {
    calculatorArray.push(value);
}

const clearDisplay = function() {
    calculatorArray = [];  // Clear array
    updateDisplay();  // Update display with cleared array
};

const updateDisplay = function() {
    displayCalculation.textContent = calculatorArray.join(" ");
}

// Select Dom elements
const displayCalculation = document.querySelector("#display-calculation");
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));