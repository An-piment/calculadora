let currentOperator = null;
let result = '0';
let operatorDigit = '0';
let lastValue;
let backColor = true;
const numberInputs = document.querySelectorAll('.number-input');
const resultPanel = document.querySelector('.result-field p');
const operators = document.querySelectorAll('.operator-input');

const addNumber = (event) => {
  if (currentOperator === null) {
    if (result.length === 9) return;
    if (result === '0') result = `${event.target.innerText}`;
    else result = `${result}${event.target.innerText}`;
    resultPanel.innerText = result;
    lastValue = undefined;
  } else {
    if (operatorDigit.length === 9) return;
    if (operatorDigit === '0') operatorDigit = `${event.target.innerText}`;
    else operatorDigit = `${operatorDigit}${event.target.innerText}`;
    resultPanel.innerText = operatorDigit;    
  }

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

const removeAllResults = () => {
  const resultParent = document.querySelectorAll('.memory-result');
  resultParent.forEach( element => {
    element.remove();
  });
}

const eraseAllNumber = () => {
    result = '0';
    operatorDigit = '0';
    currentOperator = null;
    resultPanel.innerText = result; 
    removeAllResults();
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

const sum = (operator) => {
  if (currentOperator !== null) showResult();
  currentOperator = 'sum';
}

const minus = () => {
  if (currentOperator !== null) showResult();
  currentOperator = 'minus';
}

const div = () => {
  if (currentOperator !== null) showResult();
  currentOperator = 'div';
}

const mult = () => {
  if (currentOperator !== null) showResult();
  currentOperator = 'mult';
}

const addOperator = (operator, callback) => {
  operator.addEventListener('click', callback);
}

const returnOperator = (operator) => {
  if (operator === 'sum') return '+'; 
  else if (operator === 'minus') return '-';
  else if (operator === 'div') return '÷';
  return 'x';
}

const saveOnMemory = (operator, oldNumber, newNumber) => {
  const div = document.createElement('div');
  const equation = document.createElement('p');
  const calcTable = document.querySelector('.last-calc');
  equation.innerHTML = `${oldNumber} ${returnOperator(operator)} ${newNumber} = ${result}`
  div.className = 'memory-result';
  if (backColor) div.style.backgroundColor = 'rgb(199, 117, 23, 0.3)';
  else div.style.backgroundColor = 'rgba(78, 48, 14, 0.3)';
  backColor = !backColor; 
  div.append(equation);
  calcTable.append(div);
}

const showResult = () => {
  if (!currentOperator) return;
  const oldResult = lastValue !== undefined ? lastValue : result;
  if (lastValue) result = lastValue;
  if (currentOperator === 'sum') result = (parseFloat(result) + parseFloat(operatorDigit)).toFixed(1);
  else if (currentOperator === 'minus') result = (parseFloat(result) - parseFloat(operatorDigit)).toFixed(1);
  else if (currentOperator === 'div') result = (parseFloat(result) / parseFloat(operatorDigit)).toFixed(1);
  else result = (parseFloat(result) * parseFloat(operatorDigit)).toFixed(1);
  resultPanel.innerText = result;
  lastValue = result;
  saveOnMemory(currentOperator, oldResult, operatorDigit)
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
