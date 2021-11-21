const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


//create questions
let questions = [
      {
            question: "Wich is the selector in this CSS" + "<br /> " + "p{color:red}",
            imgSrc: "./img/css.png",
            choiceA: "p",
            choiceB: "color",
            choiceC: "red",
            correct: "A"
      },
      {
            question: "Which of the following is the correct way to add an attribute?",
            imgSrc: "./img/html.png",
            choiceA: "scr",
            choiceB: "class:ids",
            choiceC: 'id="title"',
            correct: "C"
      },
      {
            question: "What surrounds an if/else statement?",
            imgSrc: "./img/js.png",
            choiceA: "Quotations",
            choiceB: "Square Brackets",
            choiceC: "Curly Brackets",
            correct: "C"
      }
]

//create variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;


//render a question
function renderQuestion() {
      let q = questions[runningQuestion];

      question.innerHTML = "<p>" + q.question + "</p>";
      qImg.innerHTML = "<img src=" + q.imgSrc + ">";
      choiceA.innerHTML = "<p>" + q.choiceA + "</p>";
      choiceB.innerHTML = "<p>" + q.choiceB + "</p>";
      choiceC.innerHTML = "<p>" + q.choiceC + "</p>";

}

start.addEventListener("click", startQuiz);

//start quiz
function startQuiz() {
      start.style.display = "none";
      renderQuestion();
      quiz.style.display = "block";
      renderProgress();
      renderCounter();
      TIMER = setInterval(renderCounter, 1000); //1000ms = 1s
}


//render progress

function renderProgress() {
      for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
            progress.innerHTML += "<div class='prog' id=" + qIndex + "></div";
      }
}


//counter render

function renderCounter() {
      if (count <= questionTime) {
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count++
      } else {
            count = 0;
            answerIsWrong();
            if (runningQuestion < lastQuestion) {
                  runningQuestion++;
                  renderQuestion();
            } else {
                  //end the quiz and show the score
                  clearInterval(TIMER);
                  scoreRender();
            }
      }
}

//checkAnswer

function checkAnswer(answer) {
      if (answer == questions[runningQuestion].correct) {
            //answer is correct
            score++;
            //change color to green
            answerIsCorrect();
      } else {
            // answer is wrong
            //change color to red
            answerIsWrong();
      }
      count = 0;
      if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
      } else {
            //end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
      }

}

function answerIsCorrect() {
      document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
      document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


// score render
function scoreRender() {
      scoreDiv.style.display = 'block';

      //calculate the amount of qeustion percent answered by the user
      const scorePercent = Math.round(100 * score / questions.length);

      //choose the image based on the scorePercent
      let img =
            (scorePercent >= 80) ? "img/5.png" :
                  (scorePercent >= 60) ? "img/4.png" :
                        (scorePercent >= 40) ? "img/3.png" :
                              (scorePercent >= 20) ? "img/2.png" :
                                    "img/1.png";
      scoreDiv.innerHTML = "<img src=" + img + ">"
      scoreDiv.innerHTML += "<p>" + scorePercent + "%</p>"
}
