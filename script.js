    document.addEventListener("DOMContentLoaded", () => {
      const kanjiData = [
        { kanji: "本", correct: "book", incorrect: "river" },
        { kanji: "川", correct: "river", incorrect: "mountain" },
        { kanji: "森", correct: "forest", incorrect: "book" },
        { kanji: "山", correct: "mountain", incorrect: "forest" },
        { kanji: "水", correct: "water", incorrect: "fire" },
        { kanji: "火", correct: "fire", incorrect: "tree" },
        { kanji: "木", correct: "tree", incorrect: "stone" },
        { kanji: "石", correct: "stone", incorrect: "sky" },
        { kanji: "空", correct: "sky", incorrect: "ground" },
        { kanji: "土", correct: "earth", incorrect: "wind" },
        { kanji: "風", correct: "wind", incorrect: "rain" },
        { kanji: "雨", correct: "rain", incorrect: "sun" },
        { kanji: "日", correct: "sun", incorrect: "moon" },
        { kanji: "月", correct: "moon", incorrect: "sun" },
        { kanji: "人", correct: "person", incorrect: "animal" },
        { kanji: "犬", correct: "dog", incorrect: "cat" },
        { kanji: "猫", correct: "cat", incorrect: "dog" },
        { kanji: "魚", correct: "fish", incorrect: "bird" },
        { kanji: "鳥", correct: "bird", incorrect: "fish" },
        { kanji: "車", correct: "car", incorrect: "train" },
      ];

      const MAX_QUESTIONS = 5;
      let questionCount = 0;
      let score = 0;
      let questionInProgress = false;

      const scoreEl = document.getElementById("score");
      const kanjiEl = document.getElementById("kanji");
      const option1 = document.getElementById("option1");
      const option2 = document.getElementById("option2");
      const fallingKanji = document.getElementById("falling-kanji");
      const progressText = document.getElementById("progress-text");
      const progressFill = document.getElementById("progress-fill");
      const gameOverScreen = document.getElementById("game-over");
      const finalScoreEl = document.getElementById("final-score");
      const restartBtn = document.getElementById("restart-btn");

      //Optional sounds (uncomment and add your wav files in a 'sounds' folder)
      const correctSound = new Audio("sounds/correct.wav");
      const wrongSound = new Audio("sounds/wrong.mp3");
      const fallSound = new Audio("sounds/fall.wav");
      correctSound.load();
      wrongSound.load();
      fallSound.load();

      const loadNewQuestion = () => {
        if (questionCount >= MAX_QUESTIONS) {
          showGameOver();
          return;
        }

        questionInProgress = true;
        questionCount++;

        progressText.textContent = `Question ${questionCount} of ${MAX_QUESTIONS}`;
        progressFill.style.width = `${(questionCount / MAX_QUESTIONS) * 100}%`;

        const q = kanjiData[Math.floor(Math.random() * kanjiData.length)];
        const isCorrectLeft = Math.random() < 0.5;

        kanjiEl.classList.remove("visible");
        kanjiEl.textContent = q.kanji;

        fallingKanji.style.animation = "none";
        void fallingKanji.offsetWidth;

        setTimeout(() => {
          kanjiEl.classList.add("visible");
          fallingKanji.style.animation = "fall 5s linear forwards";
          fallSound.play();
        }, 50);

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

      const answer = (isCorrect) => {
        if (!questionInProgress) return;
        questionInProgress = false;

        option1.disabled = true;
        option2.disabled = true;

        if (isCorrect) {
          correctSound.play();
          score++;
          document.body.style.backgroundColor = "#d0f8ce";
        } else {
          wrongSound.play();
          score--;
          document.body.style.backgroundColor = "#ffcdd2";
        }

        scoreEl.textContent = score;
// Force repaint (optional, for stubborn cases)
scoreEl.style.display = 'none';
scoreEl.offsetHeight; // trigger reflow
scoreEl.style.display = 'inline';

        setTimeout(() => {
          document.body.style.backgroundColor = "#f0f0f0";
          kanjiEl.classList.remove("visible");
          setTimeout(() => loadNewQuestion(), 300);
        }, 300);
      };

      fallingKanji.addEventListener("animationend", () => {
        if (!questionInProgress) return;
        questionInProgress = false;

        score--;
        scoreEl.textContent = score;

        option1.disabled = true;
        option2.disabled = true;

        kanjiEl.classList.remove("visible");
        setTimeout(() => loadNewQuestion(), 500);
      });

      const showGameOver = () => {
        gameOverScreen.style.display = "block";
        finalScoreEl.textContent = `Your score: ${score} / ${MAX_QUESTIONS}`;

        fallingKanji.style.display = "none";
        option1.style.display = "none";
        option2.style.display = "none";
        document.getElementById("progress-container").style.display = "none";
        progressText.style.display = "none";
      };

      restartBtn.onclick = () => {
        console.log("Restart button clicked");

        score = 0;
        questionCount = 0;
        questionInProgress = false;
        scoreEl.textContent = score;
        progressText.textContent = `Question 0 of ${MAX_QUESTIONS}`;
        progressFill.style.width = "0%";

        gameOverScreen.style.display = "none";
        fallingKanji.style.display = "block";
        option1.style.display = "inline-block";
        option2.style.display = "inline-block";
        document.getElementById("progress-container").style.display = "block";
        progressText.style.display = "block";

        loadNewQuestion();
      };

      loadNewQuestion();
    });