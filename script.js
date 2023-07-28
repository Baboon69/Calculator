let buttons;
let currentNumber, currentNumberStr;
let display;

function thisIsNumber(num){
    let tmp=currentNumberStr+num;
    currentNumber=Number(tmp);
    currentNumberStr=`${currentNumber}`;
    display.textContent=currentNumberStr;
}
function smthElse(){
    console.log("u clicked smth else")
}

function isNumeric(x){
    return !isNaN(x);
}

function Clear(){
    currentNumber=0;
    currentNumberStr="0";
    display.textContent=currentNumberStr;
}

function AssignEventFunction(btn){
    if(isNumeric(btn.textContent)){
        btn.addEventListener("click", () => {
            thisIsNumber(btn.textContent);
        });
        return;
    }
    btn.addEventListener("click",Clear);
    
}





function Calculator(){
    currentNumber=0;
    currentNumberStr="0";
    display=document.querySelector("#display");
    display.textContent=currentNumberStr;
    buttons=document.querySelectorAll(".button");
    buttons.forEach(
        AssignEventFunction
    )
    console.log(buttons);
}

Calculator();