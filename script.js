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

const loadNewQuestion = () => {
  const q = kanjiData[Math.floor(Math.random() * kanjiData.length)];

  // Randomize answer positions
  const isCorrectLeft = Math.random() < 0.5;

  kanjiEl.textContent = q.kanji;
  fallingKanji.style.animation = "none";
  void fallingKanji.offsetWidth; // Force reflow
  fallingKanji.style.animation = "fall 5s linear forwards";

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
};

const answer = (isCorrect) => {
  if (isCorrect) {
    score++;
  } else {
    score--;
  }
  scoreEl.textContent = score;
  loadNewQuestion();
};

loadNewQuestion();
