const buttons = document.querySelectorAll(".btn");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("start");

let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

startBtn.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    level = 0;
    gameSequence = [];
    nextLevel();
  }
}

function nextLevel() {
  userSequence = [];
  level++;

  statusText.innerText = "Level " + level;

  const randomIndex = Math.floor(Math.random() * 4);
  gameSequence.push(randomIndex);

  flashButton(randomIndex);
}

function flashButton(index) {
  const btn = document.getElementById(index);

  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 500);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const clicked = Number(button.id);

    userSequence.push(clicked);

    flashButton(clicked);

    checkAnswer(userSequence.length - 1);
  });
});

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {

    if (userSequence.length === gameSequence.length) {
      setTimeout(nextLevel, 1000);
    }

  } else {
    statusText.innerText =
      "Game Over! Score: " + (level - 1);

    started = false;
  }
}