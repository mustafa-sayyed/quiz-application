import { questions } from "./ETI_MCQs.js";

const question = document.querySelector("#question");
const optionsElements = document.querySelector(".options");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const question_no = document.querySelector("#que_no");
const scoreEle = document.getElementById("score");
const startBtn = document.getElementById("begin");

startBtn.addEventListener("click", () => {
  localStorage.setItem("q_no", 1);
  currentIndex = 1;
  score = 0;
  updateScore();
  displayQuestion();
});

let hasAnswerd = false;
let currentIndex = 1;
let score = Number(localStorage.getItem("score")) || 0;
updateScore();
const q_no = Number(localStorage.getItem("q_no"));

if (!q_no) {
  saveData();
} else {
  currentIndex = q_no;
}

if (currentIndex === 1) {
  previous.setAttribute("disabled", true);
}

function displayQuestion() {
  const currentQuestion = questions[currentIndex - 1];
  question.textContent = currentQuestion.question;
  optionsElements.innerHTML = "";
  question_no.textContent = `Q.${currentQuestion.question_number}:   `;
  for (const option in currentQuestion.options) {
    if (currentQuestion.options[option]) {
      let optionEle = document.createElement("button");
      optionEle.value = option;
      optionEle.textContent = `${option}: ${currentQuestion.options[option]}`;
      optionsElements.appendChild(optionEle);
    }
  }
  saveData();
}
displayQuestion();

function saveData() {
  localStorage.setItem("q_no", currentIndex);
}

next.addEventListener("click", () => {
  hasAnswerd = false;
  if (currentIndex < questions.length) {
    currentIndex++;
    displayQuestion();
  }
  if (currentIndex != 1) {
    previous.removeAttribute("disabled");
  }
});

previous.addEventListener("click", () => {
  if (currentIndex === 1) {
    return previous.setAttribute("disabled", true);
  } else if (currentIndex == 2) {
    currentIndex--;
    displayQuestion();
    previous.setAttribute("disabled", true);
  } else {
    previous.removeAttribute("disabled");
    currentIndex--;
    displayQuestion();
  }
});

optionsElements.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const userAnswer = e.target.value;
    const correctAnswer = questions[currentIndex - 1].answer;
    if (correctAnswer === userAnswer) {
      if (hasAnswerd) {
        return;
      } else {
        e.target.classList.add("correct");
        score++;
        updateScore();
        hasAnswerd = true;
      }
    } else {
      e.target.classList.add("wrong");
    }
  }
});

function updateScore() {
  scoreEle.textContent = `Score: ${score}`;
  localStorage.setItem("score", score);
}
