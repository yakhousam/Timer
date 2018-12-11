
let timer = document.querySelector('#time');
let clock = document.querySelector('.clock');
let start = document.querySelector('.start');
let music = document.querySelector('.sound audio');
let second = 3;
let stratTimerEvent='';

timer.addEventListener('input', ()=>{
    second = timer.value * 60;
    clock.textContent = secondToTime(second);
    clearTimeout(stratTimerEvent);

})


start.addEventListener('click', startTimer);

function startTimer(){
    second -= 1;
    clock.textContent = secondToTime(second);
    
    timer.valueAsNumber = Math.floor(second/60);

    stratTimerEvent = setTimeout(startTimer, 1000);
    if(second<1){
        clearTimeout(stratTimerEvent);
        music.play();
        console.log('start play music') 
    }
}

function secondToTime(second){
    if(second<1){
        return "00:00:00";
    }
    let s = second;
    let m = 0;
    let h = 0;

    h = Math.floor(s / 3600);
    if(h<10){
        h = "0"+h;
    }
    s -= h * 3600;
    
    m = Math.floor(s / 60);
    if(m<10){
        m = "0"+m;
    }    
    s -= m * 60;
    if(s<10){
        s = "0"+s;
    }

    return h+":"+m+":"+s ;
}

