const questions = [
    {
        question: "Care este capitala Romaniei?",
        options: ["Constanta", "Madrid", "Bucuresti", "Barlad"],
        correctAnswer: "Bucuresti"
    },
    {
        question: "Care este orasul de resedinta al judetului Bacau?",
        options: ["Bacau", "Barlad", "Onesti", "Timisoara"],
        correctAnswer: "Bacau"
    },
    {
        question: "Care este tara cu cea mai mare suprafata de pe glob?",
        options: ["Austria", "China", "Rusia", "Romania"],
        correctAnswer: "Rusia"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.innerHTML = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";

    const options = questions[currentQuestionIndex].options;
    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.onclick = function() { checkAnswer(option); };
        optionsContainer.appendChild(button);
    });

   
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const scoreDisplay = document.getElementById("score");

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    scoreDisplay.innerHTML = "Score: " + score;
    showNextQuestion();
}

function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    
    questionContainer.innerHTML = "Game over";
    optionsContainer.classList.add("hidden");
}

startGame();
