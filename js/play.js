// $(document).ready(function() {
//   all functions will be here?
// });

// What are the differences between JavaScript's window.onload and JQuery's $(document).ready() method?
// The ready event occurs after the HTML document has been loaded, while the onload event occurs later, when all content (e.g. images) also has been loaded.
//
// The onload event is a standard event in the DOM, while the ready event is specific to jQuery. The purpose of the ready event is that it should occur as early as possible after the document has loaded, so that code that adds functionality to the elements in the page doesn't have to wait for all content to load.

//generating the alphabet with jquery

var alphabet = 'abcdefghijklmnopqrstuvxyz';
var wordsArray = ['organic','philantropic','prejudice','kitten','codobatura','smurf','piticantrop'];
var tagsArray = ['random','random','abstract','nature','nature','fantasy','fantasy'];
var difficultyArray = ['easy','difficult','difficult','easy','easy','easy','difficult'];
randomImages = ['img/hang1.jpg', 'img/hang2.jpg','img/hang3.jpg', 'img/hang4.jpg','img/hang5.jpg', 'img/hang6.jpg','img/hang7.jpg'];
var newWord = [];
var badGuesses = 0;
var correctGuesses = 0;
var guessFlag = false;


function addAlphabet(alphabet) {
  var keypad = document.getElementById('keypad');

  for(var i = 0; i < alphabet.length; i++) {
    var letterContainer = document.createElement('kbd');
    keypad.appendChild(letterContainer);

    letterContainer.innerHTML += alphabet[i];

    $("kbd").addClass("light").addClass("letters");

    //add unique id for each letter http://stackoverflow.com/questions/28536878/add-div-id-dynamically-using-jquery-to-the-class-element
    // $('.letters:eq(' + alphabet[i] + ')').attr('id', alphabet[i]);
    $('.letters').attr('id', function(i) {
      return alphabet[i];
    });
  }

}

//add event listeners for clicking the letters

//when a letter is clicked, check if that letter is contained in the randWord
  //if it is contained, replace the udderscore with the letter
  //if not .....

//constructor function for the words objects
function Words(word,tag,difficulty) {
  this.word = word;
  this.tag = tag;
  this.difficulty = difficulty;
}

//initializing instances of the Words object
for(var i = 0; i < wordsArray.length; i++) {
  newWord[i] = new Words(wordsArray[i],tagsArray[i],difficultyArray[i]);
}


function generateNewWord() {
  //add 'play' button
  var $playButton = $('<input type = "button" value = "Play" />');
  $("#play").append($playButton).addClass("play-button");
//add event listener to button
//when clicked, add event handler to generate new word randomly
  $("#play").bind('click', function() {
      var randWord = newWord[Math.floor(Math.random() * wordsArray.length)].word;

      //save randWord to local storage
      localStorage.setItem("word", randWord);

      var wordPlaceholder = document.getElementById('word');
      var placeholder = "";
      for(var i = 0; i < randWord.length; i++) {
        placeholder += "_";
      }
      wordPlaceholder.innerHTML = placeholder;

      //clear canvas and last play

  });
}

  function play() {
    window.localStorage.removeItem("word");
    badGuesses = 0;

    // clear canvas from previous game
    var hangMan = document.getElementById("canvas");
    ctx = hangMan.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.beginPath();

    //selected letter
    $(".letters").bind('click',function() {
      var idLetter = $(this).attr('id');
      $(this).removeClass('light').addClass("dark");
      console.log(idLetter);
      //get randWord out of local storage

      if(localStorage.getItem("word")) {
      var randWord = localStorage.getItem("word");
      console.log("local storage word: " + randWord);
    }
      var value = $("#word").text();

        guessFlag = false;
    for(var j = 0; j < randWord.length; j++) {
        if(randWord[j] === idLetter ) {
        value = value.substr(0, j) + idLetter +value.substr(j+1, value.length);
            $("#word").text(value);
            guessFlag = true;
            correctGuesses ++;

            console.log($(this));
            console.log("bad guesses is: " + badGuesses);
      }

    }
      if(guessFlag === false) {
            badGuesses ++;
            $("#fun-img").attr("src", randomImages[Math.floor(Math.random() * randomImages.length)]);
            randomImages[Math.floor(Math.random() * randomImages.length)]
            //start drawing the man
            drawCanvas();

            console.log("else bad guesses is: " + badGuesses);
        }

      if(correctGuesses === randWord.length) {
        $("#canvas").css("background-image","url(img/winner.jpg)");
        //clear canvas
        canvas.width=canvas.width;
        function generatePlayAgain() {
          //add 'play-again' button
          var $playAgainButton = $('<input type = "button" value = "Play Again?" />');
          $("#play-again").append($playAgainButton).addClass("play--again-button");
        //add event listener to button
        //when clicked, add event handler to refresh page

          $("#play-again").bind('click', function() {
            //refresh page to clear canvas etc
            location.reload(true);
          });

        }
        generatePlayAgain();
      }
});

}

addAlphabet(alphabet);
generateNewWord();
play();
