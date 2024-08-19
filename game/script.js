// Use the following to include this JavaScript file 
// <script src="script1.js"></script>
function showNextQuestion(questionNumber) {
    // Hide all questions
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('visible');
        question.style.display = 'none';
    });

    // Show the next question
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
        nextQuestion.classList.add('visible');
    }
}

function showFinalStep() {
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.classList.remove('visible');
        question.style.display = 'none';
    });

    // Display all the previous answers
    const formData = new FormData(document.getElementById('answerForm'));
    const allAnswersDiv = document.getElementById('allAnswers');
    allAnswersDiv.innerHTML = '';

    formData.forEach((value, key) => {
        if (key !== 'name' && key !== 'uniqueness') { // Exclude the final step questions
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.textContent = `${key}: ${value}`;
            allAnswersDiv.appendChild(answerDiv);
        }
    });

    const finalStep = document.getElementById('finalStep');
    finalStep.style.display = 'block';
    finalStep.classList.add('visible');
}

document.getElementById("answerForm").addEventListener("submit", function(event){
    event.preventDefault();

    const finalAnswersDiv = document.getElementById('finalAnswers');
    finalAnswersDiv.innerHTML = '';

    const formData = new FormData(this);
    let answers = {};

    formData.forEach((value, key) => {
        answers[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbyMWcGnegT3XiYPUEC1iFY26Xdf_4LH6oIYmdzrxhzW8sCpnEg9yghYow7qucYHOl0/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
    .then(() => {
        formData.forEach((value, key) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('final-answer');
            answerDiv.textContent = `${key}: ${value}`;
            finalAnswersDiv.appendChild(answerDiv);
        });

        document.getElementById('answersDisplay').style.display = 'block';
        this.style.display = 'none';
    })
    .catch((error) => {
        console.error("Error submitting answers: ", error);
    });
});
