/*
CALCULATIONS
*/

// toPrecision ensures that floating point math error is unlikely to occur
const exponent = (num1, num2) => num1 ** num2;
const divide = (num1, num2) => (num1 / num2).toPrecision(Math.max(num1.countDecimals(), num2.countDecimals()));
const multiply = (num1, num2) => (num1 * num2).toPrecision(Math.max(num1.countDecimals(), num2.countDecimals()));
const add = (num1, num2) => (num1 + num2).toPrecision(Math.max(num1.countDecimals(), num2.countDecimals()));
const subtract = (num1, num2) => (num1 - num2).toPrecision(Math.max(num1.countDecimals(), num2.countDecimals()));

// Prototype function to count decimals of any Number
Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

/*
BUTTONS AND DISPLAY
*/

const buttonClick = function(e) {

    // Get button value object
    const buttonObject = buttonObjects.find(item => item.id === e.target.id);

    // Check if clear, equals, or other
    if (e.target.id === "key-ac") {
        clearArray();
    } else if (e.target.id === "key-equals") {
        if (operators.some(operator => operator.value === calculatorArray.at(-1))) {
            console.log("Last is operator, removed")
            removeLast();
        };
        finalizeNumber();
        evaluateArray();
    // Check if number, number modifier, or operator
    } else {
        checkInput(buttonObject);
    }

    updateDisplay();
}

const checkInput = function(buttonObject) {

    const lastItem = calculatorArray.at(-1);  // Get final item in array
    const newItem = buttonObject.value;  // Get the value of button pressed

    // If array empty, start new number
    if (calculatorArray.length < 1) {
        // Ensure first item is an integer or decimal
        if (buttonObject.type === "number" || buttonObject.type === "number-modifier" || buttonObject.type === "number-prefix") {
            pushItem(newItem);
        }
    } 
    // If last item operator
    else if (operators.some(operator => operator.value === lastItem)) {
        // If new item operator, replace previous operator
        if (buttonObject.type === "operator") {
            replaceLast(newItem);
        // If new item number, start a new number
        } else if (buttonObject.type === "number" || buttonObject.type === "number-modifier" || buttonObject.type === "number-prefix") {
            pushItem(newItem);
        }
    }
    // If last item a number
    else if (Number(lastItem) !== "NaN" || lastItem === "." || lastItem === "-") {
        // If new item a number or number-modifier, continue building number
        if (buttonObject.type === "number" || buttonObject.type === "number-modifier") {
            buildNumber(newItem);
        // If new item an operator, finalize number and push operator
        } else if (buttonObject.type === "operator") {
            finalizeNumber();
            pushItem(newItem);
        }
    }
}

// Builds an integer or float
const buildNumber = function(value) {
    const previousValue = calculatorArray.pop();
    // If previous value already includes decimal, do not add another decimal
    if (value === "." && previousValue.includes('.')) {
        calculatorArray.push(previousValue);
    // Otherwise continue to build number
    } else {
        const newValue = `${previousValue}${value}`;
        calculatorArray.push(newValue);
    }
}

// Parses built number into an integer or float
const finalizeNumber = function () {
    const previousValue = calculatorArray.pop();
    let parsedValue;
    // Ensure previouseValue is a valid number
    if (Number(previousValue !== "NaN")) {
        // Check if previousValue is an integer or float and parse accordingly
        if (Number.isInteger(previousValue)) {
            parsedValue = Number.parseInt(previousValue);
        } else {
            parsedValue = Number.parseFloat(previousValue);
        }
        // Push parsed value back to calculatorArray
        calculatorArray.push(parsedValue)
    } else {
        console.error("finalizeNumber failed to parse last item");
    }
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

    operators.forEach(function(item) {
        while (calculatorArray.includes(item.value)) {
            const index = calculatorArray.indexOf(item.value);
            const num1 = calculatorArray.at(index-1);
            const num2 = calculatorArray.at(index+1);
            result = item.function(num1, num2);
            calculatorArray.splice(index - 1, 3, result);
        }
    })
    
    updateDisplay();
}

const clearArray = () => calculatorArray = [];

const updateDisplay = () => displayCalculation.textContent = calculatorArray.join(" ");

// Array of button objects containing values, types, and functions if applicable
const buttonObjects = [
    // Numpad
    {
        "id": "key-0",
        "value": "0",
        "type": "number"
    },
    {
        "id": "key-1",
        "value": "1",
        "type": "number"
    },
    {
        "id": "key-2",
        "value": "2",
        "type": "number"
    },
    {
        "id": "key-3",
        "value": "3",
        "type": "number"
    },
    {
        "id": "key-4",
        "value": "4",
        "type": "number"
    },
    {
        "id": "key-5",
        "value": "5",
        "type": "number"
    },
    {
        "id": "key-6",
        "value": "6",
        "type": "number"
    },
    {
        "id": "key-7",
        "value": "7",
        "type": "number"
    },
    {
        "id": "key-8",
        "value": "8",
        "type": "number"
    },
    {
        "id": "key-9",
        "value": "9",
        "type": "number"
    },
    // Main Operators - Operators contain calculation functions
    {
        "id": "key-power",
        "value": "^",
        "type": "operator",
        "function": exponent
    },
    {
        "id": "key-divide",
        "value": "/",
        "type": "operator",
        "function": divide
    },
    {
        "id": "key-multiply",
        "value": "x",
        "type": "operator",
        "function": multiply
    },
    {
        "id": "key-plus",
        "value": "+",
        "type": "operator",
        "function": add
    },
    {
        "id": "key-minus",
        "value": "–",  // Uses en-dash to differentiate from key-plus-minus value
        "type": "operator",
        "function": subtract
    },
    // Miscellaneous
    {
        "id": "key-plus-minus",
        "value": "-",  // Uses hyphen
        "type": "number-prefix"
    },
    {
        "id": "key-decimal",
        "value": ".",
        "type": "number-modifier"  // Considered number as it changes number into a decimal value
    }
]

// Filtered array containing only operators
const operators = buttonObjects.filter(item => item.type === "operator");  // Get operators

// Array containing the equation items (numbers and operators)
let calculatorArray = [];

// Select Dom elements
const displayCalculation = document.querySelector("#display-calculation");
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));