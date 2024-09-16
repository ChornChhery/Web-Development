const questions = [
  {
    question: "Which of the following is Spider-Man's real name?",
    answers: [
      { text: "Tony Stack", correct: false },
      { text: "Peter Parker", correct: true },
      { text: "Thor of Thunder", correct: false },
      { text: "Bruce Banner", correct: false },
    ],
  },
  {
    question: "What is the best moive of Spiderman version Tom Holland",
    answers: [
      { text: "Homecoming", correct: false },
      { text: "Far From Home", correct: true },
      { text: "No Way Home", correct: false },
      { text: "Dotocr Strange 2", correct: false },
    ],
  },
  {
    question: "What's the title of the Spider-Man film released in 2017? ",
    answers: [
      { text: "The Awesome Spider-Man", correct: false },
      { text: "Spider-Man: Homecoming", correct: true },
      { text: "Spider-Man and the World Wide Web", correct: false },
      { text: "Spider-Man vs Green Goblin", correct: false },
    ],
  },
  {
    question: "The best villian of Spider-Man 2002. What's his name?",
    answers: [
      { text: "Electro", correct: false },
      { text: "Lizard", correct: false },
      { text: "Doctor Octopus", correct: true},
      { text: "Kraven the Hunter", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
