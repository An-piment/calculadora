let currentOperator = null;
let result = '0';
let operatorDigit = '0';
let lastValue;
const numberInputs = document.querySelectorAll('.number-input');
const resultPanel = document.querySelector('.result-field p');
const operators = document.querySelectorAll('.operator-input');

const addNumber = (event) => {
  if (currentOperator === null) {
    if (result.length === 8) return;
    if (result === '0') result = `${event.target.innerText}`;
    else result = `${result}${event.target.innerText}`;
    resultPanel.innerText = result;
    lastValue = undefined;
  } else {
    if (operatorDigit.length === 8) return;
    if (operatorDigit === '0') operatorDigit = `${event.target.innerText}`;
    else operatorDigit = `${operatorDigit}${event.target.innerText}`;
    resultPanel.innerText = operatorDigit;    
  }
  resultPanel.style.fontSize = `30px`

}

const updateCurrentNumber = (typeNumber) => {
  if (typeNumber === '0') return '0';
  typeNumber = typeNumber.slice(0, -1);
  if (typeNumber === '') typeNumber = '0';
  return typeNumber;  
}

const eraseOneNumber = () => {
  if (currentOperator === null) {
    result = updateCurrentNumber(result);
    resultPanel.innerText = result;
  } else {
    operatorDigit = updateCurrentNumber(operatorDigit);
    resultPanel.innerText = operatorDigit;
  }
}

const eraseAllNumber = () => {
    result = '0';
    operatorDigit = '0';
    currentOperator = null;
    resultPanel.innerText = result; 
}

const addNumberFunctions = () => {
  numberInputs.forEach((value) => {
    value.addEventListener('click', addNumber);
  });
}

const addEraseFunction = () => {
  const eraseButton = document.querySelector('.erase-one');
  eraseButton.addEventListener('click', eraseOneNumber);
}

const addEraseAllFunction = () => {
  const eraseButton = document.querySelector('.erase-all');
  eraseButton.addEventListener('click', eraseAllNumber);
}

const sum = () => {
  currentOperator = 'sum';
}

const minus = () => currentOperator = 'minus';

const div = () => currentOperator = 'div';

const mult = () => currentOperator = 'mult';

const addOperator = (operator, callback) => {
  operator.addEventListener('click', callback);
}

const resize = (value) => {
  if (value > 99999999) resultPanel.style.fontSize = `15px`;
}

const showResult = () => {
  if (!currentOperator) return;
  if (lastValue) result = lastValue;
  if (currentOperator === 'sum') result = parseInt(result) + parseInt(operatorDigit);
  else if (currentOperator === 'minus') result = (parseInt(result) - parseInt(operatorDigit));
  else if (currentOperator === 'div') result = (parseInt(result) / parseInt(operatorDigit)).toFixed(2);
  else result = parseInt(result) * parseInt(operatorDigit);
  resize(result)
  resultPanel.innerText = result;
  lastValue = result;
  result = '0';
  currentOperator = null;
  operatorDigit = '0';
}

window.onload = () => {
  addNumberFunctions();
  addEraseFunction();
  addEraseAllFunction();
  addOperator(operators[0], div);
  addOperator(operators[1], mult);
  addOperator(operators[2], minus);
  addOperator(operators[3], sum);
  operators[4].addEventListener('click', showResult);
}