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


let displayNumber = ""; //string
let operator; //string
let freshOperator; //boolean
let answer ="a";


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

const display = document.querySelector(".calculator-display")

const numbers = document.querySelectorAll(".number");
numbers.forEach((number)=>{number.addEventListener("click",typeNumber)});

const operators = document.querySelectorAll(".operator");
operators.forEach((operator)=>{operator.addEventListener("click",chooseOperator)});

