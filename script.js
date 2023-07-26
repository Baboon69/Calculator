let buttons;
function Calculator(){
    buttons=document.querySelectorAll(".button");
    buttons.forEach((e) => {
        e.addEventListener("click", () => {
            console.log("you clicked a button!");
        });
    });
    console.log(buttons);
}

Calculator();