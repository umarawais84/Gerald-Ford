
// Quiz functionality
const questions = [
    {
        question: "In what year did Gerald Ford become President?",
        options: ["1972", "1973", "1974", "1975"],
        correct: "1974"
    },
    {
        question: "Which President did Gerald Ford succeed?",
        options: ["John F. Kennedy", "Lyndon B. Johnson", "Richard Nixon", "Jimmy Carter"],
        correct: "Richard Nixon"
    },
    {
        question: "What was Ford's position before becoming President?",
        options: ["Secretary of State", "Vice President", "Speaker of the House", "Senator"],
        correct: "Vice President"
    },
    {
        question: "Where was Gerald Ford born?",
        options: ["Detroit, Michigan", "Omaha, Nebraska", "Des Moines, Iowa", "Chicago, Illinois"],
        correct: "Omaha, Nebraska"
    },
    {
        question: "What university did Ford attend for his undergraduate degree?",
        options: ["Harvard University", "Yale University", "University of Michigan", "Stanford University"],
        correct: "University of Michigan"
    },
    {
        question: "What sport did Ford play in college?",
        options: ["Basketball", "Baseball", "Football", "Track and Field"],
        correct: "Football"
    },
    {
        question: "What was Ford's highest military rank during World War II?",
        options: ["Captain", "Major", "Lieutenant Commander", "Colonel"],
        correct: "Lieutenant Commander"
    }
];

let currentQuestion = 0;
let score = 0;

function displayQuestion() {
    if (!document.getElementById('question')) return;

    const questionData = questions[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    const optionsHtml = questionData.options.map(option =>
        `<div class="form-check">
            <input class="form-check-input" type="radio" name="quiz" value="${option}" id="${option}">
            <label class="form-check-label" for="${option}">${option}</label>
        </div>`
    ).join('');
    document.getElementById('options').innerHTML = optionsHtml;
    document.getElementById('feedback').style.display = 'none';
}

function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked');
    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    const feedback = document.getElementById('feedback');
    if (selected.value === questions[currentQuestion].correct) {
        score++;
        feedback.className = 'feedback alert alert-success';
        feedback.textContent = 'Correct!';
    } else {
        feedback.className = 'feedback alert alert-danger';
        feedback.textContent = `Incorrect. The correct answer was ${questions[currentQuestion].correct}`;
    }
    feedback.style.display = 'block';
    document.getElementById('score').textContent = score;

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            document.getElementById('questionContainer').innerHTML = `
                <div class="text-center p-4">
                    <h3 class="mb-4">Quiz Complete!</h3>
                    <div class="final-score mb-4 p-3 bg-light rounded">
                        <h2>${score} out of ${questions.length}</h2>
                        <p>${(score/questions.length*100).toFixed(0)}% Correct</p>
                    </div>
                    <p class="mb-4">${score === questions.length ? 'Perfect! You really know your Gerald Ford history!' : 
                       score >= questions.length/2 ? 'Good job! You know quite a bit about Gerald Ford.' : 
                       'Keep learning more about Gerald Ford\'s fascinating history!'}</p>
                    <button onclick="resetQuiz()" class="btn btn-primary btn-lg">Try Again</button>
                </div>
            `;
        }
    }, 2000);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    displayQuestion();
}

// Record page functionality
const quotes = [
    'I am a Ford, not a Lincoln.',
    'Truth is the glue that holds government together.',
    'Our constitution works. Our great republic is a government of laws, not of men.',
    'History and experience tells us that moral progress comes not in comfortable and complacent times, but out of trial and confusion.',
    'The political lesson of Watergate is this: Never again must America allow an arrogant, elite guard of political adolescents to bypass the regular party organization and dictate the terms of a national election.'
];

function displayRandomQuote() {
    const quoteElement = document.getElementById('quoteDisplay');
    if (!quoteElement) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = `"${quotes[randomIndex]}"`;
}

function expandBox(box) {
    if (!box.classList.contains('expanded')) {
        box.classList.add('expanded');
    }
}

function closeBox(event, btn) {
    event.stopPropagation();
    btn.parentElement.classList.remove('expanded');
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('quoteDisplay')) {
        displayRandomQuote();
    }
    if (document.getElementById('question')) {
        displayQuestion();
    }
});