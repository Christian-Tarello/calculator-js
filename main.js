function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator){
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case "/":
            return divide(a,b);
    }
}


function typeNumber(e) {
    const typedNumber = e.target.value;

    // If the second number is to be inputted
    if (currentOperator) {
        // If it's the first number typed after the operator
        if (isOperatorRecent){
            lastOperand = display.textContent;
            display.textContent = typedNumber;
            isOperatorRecent = false;
        } else {
            display.textContent += typedNumber;
        }
    } else {
        // If it's the first number after throwing away an answer
        if (lastOperand) {
            lastOperand = 0;
            display.textContent = typedNumber;
        }
        else {
            display.textContent += typedNumber;
        }
    }
}

function chooseOperator(e) {
    const eventOperator = e.target.value;
    // If an operator has been choosen while another's operator calculation is happening
    if (currentOperator) {
        display.textContent = calculateAnswer(currentOperator, +lastOperand, +display.textContent);
        lastOperand = display.textContent;
        currentOperator = eventOperator;
        isOperatorRecent = true;
    } else{
        lastOperand = display.textContent;
        currentOperator = eventOperator;
        isOperatorRecent = true;
    }
}

function evaluateOperation() {
    if (!currentOperator || !lastOperand) return;
    display.textContent = calculateAnswer(currentOperator, +lastOperand, +display.textContent);
    lastOperand = display.textContent;
    currentOperator = "";
    isOperatorRecent = false;
}

function backspaceDisplay() {
    if (display.textContent === lastOperand && !currentOperator) return;
    display.textContent = display.textContent.substring(0, display.textContent.length-1);
    if (display.textContent === "-") display.textContent = "";
}

function clearDisplay() {
    display.textContent = "";
    currentOperator = "";
    isOperatorRecent = false;
    lastOperand = "";
}

function toggleSign() {
    if (display.textContent.length === 0) return;

    if (display.textContent.startsWith("-")){
        display.textContent = display.textContent.substring(1);
    } else {
        display.textContent = "-"+display.textContent;
    }
}

function typeDecimal() {
    if (display.textContent.includes(".")) return;
    display.textContent+=".";
}

function calculatePercentage() {
    display.textContent = (+display.textContent / 100);
}

// Helper Function
function calculateAnswer(operator, firstOperand, secondOperand) {
    if (operator === "/" && secondOperand === 0) return "Error/0";
    let answer = operate(operator, firstOperand, secondOperand);
    if (!Number.isInteger(answer) && answer.toString().length > 8){
        return Math.round(answer * 10000) / 10000;
    }
    
    return answer;
}

function handleKeyboardInput(e) {
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    if (!key) return;
    key.click();
}

let currentOperator; //string
let isOperatorRecent; //boolean
let lastOperand; //string

const display = document.querySelector(".calculator-display");

const numbers = document.querySelectorAll(".number");
numbers.forEach((number)=>{number.addEventListener("click",typeNumber)});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator)=>{operator.addEventListener("click",chooseOperator)});

const equalSign = document.querySelector('.equal');
equalSign.addEventListener("click", evaluateOperation);

const backspace = document.querySelector('.backspace');
backspace.addEventListener("click", backspaceDisplay);

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);

const sign = document.querySelector(".sign");
sign.addEventListener("click", toggleSign);

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", typeDecimal);

const percent = document.querySelector(".percent");
percent.addEventListener("click", calculatePercentage);

window.addEventListener("keydown", handleKeyboardInput);