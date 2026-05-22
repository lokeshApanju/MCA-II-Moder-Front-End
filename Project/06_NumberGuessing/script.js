let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;
let score = 100;
let highScore = 0;

const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

checkBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

function checkGuess() {
  const userGuess = Number(guessInput.value);


  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = " Enter a number between 1 and 100";
    message.style.color = "red";
    return;
  }

  attemptsLeft--;
  score -= 10;

  attemptsText.textContent = attemptsLeft;
  scoreText.textContent = score;

  if (userGuess === randomNumber) {
    message.textContent = " Correct Guess! You Win!";
    message.style.color = "green";

    if (score > highScore) {
      highScore = score;
      highScoreText.textContent = highScore;
    }

    disableGame();

  } else if (userGuess > randomNumber) {
    message.textContent = " Too High!";
    message.style.color = "orange";

  } else {
    message.textContent = " Too Low!";
    message.style.color = "orange";
  }


  if (attemptsLeft === 0 && userGuess !== randomNumber) {
    message.textContent = ` Game Over! Number was ${randomNumber}`;
    message.style.color = "red";
    disableGame();
  }

  guessInput.value = "";
}

function disableGame() {
  guessInput.disabled = true;
  checkBtn.disabled = true;
}

function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  score = 100;

  attemptsText.textContent = attemptsLeft;
  scoreText.textContent = score;

  message.textContent = "Start guessing...";
  message.style.color = "black";

  guessInput.disabled = false;
  checkBtn.disabled = false;

  guessInput.value = "";
}