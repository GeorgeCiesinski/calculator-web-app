let calculatorArray = [];

/*
BUTTONS AND DISPLAY
*/

const buttonClick = function(e) {

    // Get button value object
    const buttonValue = buttonValues.find(item => item.id === e.target.id);

    if (e.target.id === "key-ac") {
        clearArray();
    } else if (e.target.id === "key-equals") {
        evaluateArray();
    } else {
        checkInput(buttonValue);  // Check if number or operator
    }

    updateDisplay();
}

const checkInput = function(buttonValue) {
    const lastItem = calculatorArray.at(-1);
    const newItem = buttonValue.value;
    // Check if the latest item in an array is a number, operator, or if the array is empty
    if (typeof(lastItem) === "number") {
        // If latest is a number, either continue building the number or finish it and add an operator to array
        if (typeof(newItem) ==="number") {
            buildNumber(newItem);
        } else {
            pushItem(newItem);  // Operator
        }
    } else if (typeof(lastItem) === "string") {
        // If latest is an operator, start a new number
        pushItem(newItem);
    } else if (typeof(lastItem) === "undefined") {
        // If array is empty, start a new number
        // Ensures array cannot start with an operator
        if (typeof(newItem) ==="number") {
            pushItem(newItem);
        }
    }
}

const buildNumber = function(value) {
    const previousValue = calculatorArray.pop();
    const newValue = `${previousValue}${value}`;
    calculatorArray.push(parseInt(newValue));
}

const pushItem = value => calculatorArray.push(value);

const evaluateArray = function() {

    console.log(calculatorArray);
    
    operations = [
        {
            "operator": "/",
            "function": divide
        },{
            "operator": "x",
            "function": multiply
        },{
            "operator": "+",
            "function": add
        },{
            "operator": "-",
            "function": subtract
        }
    ]

    operations.forEach(function(operation) {
        while (calculatorArray.includes(operation.operator)) {
            const index = calculatorArray.indexOf(operation.operator);
            const num1 = calculatorArray.at(index-1);
            const num2 = calculatorArray.at(index+1);
            // if (index + 1 <= calculatorArray.length - 1) {
            result = operation.function(num1, num2);
            calculatorArray.splice(index - 1, 3, result);
            // }
        }
    })
    updateDisplay();
}

const clearArray = () => calculatorArray = [];

const updateDisplay = () => displayCalculation.textContent = calculatorArray.join(" ");

/*
CALCULATIONS
*/

const divide = (num1, num2) => num1 / num2;
const multiply = (num1, num2) => num1 * num2;
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;

// Select Dom elements
const displayCalculation = document.querySelector("#display-calculation");
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));