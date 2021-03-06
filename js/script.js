const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
let key;
let enteredCharacter = "";
let number1 = "";
let number2 = "";
let operator = "";
let previousKey = "";
let result = "";

const calculate = (n1, symbol, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (symbol === 'add') return firstNum + secondNum;
    if (symbol === 'subtract') return firstNum - secondNum;
    if (symbol === 'multiply') return firstNum * secondNum;
    if (symbol === 'divide') return firstNum / secondNum;
}

calculator.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON') {
        switch (event.target.className) {
            case "number":
                caseNumber(event.target.textContent);
                break;
            case "add":
            case "subtract":
            case "divide":
            case "multiply":
                caseOperator(event.target.textContent, event.target.className);
                break;
            case "comma":
                caseComma(event.target.textContent);
                break;
            case "ac":
                caseAc();
                break;
            case "del":
                caseDel();
                break;
            case "enter":
                caseEnter();
                break;
        }
    }
});

window.addEventListener('keydown', (event) => {
    const isNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (isNumber.includes(event.key)) {
        caseNumber(event.key);
    } else if (event.code === 'Backspace') {
        caseDel();
    } else if (event.code === 'Space') {
        caseAc();
    } else if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        caseEnter();
    } else if (event.code === 'Period' || event.code === 'NumpadDecimal') {
        caseComma(event.key);
    } else if (event.code === 'NumpadMultiply' || event.key === '*') {
        const eventName = 'multiply';
        caseOperator(event.key, eventName);
    } else if (event.code === 'BracketRight' || event.code === 'NumpadAdd') {
        const eventName = 'add';
        caseOperator(event.key, eventName);
    } else if (event.code === 'Slash' || event.code === 'NumpadSubtract') {
        const eventName = 'subtract';
        caseOperator(event.key, eventName);
    } else if (event.key === '/' || event.code === 'NumpadDivide') {
        const eventName = 'divide';
        caseOperator(event.key, eventName);
    }
});

function caseNumber(NumberCharacterFromListener) {
    if (display.textContent === "0" || previousKey === "operator") {
        enteredCharacter = NumberCharacterFromListener;
        display.textContent = enteredCharacter;
    } else if (previousKey === "enter") {
        return; //exclude an attempt to put the second operand after Enter operation if the operator character was not entered
    } else if (previousKey !== "operator") { //if the previously entered key is not an operator, we form the operand using concatenation
        enteredCharacter += NumberCharacterFromListener;
        display.textContent = enteredCharacter;
    }
    previousKey = "number";
}

function caseOperator(NumberCharacterFromListener, operatorCharacterFromListener) {
    if (display.textContent === "0" && previousKey !== "enter") {
        return;
    } else if (previousKey === "enter") {
        operator = operatorCharacterFromListener;
        number1 = result;
        display.textContent = number1 + NumberCharacterFromListener;
        previousKey = "operator";
    } else if (previousKey === "del") {
        number1 = display.textContent;
        operator = operatorCharacterFromListener;
        display.textContent = number1 + NumberCharacterFromListener;
        previousKey = "operator";
        return;
    } else if (previousKey !== "operator") {
        if (number1 === "") {
            operator = operatorCharacterFromListener;
            number1 = enteredCharacter;
            display.textContent = number1 + NumberCharacterFromListener;
            previousKey = "operator";
        } else {
            number2 = enteredCharacter;
            result = calculate(number1, operator, number2);
            operator = operatorCharacterFromListener;
            number1 = result;
            display.textContent = number1 + NumberCharacterFromListener;
            previousKey = "operator";
        }
    } else if (previousKey === "operator") {
        operator = operatorCharacterFromListener;
        display.textContent = number1 + NumberCharacterFromListener;
    }
}

function caseComma(NumberCharacterFromListener) {
    if (display.textContent === "0" || previousKey === "operator") {
        enteredCharacter = 0;
        enteredCharacter += NumberCharacterFromListener;
    } else if (previousKey === "enter") {
        return;
    } else if (display.textContent !== "0" && !enteredCharacter.includes(".")) {
        enteredCharacter += NumberCharacterFromListener;
    } else if (display.textContent !== "0" && enteredCharacter.includes(".")) {
        return;
    }
    display.textContent = enteredCharacter;
    previousKey = "comma";
}

function caseAc() {
    display.textContent = "0";
    enteredCharacter = "";
    number1 = "";
    number2 = "";
    result = "";
    operator = "";
    previousKey = "";
}

function caseDel() {
    if (display.textContent !== "0") {
        enteredCharacter = display.textContent.split("").slice(0, -1).join('');
    }
    display.textContent = enteredCharacter;
    previousKey = "del";
}

function caseEnter() {
    if (display.textContent === "0" && result === "" || (number1 === "" && previousKey === "number")) {
        return; //exclude an attempt to press Enter when the second operand is not entered
    } else {
        number2 = enteredCharacter;
        result = calculate(number1, operator, number2);
        display.textContent = result;
        number1 = result;
        previousKey = "enter";
    }

}