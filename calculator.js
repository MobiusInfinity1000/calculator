//DOM Inputs
let mainDisplay = document.getElementById("inputDisplay");
let calcDisplay = document.getElementById("calcHistoryDisplay");
let numberButtons = document.getElementsByClassName("number");
let operatorButtons = document.getElementsByClassName("operator");
let clearButton = document.getElementById("clearBtn");
let backspaceButton = document.getElementById("backspaceBtn");
let equalsButton = document.getElementById("equals");
let decimalButton = document.getElementById("decimal");
// let addButton = document.getElementById("addBtn");
// let subtractButton = document.getElementById("subtractBtn");
// let multiplyButton = document.getElementById("multiplyBtn");
// let divideButton = document.getElementById("divideBtn");


//global variable declaration
let currentNumber = mainDisplay.textContent;
let firstNumber = null;
let result = null;
let reClickFlag = false;
let operatorUsed = "";
let symbolOperator = "";


//functions
//gets operator for operate function depending on button clicked or key pressed
function getOperator(inputString){
    switch(inputString){
        case "+":
            return "add";
        case "-":
            return "subtract";
        case "x":
        case "*":
            return "multiply";
        case "÷":
        case "/":
            return "divide";
    };
};

//keyBoard only - gets symbol operator to be input into calcDisplay
function getSymbolOperator(inputString){
    switch(inputString){
        case "+":
            return "+";
        case "-":
            return "-";
        case "x":
        case "*":
            return "x";
        case "÷":
        case "/":
            return "÷";
    };
};


//insert numbers into mainDisplay
function appendInput(){
    mainDisplay.textContent = parseFloat(currentNumber.toString() + this.textContent,10);
    currentNumber = parseFloat(mainDisplay.textContent,10);
    reClickFlag = true;
};

//decimal functionality
function decimalInput(){
    mainDisplay.textContent = currentNumber.toString() + ".";
    currentNumber = mainDisplay.textContent;
    // currentNumber = parseFloat(mainDisplay.textContent, 10);
}
decimalButton.addEventListener('click', decimalInput);


function activatekeyboardNumbers(e){
    const key = document.querySelector(`span[data-key = "${e.key}"]`);
    if (!key) return; //exits if key outside scope entered
    //console.log(e.key);
    if (Number.isNaN(parseInt(e.key,10))) return; //exits if non-number entered
    mainDisplay.textContent = parseFloat(currentNumber.toString() + e.key,10);
    currentNumber = parseFloat(mainDisplay.textContent,10);
    reClickFlag = true;
}

//clear Button
function clearInput(){
    currentNumber = 0;
    firstNumber = null;
    secondNumber = 0;
    result = null;
    operatorUsed = "";
    symbolOperator = "";
    calcDisplay.textContent = "";
    mainDisplay.textContent = currentNumber;
}

//Backspace button
function backSpaceInput(){
    if (currentNumber.toString().length ===1){
        currentNumber = 0;
        mainDisplay.textContent = currentNumber;
    } else{
        currentNumber = parseFloat(currentNumber.toString().substring(0,currentNumber.toString().length-1),10);
        mainDisplay.textContent = currentNumber;
    };
    
};

//operator functionality
function appendOperand(){
    if (reClickFlag === true){
        if (firstNumber != null){
            calcResult();
        };
        firstNumber = currentNumber;
        reClickFlag = false;
    }
    symbolOperator = this.textContent;
    operatorUsed = getOperator(this.textContent);
    calcDisplay.textContent = firstNumber + this.textContent;
    currentNumber = 0;
};

function activatekeyboardOperands(e){
    const key = document.querySelector(`span[data-key = "${e.key}"]`);
    if (!key) return; //exits if key outside scope entered
    //console.log(e.key);
    if (!Number.isNaN(parseInt(e.key,10))) return; //exits if non-number entered
    if (e.key === ".") return;  //doesn't apply to decimals
    
    //same as getOperand
    if (reClickFlag === true){
        if (firstNumber != null){
            calcResult();
        };
        firstNumber = currentNumber;
        reClickFlag = false;
    }
    symbolOperator = getSymbolOperator(e.key);
    operatorUsed = getOperator(e.key);
    calcDisplay.textContent = firstNumber + symbolOperator;
    currentNumber = 0;
}

function calcResult(){

    result = Math.round(operate(operatorUsed, firstNumber, currentNumber)*10000)/10000; //rounding to 4dp
    if (isNaN(result) === false) {
        mainDisplay.textContent = result;
        calcDisplay.textContent = firstNumber + symbolOperator + currentNumber + "=";
        currentNumber = result;
        firstNumber = null;
    };
};



//basic functions
function func_add(a,b){
    return a+b;
};

function func_subtract(a,b){
    return a-b;
};

function func_multiply(a,b){
    return a*b;
};

function func_divide(a,b){
    if (b===0){
        alert("LMAO, you can't divide by 0!");
        return 0;
    } else {
    return a/b;
    };
};

function operate(functionName, a, b){
    return window["func_"+functionName](a,b);
};

//Click event listeners
for (let i=0; i< numberButtons.length;i++){
    numberButtons[i].addEventListener("click",appendInput);
};

for (let i=0; i<operatorButtons.length; i++){
    operatorButtons[i].addEventListener("click", appendOperand);
};

clearButton.addEventListener("click", clearInput);
backspaceButton.addEventListener("click", backSpaceInput);
equalsButton.addEventListener("click", calcResult);
decimalButton.addEventListener('click', decimalInput);


//keyboard Event listeners
window.addEventListener('keydown', activatekeyboardNumbers);
document.addEventListener('keydown', activatekeyboardOperands);
document.addEventListener('keydown', (e) => {
    (e.key === "Enter") ? calcResult()
    : (e.key === "Backspace") ? backSpaceInput()
    : (e.key === "Escape") ? clearInput()
    : (e.key === ".") ? decimalInput()
    : null;
});


// document.addEventListener('keydown', function(event){
// 	if(event.key === "Escape"){
// 		clearInput();
// 	} else if (event.key === "Backspace") {
//         backSpaceInput();
//     } else if (event.key === "Enter") {
//         calcResult();
//     };
// });
