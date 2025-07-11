const kanjiData = [
  { kanji: "本", correct: "book", incorrect: "river" },
  { kanji: "川", correct: "river", incorrect: "mountain" },
  { kanji: "森", correct: "forest", incorrect: "book" },
  { kanji: "山", correct: "mountain", incorrect: "forest" },
];

let score = 0;
const scoreEl = document.getElementById("score");
const kanjiEl = document.getElementById("kanji");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const fallingKanji = document.getElementById("falling-kanji");

let questionInProgress = false;

// Sound effects
const correctSound = new Audio("sounds/correct.wav");
const wrongSound = new Audio("sounds/wrong.mp3");
const fallSound = new Audio("sounds/fall.wav");

const loadNewQuestion = () => {
  questionInProgress = true;

  // Pick a random Kanji question
  const q = kanjiData[Math.floor(Math.random() * kanjiData.length)];

  // Randomly assign correct/incorrect to left/right
  const isCorrectLeft = Math.random() < 0.5;

  // Hide Kanji and reset animation
  kanjiEl.classList.remove("visible");
  kanjiEl.textContent = q.kanji;

  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth;

  // Show Kanji again with fade-in and falling animation
  setTimeout(() => {
    kanjiEl.classList.add("visible");
    fallingKanji.style.animation = "fall 5s linear forwards";
    fallSound.play(); // play falling sound
  }, 50);

  // Assign text and handlers to buttons
  if (isCorrectLeft) {
    option1.textContent = q.correct;
    option2.textContent = q.incorrect;
    option1.onclick = () => answer(true);
    option2.onclick = () => answer(false);
  } else {
    option1.textContent = q.incorrect;
    option2.textContent = q.correct;
    option1.onclick = () => answer(false);
    option2.onclick = () => answer(true);
  }

  // Enable buttons
  option1.disabled = false;
  option2.disabled = false;
};

const answer = (isCorrect) => {
  if (!questionInProgress) return;
  questionInProgress = false;

  option1.disabled = true;
  option2.disabled = true;

  // Play correct or incorrect sound
  if (isCorrect) {
    correctSound.play();
    score++;
    document.body.style.backgroundColor = "#d0f8ce"; // light green
  } else {
    wrongSound.play();
    score--;
    document.body.style.backgroundColor = "#ffcdd2"; // light red
  }

  scoreEl.textContent = score;

  // Visual feedback and delay before next question
  setTimeout(() => {
    document.body.style.backgroundColor = "#f0f0f0"; // reset background
    kanjiEl.classList.remove("visible");
    setTimeout(() => loadNewQuestion(), 300);
  }, 300);
};

fallingKanji.addEventListener("animationend", () => {
  if (!questionInProgress) return;
  questionInProgress = false;

  // Timeout penalty
  score--;
  scoreEl.textContent = score;

  option1.disabled = true;
  option2.disabled = true;

  kanjiEl.classList.remove("visible");

  setTimeout(() => loadNewQuestion(), 500);
});

// Start first question
loadNewQuestion();
