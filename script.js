let timer;
let startTime;
let running = false;
let elapsedTime = 0;
let counter = 0;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');
const stopwatchModeBtn = document.getElementById('stopwatchMode');
const countdownModeBtn = document.getElementById('countdownMode');
const counterModeBtn = document.getElementById('counterMode');
const counterControls = document.querySelector('.counter-controls');
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');

let mode = 'stopwatch';  // Default mode

function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = Math.floor((ms % 1000) / 10);

    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0')
    );
}

function updateDisplay() {
    let now = Date.now();
    elapsedTime += now - startTime;
    startTime = now;
    display.textContent = formatTime(elapsedTime);
}

// Stopwatch Start/Stop
startStopBtn.addEventListener('click', () => {
    if (mode !== 'stopwatch') return;

    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Stop';
    }
    running = !running;
});

// Lap Function
lapBtn.addEventListener('click', () => {
    if (!running || mode !== 'stopwatch') return;
    const lapTime = document.createElement('li');
    lapTime.textContent = display.textContent;
    lapsList.appendChild(lapTime);
});

// Reset
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.textContent = "00:00.00";
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';
});

// Mode Switching
function switchMode(newMode) {
    mode = newMode;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = mode === 'counter' ? "0" : "00:00.00";
    startStopBtn.textContent = 'Start';
    lapsList.innerHTML = '';

    document.querySelector('.controls').classList.toggle('hidden', mode === 'counter');
    lapBtn.classList.toggle('hidden', mode !== 'stopwatch');
    counterControls.classList.toggle('hidden', mode !== 'counter');
}

stopwatchModeBtn.addEventListener('click', () => switchMode('stopwatch'));
countdownModeBtn.addEventListener('click', () => switchMode('countdown'));
counterModeBtn.addEventListener('click', () => switchMode('counter'));

// Counter Mode
incrementBtn.addEventListener('click', () => {
    if (mode === 'counter') counterValue.textContent = ++counter;
});

decrementBtn.addEventListener('click', () => {
    if (mode === 'counter' && counter > 0) counterValue.textContent = --counter;
});
