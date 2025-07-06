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

  const q = kanjiData[Math.floor(Math.random() * kanjiData.length)];
  const isCorrectLeft = Math.random() < 0.5;

  // Hide the Kanji until animation starts
  kanjiEl.classList.add("hidden");
  kanjiEl.textContent = q.kanji;

  // Reset the animation
  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth; // Force reflow

  // Show the Kanji right before animation starts
  setTimeout(() => {
    kanjiEl.classList.remove("hidden");
    fallingKanji.style.animation = "fall 5s linear forwards";
  }, 100); // Slight delay ensures visibility syncs with animation

  // Set answer options
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

  option1.disabled = false;
  option2.disabled = false;
};


// Handle user answer
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

  // Cancel the animation and trigger the next question manually
  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth;
  setTimeout(() => loadNewQuestion(), 300); // Small pause before next question
};

// Automatically go to next question if the kanji hits the ground
fallingKanji.addEventListener("animationend", () => {
  if (!questionInProgress) return;
  questionInProgress = false;

  score--; // Penalize for no answer
  scoreEl.textContent = score;

  option1.disabled = true;
  option2.disabled = true;

  setTimeout(() => loadNewQuestion(), 500);
});

// Start first question
loadNewQuestion();
