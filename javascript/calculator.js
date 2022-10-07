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
        if (typeof(calculatorArray.at(-1)) === "string") {
            // Removes operator if it is at the end of the calculator array
            removeLast();
        }
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
        if (buttonValue.type ==="number" || buttonValue.type ==="number-modifier") {
            buildNumber(newItem);
        } else {
            pushItem(newItem);  // Operator
        }
    } else if (typeof(lastItem) === "string") {
        // If latest is an operator, ensure another operator isn't added
        if (buttonValue.type === "operator") {
            replaceLast(newItem);
        } else if (buttonValue.type == "number") {
            // Number
            pushItem(newItem);
        }
        
    } else if (typeof(lastItem) === "undefined") {
        // If array is empty, start a new number
        // Ensures array cannot start with an operator
        if (buttonValue.type === "number") {
            pushItem(newItem);
        }
    }
}

const buildNumber = function(value) {
    console.log(`Received ${value}`)
    const previousValue = calculatorArray.pop();
    const newValue = `${previousValue}${value}`;
    calculatorArray.push(parseFloat(newValue));
}

const pushItem = value => calculatorArray.push(value);  // Adds new item to calculator array

// Removes last item from calculator array - used to remove an operator before 
const removeLast = () => calculatorArray.splice(-1);  

// Replaces last item in calculator array - used to replace an operator instead of stacking two operators
const replaceLast = value => calculatorArray.splice(-1, 1, value);  

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