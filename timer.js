
const hr = document.querySelector('.hour');
const mn = document.querySelector('.minute');
const sd = document.querySelector('.second');
const clock = document.querySelector('.clock');
const clockContainer = document.querySelector('.clock-container');
const btn_start = document.querySelector('.btn-start');
const music = document.querySelector('.sound audio');
const input_musicFile = document.querySelector('.input-musicUpload');
const btn_reset = document.querySelector('.btn-reset');

let second = 0;
let stratTimerEvent='';

if(localStorage.audioFile){
    music.setAttribute('src', localStorage.audioFile);
}

input_musicFile.addEventListener('change', (e)=>{
    let file = e.target.files[0].name;
    console.log(file);
    music.setAttribute('src', file);
    localStorage.audioFile = file;
})



hr.addEventListener('wheel', (e)=>{
  

    let hour = Number(hr.textContent);
    e.deltaY < 0 ? hour += 1 : hour > 1 ? hour -= 1 : hour = 24;
    hour = hour < 25 ? hour : 0;
    hr.textContent = hour > 9 ? hour : '0' + hour;

    clearTimeout(stratTimerEvent);

})

mn.addEventListener('wheel', (e)=>{
   
    let minute = Number(mn.textContent);
    e.deltaY < 0 ? minute += 1 : minute > 1 ? minute -= 1 : minute = 59;
    minute = minute < 60 ? minute : 0;
    mn.textContent = minute > 9 ? minute : '0' + minute;

    clearTimeout(stratTimerEvent);

})

sd.addEventListener('wheel', (e)=>{
   
    let s = Number(sd.textContent);
    e.deltaY < 0 ? s += 1 : s > 1 ? s -= 1 : s = 59;
    s = s < 60 ? s : 0;
    sd.textContent = s > 9 ? s : '0' + s;

    clearTimeout(stratTimerEvent);

})

btn_start.addEventListener('click', ()=>{
    second = Number(hr.textContent)* 3600 + Number(mn.textContent) *60 + Number(sd.textContent);
    if(second > 0){
      startTimer();
    }
});
btn_reset.addEventListener('click', resetTimer);

function startTimer(){
    clock.classList.add('timerStarted');
    document.querySelector('.pendulum-1').classList.add('pendulum-animate');
    document.querySelector('.pendulum-2').classList.add('pendulum-2-animate');

    clearTimeout(stratTimerEvent);
    second -= 1;
    let time = secondToTime(second);
    hr.textContent = time[0] + time[1];
    mn.textContent = time[3] + time[4];
    sd.textContent = time[6] + time[7];
    
    stratTimerEvent = setTimeout(startTimer, 1000);
    if(second == 0){
        clearTimeout(stratTimerEvent);
        elapsedTime();
        music.play();
        console.log('start play music') 
    }
}

function elapsedTime(){
    clearTimeout(stratTimerEvent);
    clock.classList.remove('timerStarted');
    let time = secondToTime(second);
    hr.textContent = time[0] + time[1];
    mn.textContent = time[3] + time[4];
    sd.textContent = time[6] + time[7];
    second += 1 ;
    stratTimerEvent = setTimeout(elapsedTime, 1000);
    clock.classList.add('timeElapsed');
    clock.parentElement.classList.add('timeElapsed');
}

function formatNumber(num){
    return num < 10 ? "0" + num : num;
}

function secondToTime(second){   
    if(second<1){
        return "00:00:00";
    }
    let s = second;
    let h = Math.floor(s / 3600);
    s -= h * 3600 
    let m = Math.floor(s / 60);
    s -=  m * 60;
    
    return formatNumber(h)+":"+formatNumber(m)+":"+formatNumber(s) ;
}

function resetTimer(){ 
    document.querySelector('.pendulum-1').classList.remove('pendulum-animate');
    document.querySelector('.pendulum-2').classList.remove('pendulum-2-animate');
    clearTimeout(stratTimerEvent);
    clock.classList.remove("timeElapsed");
    clock.classList.remove('timerStarted');
    clock.parentElement.classList.remove('timeElapsed');
    hr.textContent = '00';
    mn.textContent = '00';
    sd.textContent = '00';
    second = 0;
    music.load();
}
