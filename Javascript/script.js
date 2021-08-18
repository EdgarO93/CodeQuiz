//define variables
var timerElement= document.querySelector(".timer");
var  intro= document.querySelector (".intro");
var startBtnEL= document.querySelector ("#start-btn");

var timerCount;
var timer;
var rightCounter= 0;
var wrongCounter = 0;
// using an array for questions
var questions = [
{
    "text": "Sample Question",
    "options": ["wrong", "wrong2", "right", 9],
    "solution": "right"
},
{
    "text": "Sample Question2",
    "options": ["wrong", "wrong2", "right", 9],
    "solution": "right"
},

{
    "text": "Sample Question3",
    "options": ["wrong", "wrong2", "right", 9],
    "solution": "right"
}

]

//function for timer
//need to subtract time for a wrong question, minus 10? 
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (rightCounter = 5 || timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }
  

//function for highscore
//prob do a one 100 point for right


//generate button , then run game function
function displayQuestion(questions) {
    var $text =$('<h2>').text(questions["text"]);
    $(".questionSec").append($text);

    var opts = questions["options"];
    for (let i=0; i<opts.length; i++) {
        var $option = $('<button>').attr({value: opts[i],class:'questions-option'});
        $option.text(opts[i])
        $(".questionSec").append($option);
        
    }


}

$(document).on("click",".questions-option", function() {
        alert("test")
});
//potentially could add a class for the right answer? then adding it up there
// displayQuestion(questions[0]);
//game function will have timer 



//then invoke highscore

//button for start , intro text and start button will disappear need to find way to cycle questions.
$(startBtnEL).on("click", function(){
 displayQuestion(questions[0])
 $("#start-btn").hide();
 $(".intro").hide();
 timerCount= 10;
 startTimer()
});



//   displayQuestion(questions);
