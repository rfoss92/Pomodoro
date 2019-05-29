(pomodoro => {
  let minutes = $("#minutes").html();
  let seconds = 60;
  let breakLength = $("#breakLength").html();
  let sessionLength = $("#sessionLength").html();
  let isSession = true;
  let isPaused = true;
  $("#pauseButton, #resetButton").prop('disabled', true);

  // settings
  sessionMinus.onclick = () => {    
    if (sessionLength > 1) {
      $("#sessionLength")[0].innerHTML--;
      sessionLength = $("#sessionLength").html();
      $("#minutes").html(sessionLength);
      minutes = sessionLength;
    }
  };
  sessionPlus.onclick = () => {  
    $("#sessionLength")[0].innerHTML++;  
    sessionLength = $("#sessionLength").html();
    $("#minutes").html(sessionLength);
    minutes = sessionLength;
  };
  breakMinus.onclick = () => {  
    if (breakLength > 1) {
      $("#breakLength")[0].innerHTML--;   
      breakLength = $("#breakLength").html();
    }
  };
  breakPlus.onclick = () => {
    $("#breakLength")[0].innerHTML++;
    breakLength = $("#breakLength").html();
  };

  // menu
  startButton.onclick = () => {
    $("#pauseButton, #resetButton").prop('disabled', false);
    $("#sessionPlus, #sessionMinus, #breakPlus, #breakMinus, #startButton").prop('disabled', true);
    isPaused = false;      
  }; 
  pauseButton.onclick = () => {
    $("#pauseButton").prop('disabled', true);    
    $("#startButton").prop('disabled', false);
    isPaused = true;
  };
  resetButton.onclick = () => {
    $("#pauseButton, #resetButton").prop('disabled', true);    
    $("#sessionPlus, #sessionMinus, #breakPlus, #breakMinus, #startButton").prop('disabled', false);  
    $("#seconds").html('00');
    $("#minutes").html(sessionLength);
    seconds = 60;
    minutes = sessionLength;
    isSession = isPaused = true;
  };

  setInterval(() => {  
    if (!isPaused) {
      $("#minutes").html(minutes - 1);  
      updateSeconds();
      if (seconds <= 0) {
        updateMinutes();
        if (minutes <= 0) {
          switchSessionAndBreak();
        }
        setInterval();
      } 
    } 
  }, 1000); 
  
  function updateSeconds(){
    seconds--;
    if (seconds < 10) {
      $("#seconds").html("0" + seconds);
    } else {
      $("#seconds").html(seconds);
    } 
  }

  function updateMinutes(){
    minutes--;
    $("#minutes").html(minutes);
    seconds = 60;
  }

  function switchSessionAndBreak(){
    $("#beep")[0].play();          
    isSession = !isSession;       
    if (!isSession) {
      minutes = breakLength;
      $("#minutes").html(breakLength);
    } else {
      minutes = sessionLength;
      $("#minutes").html(sessionLength);
    }
  }  
})();