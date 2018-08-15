(pomodoro => {
  let minutes = $("#minutes").html();
  let seconds = 60;
  let breakLength = $("#breakLength").html();
  let sessionLength = $("#sessionLength").html();
  let flag = true;
  let pauseStatus = true;
  $("#pauseButton, #resetButton").prop('disabled', true);

  // settings
  sessionMinus.onclick = () => {    
    if (sessionLength > 1) {
      document.getElementById("sessionLength").innerHTML--;
      sessionLength = $("#sessionLength").html();
      $("#minutes").html(sessionLength);
      minutes = sessionLength;
    }
  };
  sessionPlus.onclick = () => {  
    document.getElementById("sessionLength").innerHTML++;  
    sessionLength = $("#sessionLength").html();
    $("#minutes").html(sessionLength);
    minutes = sessionLength;
  };
  breakMinus.onclick = () => {  
    if (breakLength > 1) {
      document.getElementById("breakLength").innerHTML--;   
      breakLength = $("#breakLength").html();
    }
  };
  breakPlus.onclick = () => {
    document.getElementById("breakLength").innerHTML++;
    breakLength = $("#breakLength").html();
  };

  // menu
  startButton.onclick = () => {
    $("#pauseButton, #resetButton").prop('disabled', false);
    $("#sessionPlus, #sessionMinus, #breakPlus, #breakMinus, #startButton").prop('disabled', true);
    pauseStatus = false;      
  }; 
  pauseButton.onclick = () => {
    $("#pauseButton").prop('disabled', true);    
    $("#startButton").prop('disabled', false);
    pauseStatus = true;
  };
  resetButton.onclick = () => {
    $("#pauseButton, #resetButton").prop('disabled', true);    
    $("#sessionPlus, #sessionMinus, #breakPlus, #breakMinus, #startButton").prop('disabled', false);  
    $("#seconds").html('00');
    $("#minutes").html(sessionLength);
    seconds = 60;
    minutes = sessionLength;
    flag = true;
    pauseStatus = true;
  };

  // timer
  setInterval( () => {  
    if (!pauseStatus) {
      $("#minutes").html(minutes - 1);
      // change seconds      
      seconds--;
      if (seconds < 10) {
        $("#seconds").html("0" + seconds);
      } else {
        $("#seconds").html(seconds);
      } 
      // change minutes
      if (seconds <= 0) {
        minutes--;
        $("#minutes").html(minutes);
        seconds = 60;
        // switch session and break
        if (minutes <= 0) {
          $("#beep")[0].play();          
          flag = !flag;       
          if (!flag) {
            minutes = breakLength;
            $("#minutes").html(breakLength);
          } else {
            minutes = sessionLength;
            $("#minutes").html(sessionLength);
          }
        }
        setInterval();
      } 
    } 
  }, 1000); 
})();