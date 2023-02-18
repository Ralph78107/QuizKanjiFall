const questions = [
  {
    question: "What is 2 + 2?",
    answers: [2, 4, 6],
    correctAnswer: 1
  },
  {
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin"],
    correctAnswer: 1
  },
  {
    question: "What is the capital of Germany?",
    answers: ["London", "Paris", "Berlin"],
    correctAnswer: 2    
  },
];

let currentQuestion = 0;
let score = 0;
let timerId;

const questionEl = document.getElementById("question");
const answer1El = document.getElementById("answer1");
const answer2El = document.getElementById("answer2");
const answer3El = document.getElementById("answer3");
const scoreEl = document.getElementById("score");
const tileEl = document.getElementById("tile");
const questionTile = document.getElementById("question-tile");

const loadQuestion = () => {
  const currentQuestionData = questions[currentQuestion];
  questionEl.innerHTML = currentQuestionData.question;
  answer1El.innerHTML = currentQuestionData.answers[0];
  answer2El.innerHTML = currentQuestionData.answers[1];
  answer3El.innerHTML = currentQuestionData.answers[2];
  startTimer();
};

const checkAnswer = (answer) => {
  clearTimeout(timerId);
  const correctAnswer = questions[currentQuestion].correctAnswer;
  if (answer === correctAnswer) {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
    document.querySelector(`#answer${answer + 1}`).classList.add("correct");
  } else {
    score--;
    scoreEl.innerHTML = `Score: ${score}`;
    document.querySelector(`#answer${answer + 1}`).classList.add("incorrect");
  }

  document.querySelector("#question-tile").classList.add("hidden");
  
  setTimeout(() => {
    document.querySelector(`#answer${answer + 1}`).classList.remove("correct");
    document.querySelector(`#answer${answer + 1}`).classList.remove("incorrect");
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      currentQuestion = 0;
    }
    document.querySelector("#question-tile").classList.remove("hidden");
    loadQuestion();
  }, 500);
};

const startTimer = () => {
  let timeLeft = 10;
  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      score--;
      scoreEl.innerHTML = `Score: ${score}`;
      document.querySelector("#question-tile").classList.add("hidden");
      setTimeout(() => {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
          currentQuestion = 0;
        }
        document.querySelector("#question-tile").classList.remove("hidden");
        loadQuestion();
      }, 1000);
    } else {
      tileEl.innerHTML = `Time left: ${timeLeft} seconds`;
      timeLeft--;
    }
  }, 500);
};

answer1El.addEventListener("click", () => {
  checkAnswer(0);
});
answer2El.addEventListener("click", () => {
  checkAnswer(1);
});
answer3El.addEventListener("click", () => {
  checkAnswer(2);
});


loadQuestion();
