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
