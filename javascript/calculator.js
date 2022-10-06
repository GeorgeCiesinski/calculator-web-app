let calculatorArray = [];

const buttonClick = function(e) {

    // Get button value object
    const buttonValue = buttonValues.find(item => item.id === e.target.id);

    if (e.target.id === "key-ac") {
        clearArray();
    } else if (e.target.id === "key-equals") {
        // Evaluate Calculation
    } else {
        checkInput(buttonValue);  // Check if number or operator
    }

    updateDisplay();
}

const checkInput = function(buttonValue) {
    const lastItem = calculatorArray.at(-1);
    const newItem = buttonValue.value;
    console.log(typeof(lastItem));
    if (typeof(lastItem) === "number" && typeof(newItem) ==="number") {
        buildNumber(newItem);
    } else if (typeof(lastItem) === "undefined" && typeof(newItem) !=="number") { 
        // Do nothing - This occurs when user inputs an operator before a number
    } else {
        appendOperator(newItem);
    }
}

const buildNumber = function(value) {
    const previousValue = calculatorArray.pop();
    const newValue = `${previousValue}${value}`;
    calculatorArray.push(parseInt(newValue));
}

const appendOperator = function(value) {
    calculatorArray.push(value);
}

const clearArray = function() {
    calculatorArray = [];  // Clear array
};

const updateDisplay = function() {
    displayCalculation.textContent = calculatorArray.join(" ");
}

// Select Dom elements
const displayCalculation = document.querySelector("#display-calculation");
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));