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
      question: "What is the capital of France?",
      answers: ["London", "Paris", "Berlin"],
      correctAnswer: 1
    },
    {
      question: "What is the capital of France?",
      answers: ["London", "Paris", "Berlin"],
      correctAnswer: 1
    },
    {
      question: "What is the capital of France?",
      answers: ["London", "Paris", "Berlin"],
      correctAnswer: 1
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const answer1El = document.getElementById("answer1");
  const answer2El = document.getElementById("answer2");
  const answer3El = document.getElementById("answer3");
  const scoreEl = document.getElementById("score");
  const tileEl = document.getElementById("tile");
  const questionTile = document.getElementById("question-tile");
  const replayButton = document.getElementById("replay-button");
  
  
  const loadQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    questionEl.innerHTML = currentQuestionData.question;
    answer1El.innerHTML = currentQuestionData.answers[0];
    answer2El.innerHTML = currentQuestionData.answers[1];
    answer3El.innerHTML = currentQuestionData.answers[2];
    tileEl.style.top = "-100px";
    tileEl.style.display = "block";
    animate();
  };
  
  const animate = () => {
    tileEl.classList.remove("animate-up");
    void tileEl.offsetWidth; // trigger reflow to restart animation
    tileEl.classList.add("animate-up");
  };
  
  const checkAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      score++;
      scoreEl.innerHTML = `Score: ${score}`;
      document.querySelector(`#answer${answer + 1}`).classList.add("correct");
    } else {
      document.querySelector(`#answer${answer + 1}`).classList.add("incorrect");
    }
    setTimeout(() => {
      document.querySelector(`#answer${answer + 1}`).classList.remove("correct");
      document.querySelector(`#answer${answer + 1}`).classList.remove("incorrect");
      currentQuestion++;
      if (currentQuestion >= questions.length) {
        currentQuestion = 0;
      }
      loadQuestion();
    }, 1000);
  };
  
  answer1El.addEventListener("click", () => {
    checkAnswer(0);
    answer1El.classList.add("question-tile");
  });
  answer2El.addEventListener("click", () => {
    checkAnswer(1);
    answer2El.classList.add("question-tile");
  });
  answer3El.addEventListener("click", () => {
    checkAnswer(2);
    answer3El.classList.add("container.question-tile");
  });
  
  
  loadQuestion();
  