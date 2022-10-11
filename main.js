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
            answer = display.textContent;
            display.textContent = typedNumber;
            freshOperator = false;
        } else {
            display.textContent += typedNumber;
        }
    } else {
        if (answer) {
            answer = 0;
            display.textContent = typedNumber;
        }
        else {
            display.textContent += typedNumber;
        }
    }
}

function chooseOperator(e) {
    const eventOperator = e.target.value;
    if (operator) {
        display.textContent = operate(operator, +answer, +display.textContent);
        answer = display.textContent;
        operator = eventOperator;
        freshOperator = true;
    } else{
        answer = display.textContent;
        operator = eventOperator;
        freshOperator = true;
    }
}

function evaluateOperation() {
    if (!operator || !answer) return;
    display.textContent = operate(operator, +answer, +display.textContent);
    answer = display.textContent;
    operator = null;
    freshOperator = false;
}

function backspaceDisplay() {
    display.textContent = display.textContent.substring(0, display.textContent.length-1);
}

function clearDisplay() {
    display.textContent = "";
    operator = "";
    freshOperator = false;
    answer = ""
}


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

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearDisplay);
