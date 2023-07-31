let buttons, display, stored, operation;
let currentNumber, currentNumberStr;
let storedNumber, storedNumberStr;
let func;
let isDeletable;

function operate(a, b, operator){
    return operator(a,b);
}
function add(x, y){
    return x+y;
}
function sub(x, y){
    return x-y;
}
function mul(x, y){
    return x*y;
}
function div(x, y){
    return x/y;
}

function setCurrent(num){
    currentNumber=num;
    currentNumberStr=`${currentNumber}`;
}

function Calculate(){
    if(func===div){
        if(currentNumber===0){
            storedNumber=0;
            storedNumberStr="0";
            func=null;
            display.textContent="ERR";
            showStored();
            return;
        }
    }
    setCurrent(operate(storedNumber,currentNumber,func));
    func=null;
    updateScreen();
}

function addNumber(num){
    if(currentNumberStr.length>=9)
        return;
    if(currentNumber>=1000000000)
        return;
    isDeletable=true;
    let tmp=currentNumberStr+num;
    setCurrent(Number(tmp));
    showCurrent();
}
function isNumeric(x){
    return !isNaN(x);
}
function addFloat(){
    if(!Number.isInteger(currentNumber))
        return;
    
    if(currentNumberStr.slice(-1)===".")
        return;
    isDeletable=true;
    currentNumberStr+=".";
    showCurrent();
}

function setCurrent(num){
    if(Number.isInteger(num)){
        if(num>=1000000000){
            currentNumber=num;
            currentNumberStr=`${currentNumber.toExponential()}`;
            isDeletable=false;
            return;
        }
    }
    else{
        let tmp=`${num}`;
        if(tmp.length>9){
            currentNumber=num;
            currentNumberStr=`${currentNumber.toFixed(8)}`;
            isDeletable=false;
            return;
        }
    }

    currentNumber=num;
    currentNumberStr=`${currentNumber}`;
}

function deleteLast(){
    let tmp=currentNumberStr.substr(0,currentNumberStr.length-1);
    if(!isDeletable)
        return;
    if(currentNumber==0)
        return;
    if(currentNumberStr.slice(-1)==="."){
        currentNumberStr=tmp;
        showCurrent();
        return;
    }
    if(Number.isInteger(currentNumber))
        if(currentNumber<10){
            resetCurrent();
            showCurrent();
            return;
        }
    setCurrent(Number(tmp));
    showCurrent();
}

function setOperation(){
    switch(func){
        case add:
            operation.textContent="+";
            break;
        case sub:
            operation.textContent="-";
            break;
        case mul:
            operation.textContent="*";
            break;
        case div:
            operation.textContent="/";
            break;
        default:
            operation.textContent="";
    }
}

function resetCurrent(){
    currentNumber=0;
    currentNumberStr="0";
}
function storeCurrent(){
    storedNumber=currentNumber;
    storedNumberStr=currentNumberStr;
    resetCurrent();
}
function showStored(){
    stored.textContent=storedNumberStr;
}
function showCurrent(){
    display.textContent=currentNumberStr;
}
function updateScreen(){
    showStored();
    showCurrent();
    setOperation();
}

function Clear(){
    currentNumber=0;
    currentNumberStr="0";
    showCurrent();
}

function Placeholder(){
    console.log("Place holder")
}

function AssignEventFunction(btn){
    if(isNumeric(btn.textContent)){
        btn.addEventListener("click", () => {
            addNumber(btn.textContent);
        });
        return;
    }

    if(btn.textContent==="A/C"){
        btn.addEventListener("click",Clear);
        return;
    }
    if(btn.textContent==="."){
        btn.addEventListener("click", addFloat);
        return;
    }

    if(btn.textContent==="="){
        btn.addEventListener("click",()=>{
            console.log("almost");
            if(func!=null)
                Calculate();
        });
        return;
    }

    if(btn.textContent==="⌫"){
        btn.addEventListener("click",deleteLast);
        return;
    }

    if(btn.textContent==="+"){
        btn.addEventListener("click", ()=>{
            if(func!=null)
                Calculate();
            func=add;
            storeCurrent();
            updateScreen();
        });
        return;
    }
    if(btn.textContent==="-"){
        btn.addEventListener("click", ()=>{
            if(func!=null)
                Calculate();
            func=sub;
            storeCurrent();
            updateScreen();
        });
        return;
    }
    if(btn.textContent==="*"){
        btn.addEventListener("click", ()=>{
            if(func!=null)
                Calculate();
            func=mul;
            storeCurrent();
            updateScreen();
        });
        return;
    }
    if(btn.textContent==="/"){
        btn.addEventListener("click", ()=>{
            if(func!=null)
                Calculate();
            func=div;
            storeCurrent();
            updateScreen();
        });
        return;
    }

    btn.addEventListener("click",Placeholder);
    
}





function Calculator(){
    func=null;
    currentNumber=0;
    currentNumberStr="0";
    storedNumber=0;
    storedNumberStr="0";
    isDeletable=false;
    display=document.querySelector("#display");
    stored=document.querySelector("#stored");
    operation=document.querySelector("#operation");
    setOperation();
    updateScreen();
    buttons=document.querySelectorAll(".button");
    buttons.forEach(
        AssignEventFunction
    );
    window.addEventListener("keydown", (e)=>{
        tmp=e.code.slice(-1);
        if(isNumeric(tmp)){
            addNumber(tmp);
            return;
        }
        if(e.code==="Backspace"){
            deleteLast();
            return;
        }
        console.log(e.code);
    });
    console.log(buttons);
}

Calculator();