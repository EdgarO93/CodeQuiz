
//define variables
var timerElement = document.querySelector("#time");
var intro = document.querySelector(".intro");
var startBtnEL = document.querySelector("#start-btn");
var QscoreEL = document.querySelector(".scoreResults");
var viewScoresEL = document.querySelector(".highscoreSection");
var backBtn = document.querySelector("#goBack");
var addFinScore = document.querySelector(".finScore");
var initialsEl = document.querySelector("#initials");
var submitInitialsBtn = document.querySelector("#submitInitials");
var userScoreEl = document.querySelector("#score");
var scoreList = document.querySelector("#scoreslist");
var viewHsEL = document.querySelector(".linkHS");
var headerHS = document.querySelector(".headerHS");
var questionCount = 0;
var timerCount;
var timer;
var rightCounter = 0;
var score = 0;
var isOver = false;
var validat;
var highScores = [];
// using an array for questions
var questions = [
    {
        "text": "How do you insert COMMENTS in Javascript code?",
        "options": ["/* This is a comment", "# This is a coment", "// This is a comment", "$$ This is a comment"],
        "solution": "// This is a comment"
    },
    {
        "text": "Inside which HTML element do we put the JavaScript?",
        "options": ["<js>", "<script>", "<css>", "<java>"],
        "solution": "<script>"
    },

    {
        "text": "What is meant by 'this' keyword in Javascript?",
        "options": ["The current object", "The previous object", "A variable with value", "None of the above"],
        "solution": "The current object"
    },
    {
        "text": "The 'function' and 'var' are known as:",
        "options": ["keywords", "data types", "protypes", "declaration statements"],
        "solution": "declaration statements"
    },

    {
        "text": "A set of unordered properties that, has a name and value is called:",
        "options": ["string", "array", "function", "object"],
        "solution": "object"
    },
    {
        "text": "Which of the following are not Javascript data types?",
        "options": ["boolean", 'undefined', 'number', "float"],
        "solution": "float"
    }
]

//function that shows when you get them all right
function winGame() {
    $(QscoreEL).show();
    userScoreEl.textContent = score;

}


//function that occurs when time has run out
function endGame() {
    alert("time ran out!")
    $(".questionSec").children().hide();
    $(".questions-option").hide();
    $(QscoreEL).show();
    userScoreEl.textContent = score;
    // resetQuiz();
    // // location.reload()
    // showHS();


}
//checks the conditions needed for the quiz to stop ,5 questions right
function checkQuiz() {
    if (rightCounter === 6 || questionCount >= 5) {
        isOver = true;
        score = score + timerCount;
        $(".questionSec").children().hide();
        $(".questions-option").hide();
    }
}


//function for timer, 
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met, above took out right counter is 5
            if (isOver && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
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


// //function for showing the highscore
function showHS() {
    // clears out section
    scoreList.innerHTML = "";
    $(viewScoresEL).show();
    highScores = JSON.parse(localStorage.getItem("score"));
    for (let i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement("div");
        console.log(scoreItem)
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].userID} - ${highScores[i].userScore}`;
        scoreList.appendChild(scoreItem);
        $(headerHS).show();
        $(backBtn).show();
    }
}



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
//this is what makes the quiz run
$(document).on("click", ".questions-option", function () {

    //IF clicked correct , alert user then move to next question [i+]
    if (this.value === questions[questionCount].solution) {
        // console.log(this.value)
        alert('right answer!')
        rightCounter = rightCounter + 1;
        score = rightCounter * 100;
        // console.log(score)
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        checkQuiz();
        questionCount++
        displayQuestion(questions[questionCount])
        // console.log(rightCounter)
    } else {
        // console.log(this.value)
        alert('wrong answer, minus 10 seconds!')
        timerCount = timerCount - 10;
        // console.log(timerCount)
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        checkQuiz();
        questionCount++
        displayQuestion(questions[questionCount])

    }
    //else if clicked incorrect, alert user and subtract 10 seconds and move to next question



});

//resets the quiz components to allow for a replay
function resetQuiz() {
    score = 0;
    questionCount = 0;
    timerCount = 50;
    timerElement.textContent = timerCount;
    isOver = false;
}



//button for start , intro text and start button will disappear
$(startBtnEL).on("click", function () {
    isOver = false;
    displayQuestion(questions[questionCount])
    $("#start-btn").hide();
    $(".intro").hide();
    timerCount = 50;
    startTimer()
});

//the local storage array that will display high scores
$(submitInitialsBtn).on("click", function () {
    var intialsIn = initialsEl.value;
    if (intialsIn) {
        var qScore = { userID: intialsIn, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("score")) || [];
        highScores.push(qScore)
        localStorage.setItem("score", JSON.stringify(highScores));
        $(initialsEl).hide();
        $(QscoreEL).hide();
        showHS();
        resetQuiz();
    }
});
//returns to intro page
$(backBtn).on("click", function () {
    $(viewScoresEL).hide();
    $("#start-btn").show();
    $(".intro").show();
    location.reload();
});

//goes to highscore list
$(viewHsEL).on("click", function () {
    $(".intro").hide();
    $("#start-btn").hide();
    showHS();
    resetQuiz();

});