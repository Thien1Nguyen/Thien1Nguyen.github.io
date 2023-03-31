let num = 1;
let delay = 1000;
let arr = [0,1]
let oneZero = Math.round(Math.random() + 0.4)

function loop(){
    console.log(oneZero)
    

    if(delay > 100){
    delay = delay - 100;
    }
    setTimeout(()=>{loop();},delay)
}

loop();