//define variables
var timer= document.querySelector(".timer");
var  intro= document.querySelector (".intro");
// var startButton= document.querySelector (".startButton");

var rightCounter= 0;
var wrongCounter = 0;

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
}

]

//function for timer


//function for highscore
//prob do a one 100 point for right, -100 for wrong,


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

displayQuestion(questions[0]);
//game function will have timer 



//then invoke highscore