# calculator-web-app

Calculator web app created as part of The Odin Project - Javascript Basics 15

## Design

My goal was to build a calculator that met the project requirements and exceeded them in some ways. I decided to build a basic calculator using much of the same features as a basic apple watch calculator. The app looks like a palm sized calculator with basic arithmetic but no  bracket keys, and has a blue color theme. 

## Challenges

The main challenge of this calculator is that it could not use the eval() which can pose security risks. I wasn't sure how to approach this, so I decided to build a `calculatorArray` with each calculator key stroke. The items in the `calculatorArray` would make up a mathematical expression when read in order. For example, by pressing calculator keys, the app may build an array that looks like this: 

`calculatorArray = [99, 'x', 3, '–', -2.5]`

To evaluate this array, I built a function called `evaluateArray` that would iterate over an array of operator objects in BEDMAS order, and execute the correct operator function for each instance of the operator in `calculatorArray`. This in itself was a challenge for me as I had to learn how to store functions as object properties and call them when needed. 

The way I decided to build `evaluateArray` I had to ensure some rules were not broken. For example, a single number in the expression can only have a single decimal and `-` sign. Also, multiple operators cannot be chained together such as `5 + x 3`. To resolve this issue, I opted to keep the last number in the array as a string while it was being built. Before adding a decimal, I checked if the string already contained one. As for signage, I used a nested if statement that ensured it could only be added in when a new number is started. Finally, when either an operator is added or the equals key is pressed, the app calls `finalizeNumber` which parses the last number into either an integer or a float so that it can be evaluated as a number and not a string in `evaluateArray`. 

There were many other small issues I faced. For example, sometimes a user may end a mathematical expression with an operator, so I had to check if the last item in `calculatorArray` was an operator in which case it would be removed. I was surprised how many possibilities I had to program into something as simple as a basic calculator to ensure it does not break. 