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

const loadNewQuestion = () => {
  questionInProgress = true;

  // Pick a random Kanji question
  const q = kanjiData[Math.floor(Math.random() * kanjiData.length)];

  // Randomly assign correct/incorrect to left/right
  const isCorrectLeft = Math.random() < 0.5;

  // Hide Kanji and reset animation
  kanjiEl.classList.remove("visible"); // For fade-out
  kanjiEl.textContent = q.kanji;

  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth; // Force reflow to reset animation

  // Show Kanji again with fade-in and falling animation
  setTimeout(() => {
    kanjiEl.classList.add("visible"); // For fade-in
    fallingKanji.style.animation = "fall 5s linear forwards";
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

  if (isCorrect) {
    score++;
  } else {
    score--;
  }

  scoreEl.textContent = score;

  // Cancel current animation and load next
  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth;

  setTimeout(() => loadNewQuestion(), 300); // slight pause before next
};

fallingKanji.addEventListener("animationend", () => {
  if (!questionInProgress) return;
  questionInProgress = false;

  // Timeout penalty
  score--;
  scoreEl.textContent = score;

  option1.disabled = true;
  option2.disabled = true;

  setTimeout(() => loadNewQuestion(), 500);
});

// Start first question
loadNewQuestion();
