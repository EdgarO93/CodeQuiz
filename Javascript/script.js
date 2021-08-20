
//define variables
var timerElement = document.querySelector(".timer");
var intro = document.querySelector(".intro");
var startBtnEL = document.querySelector("#start-btn");
var questionCount = 0;
var timerCount;
var timer;
var rightCounter = 0;
var score  = 0;
// using an array for questions
var questions = [
    {
        "text": "Test question, what is javascript?",
        "options": ["wrong", "wrong2", "right", 9],
        "solution": "right"
    },
    {
        "text": "Sample Question2",
        "options": ["wrong", "wrong2", "right2", 9],
        "solution": "right2"
    },

    {
        "text": "Sample Question3",
        "options": ["wrong", "wrong2", "right", 9],
        "solution": "right"
    },
    {
        "text": "Sample Question4",
        "options": ["wrong", "wrong2", "right", 9],
        "solution": "right"
    },

    {
        "text": "Sample Question5",
        "options": ["wrong", "wrong2", "right", 9],
        "solution": "right"
    }
]



function endGame() {
    // if (timerCount <=0){
    //     timerCount= 0;
      
    // }
}


//function for timer, 
//need to subtract time for a wrong question, minus 10? 
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if ( timerCount >= 0) {
            // Tests if win condition is met, above took out right counter is 5
            if (timerCount > 0) {
                // Clears interval and stops timer
                //   clearInterval(timer);
                //   winGame();
            }
        }
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears interval
            timerCount = 0;
            clearInterval(timer);
            // need to call end game function
            endGame();
        }
    }, 1000);
}


// //function for highscore
// function Logscore(){
//     score= rightCounter*100;
// } not this needed


//generate button , then run game function
function displayQuestion(questions) {
    var $text = $('<h2>').text(questions["text"]);
    $(".questionSec").append($text);
   

    var opts = questions["options"];
    for (let i = 0; i < opts.length; i++) {
        var $option = $('<button>').attr({ value: opts[i], class: 'questions-option', });
        $option.text(opts[i])
        $(".questionSec").append($option);

    }


}

$(document).on("click", ".questions-option", function () {

    //IF clicked correct , alert user then move to next question [i+]
    if (this.value === questions[questionCount].solution) {
        // console.log(this.value)
        alert('right answer')
        rightCounter= rightCounter + 1;
        score = rightCounter* 100;
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        questionCount++
        displayQuestion(questions[questionCount])
        console.log(rightCounter)
    } else {
        console.log(this.value)
        alert('wrong answer, minus 10 seconds')
        timerCount = timerCount - 10;
        console.log(timerCount)
    }
    //else if clicked incorrect, alert user and subtract 10 seconds and move to next question



});


//potentially could add a class for the right answer? then adding it up there
// displayQuestion(questions[0]);


//then invoke highscore

//button for start , intro text and start button will disappear need to find way to cycle questions.
$(startBtnEL).on("click", function () {
    displayQuestion(questions[questionCount])
    $("#start-btn").hide();
    $(".intro").hide();
    timerCount = 100;
    startTimer()
});



//   displayQuestion(questions);
