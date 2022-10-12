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

    if (currentOperator) {
        if (isOperatorRecent){
            lastOperand = display.textContent;
            display.textContent = typedNumber;
            isOperatorRecent = false;
        } else {
            display.textContent += typedNumber;
        }
    } else {
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
    if (currentOperator) {
        display.textContent = operate(currentOperator, +lastOperand, +display.textContent);
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
    display.textContent = operate(currentOperator, +lastOperand, +display.textContent);
    lastOperand = display.textContent;
    currentOperator = null;
    isOperatorRecent = false;
}

function backspaceDisplay() {
    display.textContent = display.textContent.substring(0, display.textContent.length-1);
}

function clearDisplay() {
    display.textContent = "";
    currentOperator = "";
    isOperatorRecent = false;
    lastOperand = ""
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

let currentOperator; //string
let isOperatorRecent; //boolean
let lastOperand;

const display = document.querySelector(".calculator-display")

const numbers = document.querySelectorAll(".number");
numbers.forEach((number)=>{number.addEventListener("click",typeNumber)});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator)=>{operator.addEventListener("click",chooseOperator)});

const equalSign = document.querySelector('.equal');
equalSign.addEventListener("click", evaluateOperation)

const backspace = document.querySelector('.backspace');
backspace.addEventListener("click", backspaceDisplay);

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);

const sign = document.querySelector(".sign");
sign.addEventListener("click", toggleSign);

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", typeDecimal)