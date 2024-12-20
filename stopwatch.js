// stopwatch.js
let startTime, updatedTime, difference, tInterval, running = false;
let lapTimes = [];

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00.0';
    lapTimes = [];
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let milliseconds = Math.floor((difference % 1000) / 10);
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);
    let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    display.innerHTML = 
        (hours > 9 ? hours : '0' + hours) + ':' + 
        (minutes > 9 ? minutes : '0' + minutes) + ':' + 
        (seconds > 9 ? seconds : '0' + seconds) + '.' + 
        (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}

function recordLap() {
    if (running) {
        lapTimes.push(display.innerHTML);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = display.innerHTML;
        laps.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
