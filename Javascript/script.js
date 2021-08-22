
//variables
var timerElement = document.querySelector("#time");
var intro = document.querySelector(".intro");
var startBtnEL = document.querySelector("#start-btn");
var QscoreEL = document.querySelector(".scoreResults");
var viewScoresEL = document.querySelector(".highscoreSection");
var backBtn = document.querySelector("#goBack");
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
//using array to store names and scores
var highScores = [];
// using an array for questions
var questions = [
    {
        "text": "How do you insert COMMENTS in Javascript code?",
        "options": ["/* This is a comment", "# This is a comment", "// This is a comment", "$$ This is a comment"],
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

//function that shows when you get them all right, showing you highscore and hiding quiz
function winGame() {
    $(QscoreEL).show();
    userScoreEl.textContent = score;
    //this will make quiz hide
    $(".questionSec").children().hide();
    $(".questions-option").hide();

}

//function that occurs when time has run out
function noTime() {
    alert("time ran out!")
    //this will make quiz hide
    $(".questionSec").children().hide();
    $(".questions-option").hide();
    //still going to show score
    $(QscoreEL).show();
    userScoreEl.textContent = score;

}
//checks the conditions needed for the quiz to stop ,6 questions right or getting to question 6
function checkQuiz() {
    if (rightCounter === 6 || questionCount >= 5) {
        //variable to keep track when to turn the quiz off
        isOver = true;
        //does number right *100 plus the time left
        score = score + timerCount;
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        //this will make quiz not run again with display question function
        questionCount = 0;
    }
}

//function for timer, 
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if is over condition is met
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
            // need to call no time function
            noTime();
        }
    }, 1000);
}

// //function for showing the highscore list
function showHS() {
    // clears out section
    scoreList.innerHTML = "";
    //shows the highschore section
    $(viewScoresEL).show();
    // retrieves from local storage the score and turns it from string to object
    highScores = JSON.parse(localStorage.getItem("score"));
    // creates a list by adding a div from the local storage array
    for (let i = 0; i < highScores.length; i++) {
        var scoreItem = document.createElement("div");
        // console.log(scoreItem) to check arrays
        // this will sort the highscores by highest score, otherwise it did it from oldest to recent
        highScores.sort((a, b) => parseFloat(b.userScore) - parseFloat(a.userScore));
        //writes in the div created a text of initials added - and the score accessed by the array with a number and adding a number before it with each loop
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].userID} - ${highScores[i].userScore}`;
        //adds this list to the cleared section
        scoreList.appendChild(scoreItem);
        //makes the title header and the back button appear
        $(headerHS).show();
        $(backBtn).show();
    }
}

//generates quiz,access the array to make the title a header and then appear in the  question section
function displayQuestion(questions) {
    var $text = $('<h2>').text(questions["text"]);
    $(".questionSec").append($text);

    // this loop creates a button for each option
    var opts = questions["options"];
    for (let i = 0; i < opts.length; i++) {
        var $option = $('<button>').attr({ value: opts[i], class: 'questions-option', });
        //this adds the text to the buttons
        $option.text(opts[i])
        //adds buttons to the section, completing the question and options
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
        //the next 2 below hide functions hide the previous question
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        //checks conditions for possible end game
        checkQuiz();
        //access the next question
        questionCount++
        //displays the next question
        displayQuestion(questions[questionCount])
        // console.log(rightCounter)
    } else {
        // console.log(this.value)
        //if clicked wrong, gives alert and decreases timer by 10
        alert('wrong answer, minus 10 seconds!')
        timerCount = timerCount - 10;
        // console.log(timerCount)
        //also hides the question and options
        $(".questionSec").children().hide();
        $(".questions-option").hide();
        //checks conditions for possible end game
        checkQuiz();
        //moves on to next question
        questionCount++
        //displas the next question
        displayQuestion(questions[questionCount])

    }

});

//resets the quiz components to allow for a replay
function resetQuiz() {
    score = 0;
    questionCount = 0;
    timerCount = 50;
    timerElement.textContent = timerCount;
    isOver = false;
}

//button for start , intro text and start button will disappear, starts timer and first question
$(startBtnEL).on("click", function () {
    isOver = false;
    displayQuestion(questions[questionCount])
    $(startBtnEL).hide();
    $(intro).hide();
    timerCount = 50;
    startTimer()
});

//the local storage array that will display high scores that is run on clicking submit
$(submitInitialsBtn).on("click", function () {
    //variable made up of the value of the initals
    var intialsIn = initialsEl.value;
    //checking if there is a value, 
    if (intialsIn) {
        //creates object to have the initials and the score
        var qScore = { userID: intialsIn, userScore: score };
        //clears the initial value
        initialsEl.value = '';
        // gets the score and adds it to the array
        highScores = JSON.parse(localStorage.getItem("score")) || [];
        highScores.push(qScore)
        // will save the score and make it a string
        localStorage.setItem("score", JSON.stringify(highScores));
        //highest the view score and form section
        $(initialsEl).hide();
        $(QscoreEL).hide();
        //shows the list of highscores
        showHS();
        //resets conditions for a new game
        resetQuiz();
    } // below it will show alert if nothing is added and not do anything
    else {
        alert("Please enter something!")
    }
});
//returns to intro page and will reload the page
$(backBtn).on("click", function () {
    $(viewScoresEL).hide();
    $(startBtnEL).show();
    $(intro).show();
    //added this to clear the page in case it was accessed while taking quiz
    location.reload();
});

//goes to highscore list, hides the intro and start page
$(viewHsEL).on("click", function () {
    $(intro).hide();
    $(startBtnEL).hide();
    //added back button so there is a back button in case view scores is clicked when section empty
    $(backBtn).show();
    //invokes the start quiz and also resets conditions after
    showHS();
    resetQuiz();
});