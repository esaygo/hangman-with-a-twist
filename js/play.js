// $(document).ready(function() {
//   all functions will be here?
// });

// What are the differences between JavaScript's window.onload and JQuery's $(document).ready() method?
// The ready event occurs after the HTML document has been loaded, while the onload event occurs later, when all content (e.g. images) also has been loaded.
//
// The onload event is a standard event in the DOM, while the ready event is specific to jQuery. The purpose of the ready event is that it should occur as early as possible after the document has loaded, so that code that adds functionality to the elements in the page doesn't have to wait for all content to load.

//generating the alphabet with jquery

var alphabet = 'abcdefghijklmnopqrstuvxyz';
var wordsArray = ['organic','philantropic','prejudice','kitten'];
var tagsArray = ['random','random','abstract','nature'];
var difficultyArray = ['easy','difficult','difficult','easy'];
var newWord = [];


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
      var wordPlaceholder = document.getElementById('word');
      var placeholder = "";
      for(var i = 0; i < randWord.length; i++) {
        placeholder += "_";
      }
      wordPlaceholder.innerHTML = placeholder;

      var $wordToGuess = $('<p></p>');
      $('#test').append($wordToGuess).attr('id', 'guess-word');
      $('#guess-word').text(randWord).hide();
      console.log($('#guess-word').text());

      //clear canvas and last play

  });
}

  function play() {

    //selected letter
    $(".letters").bind('click',function() {
      var idLetter = $(this).attr('id');
      console.log(idLetter);

    for(var j = 0; j < $('#guess-word').text().length; j++) {
      // console.log($('#guess-word').text()[j] == idLetter);
      if($('#guess-word').text()[j] === idLetter ) {

            var value = $("#word").text();
            console.log(typeof(value));
            value = value.substr(0, j) + idLetter +value.substr(j+1, value.length);
            $("#word").text(value);
            console.log(value);

          
        }
    }
  });

}

addAlphabet(alphabet);
generateNewWord();
play();
