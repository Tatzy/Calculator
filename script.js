let inputList = [];
const displayLength = 22;
let outputValues = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/"];
let buttonsNames = ["zero", "one", "two", "three", "four", "five", "six", "seven","eight", "nine", "plus", "minus", "multiply", "divide", "clear", "result"];
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



zero.addEventListener("click", () => {clicked(zero)});
one.addEventListener("click", () => {clicked(one)});
two.addEventListener("click", () => {clicked(two)});
three.addEventListener("click", () => {clicked(three)});
four.addEventListener("click", () => {clicked(four)});
five.addEventListener("click", () => {clicked(five)});
six.addEventListener("click", () => {clicked(six)});
seven.addEventListener("click", () => {clicked(seven)});
eight.addEventListener("click", () => {clicked(eight)});
nine.addEventListener("click", () => {clicked(nine)});
plus.addEventListener("click", () => {clicked(plus)});
minus.addEventListener("click", () => {clicked(minus)});
multiply.addEventListener("click", () => {clicked(multiply)});
divide.addEventListener("click", () => {clicked(divide)});
clear.addEventListener("click", () => {clicked(clear)});
result.addEventListener("click", () => {clicked(result)});



function clicked(button){
    let found = false;
    
    for(i=0; i<16; i++){
       if(button.id==buttonsNames[i] && found==false){
        if(i<14){
            
            //if result was pressed, clear the whole display
            if(isResult){
                displayValues=[]
                isResult=false;
            }

            if(displayIndex<displayLength){
            displayValues[displayIndex]=outputValues[i];
            displayIndex++;}
            found=true;
        }
        else if(i==14){
            //clear
            
            //if result was pressed, clear the whole display
            if(isResult){
                displayValues=[]
                isResult=false;
            }

            displayValues = [];
            displayValues[0] = "Clear";
            displayIndex = 0;   
            found=true;
        }
        else if(i==15 && !isResult){
            
            //result
            
            calculate();
            isResult=true;
            found=true;
        }
       }
    }
    //DisplayAnzeige
    document.querySelector("#display").textContent = displayValues.join("");
}

function calculate(){
    let res=0;
    let tempNumSaver = []
    let tempNumSaver2 = []
    let tempNumSaverIndex = 0;
    let tempNumSaverIndex2 = 0;
    let num1 = 0;
    let num2 = 0;
    let hold = false;
    for(i=0; i<displayIndex+1; i++){
        switch(displayValues[i]) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                if(hold){
                tempNumSaver2[tempNumSaverIndex2]=displayValues[i];
                tempNumSaverIndex2++;
                }
                else{
                tempNumSaver[tempNumSaverIndex]=displayValues[i];
                tempNumSaverIndex++;}
                break;
            case "+":
                if(checkSyntax(i)){
                    num1 = tempNumSaver.join("");
                    hold = true;
                    break;
                }
                displayValues[0]="false";
                break;
            case "-":
                if(checkSyntax(i)){
                    res -= parseInt(tempNumSaver.join(""));
                    break;
                }
                displayValues[0]="false";
                break;
            case "*":
                if(checkSyntax(i)){
                    res *= parseInt(tempNumSaver.join(""));
                    break;
                }
                displayValues[0]="false";
                break;
            case "/":
                if(checkSyntax(i)){
                    res /= parseInt(tempNumSaver.join(""));
                    break;
                }
                displayValues[0]="false";
                break;
            
        }
    }
    
    
    //this "hold" is a temporary solution. My problem right now is that:
    //1.i cant have multiple operations in one term. For example: 4+3*9 -> 3*9 has priority over 4+3
    //which my program cant compute
    //2.i only can use the operator plus, but also only with 2 operands

    if(!hold){
        res = tempNumSaver.join("");
    }

    if(hold) {
        num2 = tempNumSaver2.join("");
        
        res = parseInt(num1) + parseInt(num2);
    
        hold=false;
    }

    
    displayValues=[];
    displayValues[0] = res;
    displayIndex = 0;
}

function checkSyntax(index){
    if(index==0){
        return false;
    }
    else{
        if(displayValues[index-1]=="+"|displayValues[index-1]=="-"|displayValues[index-1]=="*"|displayValues[index-1]=="/"){
            return false;
        }
    }
    return true;
}





