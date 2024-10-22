// UI Elements
const stopwatchArrow = document.getElementById('stopwatch-arrow');
const countdownArrow = document.getElementById('countdown-arrow');
const stopwatchContainer = document.getElementById('stopwatch-container');
const countdownContainer = document.getElementById('countdown-container');
const stopwatchTimeDisplay = document.getElementById('stopwatch-time');
const countdownTimeDisplay = document.getElementById('countdown-time');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const setCountdownBtn = document.getElementById('set-countdown-btn');
const resetCountdownBtn = document.getElementById('reset-countdown-btn');
const backStopwatchBtn = document.getElementById('back-stopwatch');
const backCountdownBtn = document.getElementById('back-countdown');

// State
let stopwatchRunning = false;
let time = 0;
let countdownTime = 0;

// Hide both containers on load
window.onload = () => {
    stopwatchContainer.classList.add('hidden');
    countdownContainer.classList.add('hidden');
};

// Functions to toggle between stopwatch and countdown
function showStopwatch() {
    stopwatchContainer.classList.remove('hidden');
    countdownContainer.classList.add('hidden');
}

function showCountdown() {
    countdownContainer.classList.remove('hidden');
    stopwatchContainer.classList.add('hidden');
}

// Stopwatch Functions
function updateStopwatchDisplay() {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    stopwatchTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    stopwatchInterval = setInterval(() => {
        time++;
        updateStopwatchDisplay();
    }, 1000);
    stopwatchRunning = true;
    startPauseBtn.textContent = 'Pause';
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    startPauseBtn.textContent = 'Continue';
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    time = 0;
    updateStopwatchDisplay();
    startPauseBtn.textContent = 'Start';
    stopwatchRunning = false;
}

// Countdown Functions
function updateCountdownDisplay() {
    countdownTimeDisplay.textContent = countdownTime.toString().padStart(8, '00:00:00');
}

function setCountdown() {
    countdownTime = prompt('Enter countdown time in seconds:', '60');
    if (!isNaN(countdownTime) && countdownTime > 0) {
        updateCountdownDisplay();
        setCountdownBtn.disabled = true;
        startPauseBtn.textContent = 'Start Countdown';
        startPauseBtn.disabled = false;
    } else {
        alert('Please enter a valid number!');
    }
}

function startCountdown() {
    countdownInterval = setInterval(() => {
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            timeExpired();
        } else {
            countdownTime--;
            updateCountdownDisplay();
        }
    }, 1000);
}

function timeExpired() {
    countdownTimeDisplay.classList.add('time-finished');
    alert('Time is up!');
}

// Event Listeners for navigation
stopwatchArrow.addEventListener('click', showStopwatch);
countdownArrow.addEventListener('click', showCountdown);
backStopwatchBtn.addEventListener('click', () => {
    stopwatchContainer.classList.add('hidden');
});
backCountdownBtn.addEventListener('click', () => {
    countdownContainer.classList.add('hidden');
});

// Stopwatch Event Listeners
startPauseBtn.addEventListener('click', () => {
    if (!stopwatchRunning) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);

// Countdown Event Listeners
setCountdownBtn.addEventListener('click', setCountdown);
resetCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownTime = 0;
    updateCountdownDisplay();
});
