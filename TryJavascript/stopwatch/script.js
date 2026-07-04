const clock = document.getElementById("time");
let secElapsed = 0;
let minElapsed = 0;
let interval = null;

function padStart(value){
    return String(value).padStart(2,"0")
}

function setTime(){
    //how many updates
    clock.innerHTML = padStart(minElapsed).toString().concat(":",padStart(secElapsed).toString());
}

function timer(){
    secElapsed++;
    if (secElapsed==60){
        minElapsed++;
        secElapsed=0;
    }
    setTime()
}
function startClock(){
    if (interval) stopClock()
    interval = setInterval(timer, 1000)  //builtin
    //runs function timer in every 1000 ms
}

function stopClock(){
    clearInterval(interval)
}

function resetClock(){
    secElapsed=0;
    minElapsed=0;
    stopClock();
    setTime();
}