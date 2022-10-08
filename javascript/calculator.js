let calculatorArray = [];

/*
BUTTONS AND DISPLAY
*/

const buttonClick = function(e) {

    // Get button value object
    const buttonValue = buttonValues.find(item => item.id === e.target.id);

    // Check if clear, equals, or other
    if (e.target.id === "key-ac") {
        clearArray();
    } else if (e.target.id === "key-equals") {
        // Remove trailing operator if exists
        if (typeof(calculatorArray.at(-1)) === "string") {
            removeLast();
        }
        evaluateArray();
    // Check if number, number modifier, or operator
    } else {
        checkInput(buttonValue);
    }

    updateDisplay();
}

const checkInput = function(buttonValue) {
    const lastItem = calculatorArray.at(-1);  // Get final item in array
    const newItem = buttonValue.value;  // Get the value of button pressed

    // Last item Number
    if (typeof(lastItem) === "number") {
        // Add to number
        if (buttonValue.type ==="number" || buttonValue.type ==="number-modifier") {
            buildNumber(newItem);
        // End number and start operator
        } else {
            pushItem(newItem);
        }

    // Last item operator
    } else if (typeof(lastItem) === "string" && lastItem !== ".") {
        // Replace operator instead of adding another operator
        if (buttonValue.type === "operator") {
            replaceLast(newItem);
        // Start next number
        } else if (buttonValue.type == "number") {
            pushItem(newItem);
        }

    // Last item decimal
    } else if (lastItem === ".") {
        // Create decimal number

    // Start first number
    } else if (typeof(lastItem) === "undefined") {
        // Ensure first item is an integer or decimal
        if (buttonValue.type === "number" || newItem === ".") {
            pushItem(newItem);
        }
    }
}

// Builds an integer number
const buildNumber = function(value) {
    const previousValue = calculatorArray.pop();
    const newValue = `${previousValue}${value}`;
    calculatorArray.push(parseFloat(newValue));
}

// Adds new item to calculator array
const pushItem = value => calculatorArray.push(value);  

// Removes last item from calculator array - used to remove an operator before 
const removeLast = () => calculatorArray.splice(-1);  

// Replaces last item in calculator array - used to replace an operator instead of stacking two operators
const replaceLast = value => calculatorArray.splice(-1, 1, value);  

// Carries out BEDMAS calculations to get the result
const evaluateArray = function() {

    console.log(calculatorArray);
    
    operations = [
        {
            "operator": "^",
            "function": exponent
        },{
            "operator": "/",
            "function": divide
        },{
            "operator": "x",
            "function": multiply
        },{
            "operator": "+",
            "function": add
        },{
            "operator": "–",
            "function": subtract
        }
    ]

    operations.forEach(function(operation) {
        while (calculatorArray.includes(operation.operator)) {
            const index = calculatorArray.indexOf(operation.operator);
            const num1 = calculatorArray.at(index-1);
            const num2 = calculatorArray.at(index+1);
            result = operation.function(num1, num2);
            calculatorArray.splice(index - 1, 3, result);
        }
    })
    
    updateDisplay();
}

const clearArray = () => calculatorArray = [];

const updateDisplay = () => displayCalculation.textContent = calculatorArray.join(" ");

/*
CALCULATIONS
*/

const exponent = (num1, num2) => num1 ** num2;
const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;

// Select Dom elements
const displayCalculation = document.querySelector("#display-calculation");
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));