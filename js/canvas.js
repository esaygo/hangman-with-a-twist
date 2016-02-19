//using tutorial http://www.adobe.com/devnet/archive/html5/articles/hangman-part-2.html
function drawLine(ctx, from, to) {
  ctx.beginPath();
  ctx.moveTo(from[0], from[1]);
  ctx.lineTo(to[0], to[1]);
  ctx.stroke();
}

function drawCanvas() {

  var hangMan = document.getElementById("canvas");
  ctx = hangMan.getContext('2d');
  //reset canvas and set basic styles
  canvas.width = canvas.width;
  ctx.lineWidth = 10;
  ctx.strokeStyle = "green";
  ctx.font = "bold 24px Optimer, Arial, Helvetica, sans-serif";
  ctx.fillStyle = "red";
  //draw the ground
  drawLine(ctx, [20,190], [180,190]);
  //start drawing the gallows for each bad guess

  if(badGuesses > 0) {
    //create the upright
    ctx.strokeStyle = "#A52A2A";
    drawLine(ctx, [30,185], [30,10]);
    if(badGuesses > 1) {
      //create the arm of the gallows
      ctx.lineTo(150,10);
      ctx.stroke();
    }
  }
  if(badGuesses > 2) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    //draw rope
    drawLine(ctx, [145,15], [145,30]);
    //draw head
    ctx.beginPath();
    ctx.moveTo(160,45);
    ctx.arc(145,45,15,0, (Math.PI/180) * 360);
    ctx.stroke();
  }
  if(badGuesses > 3) {
    //draw body
    drawLine(ctx, [145,60], [145,130]);
  }
  if(badGuesses > 4) {
    //draw left arm
    drawLine(ctx, [145,80],[110,90]);
  }
  if(badGuesses > 5) {
    //draw right arm
    drawLine(ctx, [145,80], [180,90]);
  }
  if(badGuesses > 6) {
    //draw left leg
    drawLine(ctx, [145,130], [130,170]);
  }
  if(badGuesses > 7) {
    //draw right leg and end the game
    drawLine(ctx, [145,130], [160,170]);
    ctx.fillText('Game over', 45, 110);
    //disable the keypad
    $(".letters").unbind('click');
      //dislay the correct answer: replace dashes with red letters
    var randWord = localStorage.getItem("word");
    var wordPlaceholder = document.getElementById('word').innerHTML;
    wordPlaceholder = wordPlaceholder.split("");
    for(var j = 0; j < randWord.length; j++) {
        if(wordPlaceholder[j] === "_" ) {
          wordPlaceholder[j] = '<span style="color: red">' + randWord.charAt(j) + '</span>';
      }
    }
    document.getElementById('word').innerHTML = wordPlaceholder.join('');

    //clear word to be guessed from localStorage
    window.localStorage.removeItem("word");
    //clear canvas from previous game
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();
  }
}
