function add (num1, num2){
    return num1 + num2;
}

function subtract (num1, num2){
    return num1 - num2;
}

function multiply (num1, num2){
    return num1 * num2;
}

function divide (num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    return operator(Number(num1),Number(num2));
}

let storedValue = '';
let displayValue = '0';
display = document.querySelector('.display')
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equals');

clearButton.addEventListener('click',clearInput)
equalButton.addEventListener('click',equalsButton)

const numbers = document.querySelectorAll('.num-button')
numbers.forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        if (displayValue === 'Overflow' || displayValue === 'NaN' || displayValue === 'Infinity'){
            return
        }
        pressedOperation = document.querySelector('.pressed')
        if (numberButton.textContent === '.' && displayValue.includes('.') && (!pressedOperation)){
            return
        }
        if (pressedOperation !== null && (!storedValue) ){
            storedValue = displayValue;
            displayValue = '0'
        }
        if (displayValue.length+1 > 12) {
            return
        }
        ((displayValue) === '0' && numberButton.textContent !== '.') ? displayValue = numberButton.textContent : displayValue = displayValue.toString() + numberButton.textContent;
        display.textContent = displayValue;
    })
})

const operators = document.querySelectorAll('.operator');
operators.forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        pressedOperation = document.querySelector('.pressed');
        if (pressedOperation === operatorButton){
            if (storedValue){
                equalsButton()
                operatorButton.classList.add('pressed');
            } else {
                operatorButton.classList.remove('pressed')
            }
        } else if (pressedOperation === null){
            if (displayValue === 'Overflow'){
                return
            }
            operatorButton.classList.add('pressed');
        } else {
            if (storedValue){
                equalsButton()
            }
            pressedOperation.classList.remove('pressed')
            operatorButton.classList.add('pressed');
        }
    })
})




function equalsButton(){
    if (!storedValue){
        return
    }
    pressedOperation = document.querySelector('.pressed');
    if (pressedOperation === null){
        return
    } else if (pressedOperation.textContent === '+'){
        displayValue = operate(add,storedValue, displayValue);
    } else if (pressedOperation.textContent === '-'){
        displayValue = operate(subtract,storedValue, displayValue);
    } else if (pressedOperation.textContent === 'X'){
        displayValue = operate(multiply,storedValue, displayValue);
    } else if (pressedOperation.textContent === '/'){
        displayValue = operate(divide,storedValue, displayValue);
    }
    pressedOperation.classList.remove('pressed')
    storedValue = ''
    displayValue = displayValue.toString()
    if (displayValue.length > 12){
        if (!displayValue.includes('.')){
            displayValue = 'Overflow'
        } else{
            arr = displayValue.split('.');
            if (arr[0].length === 12){
                displayValue = Math.round(Number(displayValue)).toString()
                if (displayValue.length > 12){
                    displayValue = 'Overflow'
                }
            } else if (arr[0].length > 12){ 
                displayValue = 'Overflow'
            } else {
                displayValue = Number(displayValue).toFixed(12 - (arr[0].length+1)).toString()
            }
        }
    }
    if (displayValue !== 'Overflow'){
        displayValue = Number(displayValue).toString();
    }
    display.textContent = displayValue;
}

function clearInput(){
    if (document.querySelector('.pressed') !== null){
        document.querySelector('.pressed').classList.remove('pressed');
    }
    displayValue = '0';
    storedValue = ''
    display.textContent = displayValue

}
