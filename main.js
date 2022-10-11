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

    if (operator) {
        if (freshOperator){
            answer = displayNumber;
            displayNumber = typedNumber;
            display.textContent = `${displayNumber}`;
            freshOperator = false;
        } else {
            displayNumber += typedNumber;
            display.textContent = `${displayNumber}`;
        }
    } else {
        if (answer) {
            answer = 0;
            displayNumber = typedNumber;
            display.textContent = `${displayNumber}`;
        }
        else {
            displayNumber += typedNumber;
            display.textContent = `${displayNumber}`;
        }
    }
}

function chooseOperator(e) {
    const eventOperator = e.target.value;
    if (operator) {
        displayNumber = operate(operator, +answer, +displayNumber);
        answer = displayNumber;
        operator = eventOperator;
        freshOperator = true;
        display.textContent = `${displayNumber}`
    } else{
        answer = displayNumber;
        operator = eventOperator;
        freshOperator = true;
    }
}

function evaluateOperation() {
    if (!operator || !answer) return;
    displayNumber = operate(operator, +answer, +displayNumber);
    answer = displayNumber;
    display.textContent = `${displayNumber}`
    operator = null;
    freshOperator = false;
}

function backspaceDisplay() {
    displayNumber = displayNumber.substring(0, displayNumber.length-1)
    display.textContent = `${displayNumber}`
}


let displayNumber = ""; //string
let operator; //string
let freshOperator; //boolean
let answer;

const display = document.querySelector(".calculator-display")

const numbers = document.querySelectorAll(".number");
numbers.forEach((number)=>{number.addEventListener("click",typeNumber)});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator)=>{operator.addEventListener("click",chooseOperator)});

const equalSign = document.querySelector('.equal');
equalSign.addEventListener("click", evaluateOperation)

const backspace = document.querySelector('.backspace');
backspace.addEventListener("click", backspaceDisplay);
