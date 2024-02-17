let timers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById("hour").value) || 0;
  const minutes = parseInt(document.getElementById("minute").value) || 0;
  const seconds = parseInt(document.getElementById("second").value) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds > 0) {
    createTimer(totalSeconds);
  } else {
    alert("Please enter a valid time.");
  }
}

function createTimer(totalSeconds) {
  const timer = {
    id: Date.now(),
    totalSeconds,
    intervalId: setInterval(() => {
      timer.totalSeconds--;
      updateTimerDisplay(timer);
      if (timer.totalSeconds <= 0) {
        clearInterval(timer.intervalId);
      }
    }, 1000),
  };

  timers.push(timer);
  updateTimerDisplay(timer);
}

function updateTimerDisplay(timer) {
    let timerCon = document.getElementById(`timer-${timer.id}`);
    if (!timerCon) {
      timerCon = document.createElement("div");
      timerCon.id = `timer-${timer.id}`;
      timerCon.classList.add("container-timer");
      document.getElementById("activeTimers").appendChild(timerCon);
    }
  
    let displayText = "Time Left:";
    let buttonAction = `stopTimer(${timer.id})`;
    let buttonText = "Stop";
  
    if (timer.totalSeconds <= 0) {
      displayText = "Time is up";
      buttonAction = `deleteTimer(${timer.id})`;
      buttonText = "Delete";
      
      const alarmSound = document.getElementById("alarmSound");
      if (alarmSound) {
        alarmSound.play();
      }
    }
  
    const formattedTime = formatTime(Math.max(timer.totalSeconds, 0));
    const [hour, minute, second] = formattedTime.split(":");
  
    timerCon.innerHTML = `
      <span class="set-time">${displayText}</span>
      <div class="timers">
        <div class="inner-time">${hour}</div>
        <span class="inner-dot">:</span>
        <div class="inner-time">${minute}</div>
        <span class="inner-dot">:</span>
        <div class="inner-time">${second}</div>
      </div>
      <button class="set-time-btn" onclick="${buttonAction}">${buttonText}</button>
    `;
  }

  
  

function stopTimer(timerId) {
  clearInterval(timers.find((t) => t.id === timerId).intervalId);
  timers = timers.filter((t) => t.id !== timerId);
  const timerDiv = document.getElementById(`timer-${timerId}`);
  if (timerDiv) {
    timerDiv.parentNode.removeChild(timerDiv);
  }
}

function deleteTimer(timerId) {
    const timerDiv = document.getElementById(`timer-${timerId}`);
    if (timerDiv) {
      timerDiv.parentNode.removeChild(timerDiv);

      const alarmSound = document.getElementById("alarmSound");
      if (alarmSound) {
          alarmSound.pause();
          alarmSound.currentTime = 0;
      }
    }
  }
  

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}
