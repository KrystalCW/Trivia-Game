var winsCounter = 0;
var lossesCounter = 0;
var images = ["assets/images/win-screen.gif", "assets/images/loss-screen.gif", 
"assets/images/time-out-screen.gif", "assets/images/gameOver-win-screen.gif", "assets/images/gameOver-loss-screen.gif"];
var count = 0;
var timer = 0;
var intervalId;
var timerRunning = false;
var userSelection = null;

var triviaQuestions = [
    {question: "When is Harry Potter's birthday?",
    answers: {
        A: "July 31st",
        B: "July 12th",
        C: "August 18th",
        D: "April 23rd",
    },
    correctAnswer: "A",
    },
    {question: "Who is Harry Potter's best friend?",
    answers: {
        A: "Ron",
        B: "Hermione",
        C: "Neville",
        D: "That guy",
    },
    correctAnswer: "A",
    },
    {question: "What is Harry Potter's favorite sport?",
    answers: {
        A: "baseball",
        B: "Wizard Chess",
        C: "Quidditch",
        D: "Being in his room, making no noise, pretending he doesn't care.",
    },
    correctAnswer: "C",
    },
    {question: "What is the name of Dumbledore's phoenix?",
    answers: {
        A: "Hedwig",
        B: "Pigwidgeon",
        C: "Crookshanks",
        D: "Fawkes",
    },
    correctAnswer: "D",
    },
    {question: "What is Hermione's patronus?",
    answers: {
        A: "a beaver",
        B: "Jack Russell terrier",
        C: "a stag",
        D: "an otter",
    },
    correctAnswer: "D",
    },
    {question: "What is the name of Ron's second eldest brother?",
    answers: {
        A: "Charlie",
        B: "Bill",
        C: "Percy",
        D: "Fred. Or is it George?",
    },
    correctAnswer: "B",
    },
    {question: "What is the organization Hermione forms in Goblet of Fire after feeling sorry for house elves?",
    answers: {
        A: "S.P.E.W. : the Society for the Promotion of Elvish Welfare",
        B: "W.E.L.P. : the Welfare of Elves Lacks Protection",
        C: "M.E.E.P. : Muggles Empowering Elves for Promotion (beyond basic household duties)",
        D: "P.E.W.S. : the Promotion of Elvish Welfare in Society",
    },
    correctAnswer: "A",
    },
];

function startGame() {
    location.href = "index.html";
}

function display() {
    document.getElementById("wins-counter").textContent = winsCounter;
    document.getElementById("losses-counter").textContent = lossesCounter;
    nextQuestion();
}

function countDown() {
    if (timerRunning) {
        document.getElementById("timer").textContent = timer;
        timer--;
        if (timer < 0 || userSelection !== null) {
            count++;
            lossesCounter++;
            clearInterval(intervalId);
            timeOut();
            timerRunning=false;
        }
    }    
}

function checkCount() {
    timer = 15;
    timerRunning = true;
    intervalId = setInterval(countDown, 1000);
}
    
$('input[type=radio]').click(function(){
    var userSelection = this.value;
    if (userSelection === triviaQuestions[count].correctAnswer) {
        count++;
        winsCounter++;
        winImage();
    } else if (userSelection !== triviaQuestions[count].correctAnswer) {
        count++;
        lossesCounter++;
        lossImage();
    }
});

function winImage() {
    document.getElementById("trivia-pic").src=images[0];
    $("#trivia-pic").append("<div>Correct!</div>");
    if (count <= 6) {
        setTimeout(nextQuestion, 5000);
    } else {
        setTimeout(gameOver, 5000);
    }
    userSelection = null;
    timerRunning = false;
    clearInterval(intervalId);
}

function lossImage() {
    document.getElementById("trivia-pic").src=images[1];
    if (count <= 6) {
        setTimeout(nextQuestion, 5000);
    } else {
        setTimeout(gameOver, 5000);
    }
    userSelection = null;
    timerRunning = false;
    clearInterval(intervalId);
}

function timeOut() {
    document.getElementById("trivia-pic").src=images[2];
    if (count <= 6) {
        setTimeout(nextQuestion, 5000);
    } else {
        setTimeout(gameOver, 5000);
    }
    userSelection = null;
    timerRunning = false;
    clearInterval(intervalId);
}


function nextQuestion() {
    document.getElementById("trivia-pic").src="";
    $("input:radio").prop('checked', false);
    $("input:radio").closest("label").removeClass("active");
    document.getElementById("wins-counter").textContent = winsCounter;
    document.getElementById("losses-counter").textContent = lossesCounter;
    document.getElementById("trivia-question").textContent = triviaQuestions[count].question;
    document.getElementById("answerA").textContent = triviaQuestions[count].answers.A;
    document.getElementById("answerB").textContent = triviaQuestions[count].answers.B;
    document.getElementById("answerC").textContent = triviaQuestions[count].answers.C;
    document.getElementById("answerD").textContent = triviaQuestions[count].answers.D;
    checkCount();
}

function gameOver() {
    document.getElementById("wins-counter").textContent = winsCounter;
    document.getElementById("losses-counter").textContent = lossesCounter;
    if (winsCounter > lossesCounter) {
        $("#questions").html(`<img src= ${images[3]} >`).append("<h1>You won!!</h1>");
    } else if (lossesCounter > winsCounter) {
        $("#questions").html(`"<img src=" ${images[4]} ">"`).append("<h1>You lost :( </h1>");
    }
}


display();