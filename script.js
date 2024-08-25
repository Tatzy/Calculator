let inputList = [];
const displayLength = 22;
let outputValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/"];
let buttonsNames = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "plus", "minus", "multiply", "divide", "clear", "result"];
let displayValues = [];
let displayIndex = 0;
let isResult = false;

//16 buttons
const zero = document.querySelector("#zero");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiply = document.querySelector("#multiply");
const divide = document.querySelector("#divide");
const clear = document.querySelector("#clear");
const result = document.querySelector("#result");



zero.addEventListener("click", () => { clicked(zero) });
one.addEventListener("click", () => { clicked(one) });
two.addEventListener("click", () => { clicked(two) });
three.addEventListener("click", () => { clicked(three) });
four.addEventListener("click", () => { clicked(four) });
five.addEventListener("click", () => { clicked(five) });
six.addEventListener("click", () => { clicked(six) });
seven.addEventListener("click", () => { clicked(seven) });
eight.addEventListener("click", () => { clicked(eight) });
nine.addEventListener("click", () => { clicked(nine) });
plus.addEventListener("click", () => { clicked(plus) });
minus.addEventListener("click", () => { clicked(minus) });
multiply.addEventListener("click", () => { clicked(multiply) });
divide.addEventListener("click", () => { clicked(divide) });
clear.addEventListener("click", () => { clicked(clear) });
result.addEventListener("click", () => { clicked(result) });



function clicked(button) {
    let found = false;

    for (i = 0; i < 16; i++) {
        if (button.id == buttonsNames[i] && found == false) {
            if (i < 14) {

                //if result was pressed before, clear the whole display
                if (isResult) {
                    displayValues = []
                    isResult = false;
                }

                if (displayIndex < displayLength) {
                    displayValues[displayIndex] = outputValues[i];
                    displayIndex++;
                }
                found = true;
            }
            else if (i == 14) {
                //clear

                //if result was pressed before, clear the whole display
                if (isResult) {
                    displayValues = []
                    isResult = false;
                }

                displayValues = [];
                displayValues[0] = "Clear";
                displayIndex = 0;
                found = true;
            }
            else if (i == 15 && !isResult) {

                //result

                calculate();
                isResult = true;
                found = true;
            }
        }
    }
    //DisplayAnzeige
    document.querySelector("#display").textContent = displayValues.join("");
}

function calculate() {
    if (checkSyntax()) {
        let res = displayValues.join("");
        displayValues = [];
        displayValues[0] = eval(res);
        displayIndex = 0;
    }
}

function checkSyntax() {
        
    for (index = 0; index < displayIndex; index++) {
        if (index == 0) {
            if (displayValues[index] == "+" | displayValues[index] == "-" | displayValues[index] == "*" | displayValues[index] == "/")
                return false;
        }
        else {
            if (displayValues[index] == "+" | displayValues[index] == "-" | displayValues[index] == "*" | displayValues[index] == "/") {
                if (displayValues[index - 1] == "+" | displayValues[index - 1] == "-" | displayValues[index - 1] == "*" | displayValues[index - 1] == "/") {
                    return false;
                }
                if(displayIndex-1==index){
                    return false;
                }
            }    
        }
    }
    return true;
}





