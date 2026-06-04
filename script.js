// ======================
// CLASS 1 - User
// ======================
class User {
    constructor(name){
        this.name = name;
    }
}

// ======================
// CLASS 2 - Question
// ======================
class Question {
    constructor(question, choices, answer){
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

// ======================
// CLASS 3 - Score
// ======================
class Score {
    constructor(){
        this.total = 0;
    }

    addPoint(){
        this.total++;
    }
}

// ======================
// CLASS 4 - Timer
// ======================
class Timer {
    constructor(seconds){
        this.seconds = seconds;
    }
}

// ======================
// CLASS 5 - Quiz
// ======================
class Quiz {
    constructor(questions){
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion(){
        return this.questions[this.currentQuestionIndex];
    }

    nextQuestion(){
        this.currentQuestionIndex++;
    }

    isFinished(){
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// ======================
// INHERITANCE
// ======================
class Admin extends User{
    constructor(name){
        super(name);
    }
}

// Questions
const questions = [
    new Question(
        "What does HTML stand for?",
        ["HyperText Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Mark Language",
        "Hyper Tool Multi Language"],
        "HyperText Markup Language"
    ),

    new Question(
        "Which language is used for styling?",
        ["Java", "Python", "CSS", "PHP"],
        "CSS"
    ),

    new Question(
        "Which language adds functionality to websites?",
        ["HTML", "CSS", "JavaScript", "SQL"],
        "JavaScript"
    ),

    new Question(
        "What does CPU stand for?",
        ["Central Processing Unit",
        "Computer Processing Unit",
        "Control Program Unit",
        "Central Program Utility"],
        "Central Processing Unit"
    ),

    new Question(
        "Which company created JavaScript?",
        ["Google", "Microsoft", "Netscape", "Apple"],
        "Netscape"
    )
];

const quiz = new Quiz(questions);
const score = new Score();
let user;
let countdown;

// DOM Elements
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const timerElement = document.getElementById("timer");

// Start Quiz
startBtn.addEventListener("click", () => {

    const username =
        document.getElementById("username").value;

    if(username === ""){
        alert("Please enter your name.");
        return;
    }

    user = new User(username);

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    loadQuestion();
});

// Load Question
function loadQuestion(){

    const currentQuestion =
        quiz.getCurrentQuestion();

    questionElement.textContent =
        currentQuestion.question;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.textContent = choice;
        button.classList.add("choice-btn");

        button.addEventListener("click", () => {

            if(choice === currentQuestion.answer){
                score.addPoint();
                scoreElement.textContent =
                score.total;
            }

            clearInterval(countdown);

            disableButtons();
        });

        choicesElement.appendChild(button);
    });

    startTimer();
}

// Disable Buttons
function disableButtons(){

    const buttons =
        document.querySelectorAll(".choice-btn");

    buttons.forEach(button => {
        button.disabled = true;
    });
}

// Next Question
nextBtn.addEventListener("click", () => {

    quiz.nextQuestion();

    if(quiz.isFinished()){
        showResult();
    }
    else{
        loadQuestion();
    }
});

// Result
function showResult(){

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreElement.textContent =
    `${user.name}, your score is ${score.total}/${questions.length}`;
}

// Restart
restartBtn.addEventListener("click", () => {
    location.reload();
});

// Timer
function startTimer(){

    let time = 15;

    timerElement.textContent = time;

    clearInterval(countdown);

    countdown = setInterval(() => {

        time--;

        timerElement.textContent = time;

        if(time <= 0){

            clearInterval(countdown);

            disableButtons();
        }

    },1000);
}