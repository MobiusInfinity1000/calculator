let inputDisplay = document.getElementById("inputDisplay");
let calcDisplay = document.getElementById("calcHistoryDisplay");
let currentNumber = inputDisplay.textContent;
let firstNumber = null;
let result = null;
let secondNumber = 0;
let reClickFlag = false;
let operatorUsed = "";
let symbolOperator = "";
let numberButtons = document.getElementsByClassName("number");
let clearButton = document.getElementById("clearBtn");
let backspaceButton = document.getElementById("backspaceBtn");
let addButton = document.getElementById("addBtn");
let subtractButton = document.getElementById("subtractBtn");
let multiplyButton = document.getElementById("multiplyBtn");
let divideButton = document.getElementById("divideBtn");
let operatorButtons = document.getElementsByClassName("operator");
let equalsButton = document.getElementById("equals");

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


//insert numbers into input
function appendInput(){
    inputDisplay.textContent = parseInt(currentNumber.toString() + this.textContent,10);
    currentNumber = parseInt(inputDisplay.textContent,10);
    reClickFlag = true;
};

function activatekeyboardNumbers(e){
    const key = document.querySelector(`span[data-key = "${e.key}"]`);
    if (!key) return; //exits if key outside scope entered
    //console.log(e.key);
    if (Number.isNaN(parseInt(e.key,10))) return; //exits if non-number entered
    inputDisplay.textContent = parseInt(currentNumber.toString() + e.key,10);
    currentNumber = parseInt(inputDisplay.textContent,10);
    reClickFlag = true;
    //console.log(e.key);
   // console.log(parseInt(e.key,10));
}

for (let i=0; i< numberButtons.length;i++){
    numberButtons[i].addEventListener("click",appendInput);
};

window.addEventListener('keydown', activatekeyboardNumbers);

//clear Button
function clearInput(){
    currentNumber = 0;
    firstNumber = null;
    secondNumber = 0;
    result = null;
    calcDisplay.textContent = "";
    inputDisplay.textContent = currentNumber;
}


clearButton.addEventListener("click", clearInput);
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
		clearInput();
	}
});

//Backspace button
function backSpaceInput(){
    if (currentNumber.toString().length ===1){
        currentNumber = 0;
        inputDisplay.textContent = currentNumber;
    } else{
        currentNumber = parseInt(currentNumber.toString().substring(0,currentNumber.toString().length-1),10);
        inputDisplay.textContent = currentNumber;
    };
    
};
backspaceButton.addEventListener("click", backSpaceInput);

document.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
        backSpaceInput();
    };
});
//add operator functionality;

function getOperand(){
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
    // console.log(operatorUsed);
    
    // if (result != null){
    //     calcResult();
    //     calcDisplay.textContent = "it worked!";
    // };
};

for (let i=0; i<operatorButtons.length; i++){
    operatorButtons[i].addEventListener("click", getOperand);
};

function activatekeyboardOperands(e){
    const key = document.querySelector(`span[data-key = "${e.key}"]`);
    if (!key) return; //exits if key outside scope entered
    //console.log(e.key);
    if (!Number.isNaN(parseInt(e.key,10))) return; //exits if non-number entered
    
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
    // console.log(operatorUsed);


    //console.log(e.key);
   // console.log(parseInt(e.key,10));
}

document.addEventListener('keydown', activatekeyboardOperands);

function calcResult(){
    result = operate(operatorUsed, firstNumber, currentNumber);
    inputDisplay.textContent = result;
    calcDisplay.textContent = firstNumber + symbolOperator + currentNumber + "=";
    currentNumber = result;
    firstNumber = null;
    //result = null;
};
equalsButton.addEventListener("click", calcResult);

document.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        calcResult();
    };
})
//operator buttons
//add
// addButton.addEventListener("click", () => {
//     operatorUsed = "add";

//     switch(calcDisplay.textContent) {
//         case "":
//             firstNumber = currentNumber;
//             currentNumber = 0;
//             inputDisplay.textContent = 0;
//             calcDisplay.textContent = firstNumber + "+";
//             console.log("case 1 applied");
//             break;
//         case (firstNumber + "+"):
//             secondNumber = currentNumber;
//             result = operate("add", firstNumber, secondNumber);
//             calcDisplay.textContent = firstNumber + "+" + secondNumber;
//             inputDisplay.textContent = result;
//             currentNumber = 0;
//             console.log("case 2 applied");
//             break;
//         case (firstNumber + "+" + secondNumber):
//             result = firstNumber;
//             calcDisplay.textContent = firstNumber + "+";
//             currentNumber = 0;
//             inputDisplay.textContent = 0;
//             result = null;
//             console.log("case 3 applied");
//             break;
//         default:
//             inputDisplay.textContent = "how did you manage this?";
//             console.log("case default applied");
//     };

    // if (!firstNumber) {
    //     firstNumber = currentNumber;
    //     currentNumber = 0;
    //     inputDisplay.textContent = 0;
    //     calcDisplay.textContent = firstNumber + "+";
    // } else{
    //     result = operate(operatorUsed, firstNumber, currentNumber);
    //     calcDisplay.textContent = firstNumber + "+" + currentNumber;
    //     inputDisplay.textContent = result;
    //     currentNumber = 0;
    //     firstNumber = result;
    //  //   result = null;
    // }
    

    
    
// });



// console.log(numberButtons[0].textContent);
// console.log(inputDisplay);
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
    return a/b;
};

function func_power(a,b){
    return Math.pow(a,b);
};

function operate(functionName, a, b){
    return window["func_"+functionName](a,b);
};
