// Quiz Game Logic

const mcqAnswers = {
    2: 1, // Technovation : The Networking Club (option B)
    3: 1, // Dhurandhar (option B)
    4: 1, // JavaScript Object Notation (option B)
    5: 0  // Academy of Business and Engineering Sciences (option A)
};

let currentLevel = 0;
let score = 0;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    currentLevel = 1;
    score = 0;
    showScreen('level-1');
    document.getElementById('answer-1').focus();
}

// For Question 1 (Name input)
function checkAnswer(level) {
    const input = document.getElementById(`answer-${level}`);
    const feedback = document.getElementById(`hint-${level}`);
    const userAnswer = input.value.trim();
    
    if (!userAnswer) {
        feedback.textContent = "Please enter your name!";
        feedback.className = 'feedback-text error';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
        return;
    }
    
    // Accept any name
    feedback.textContent = "Welcome, " + userAnswer + "!";
    feedback.className = 'feedback-text success';
    input.disabled = true;
    score++;
    
    setTimeout(() => {
        nextLevel(level);
    }, 1000);
}

// For MCQ Questions
function checkMCQ(level, selectedOption) {
    const feedback = document.getElementById(`hint-${level}`);
    const buttons = document.querySelectorAll(`#level-${level} .option-btn`);
    const correctAnswer = mcqAnswers[level];
    
    // Disable all buttons
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    if (selectedOption === correctAnswer) {
        // Correct answer
        buttons[selectedOption].classList.add('correct');
        feedback.textContent = "✓ Correct!";
        feedback.className = 'feedback-text success';
        score++;
        
        setTimeout(() => {
            nextLevel(level);
        }, 1500);
    } else {
        // Wrong answer
        buttons[selectedOption].classList.add('wrong');
        buttons[correctAnswer].classList.add('correct');
        feedback.textContent = "✗ Wrong! The correct answer is highlighted.";
        feedback.className = 'feedback-text error';
        
        setTimeout(() => {
            nextLevel(level);
        }, 2500);
    }
}

function nextLevel(currentLvl) {
    if (currentLvl === 1) {
        showScreen('level-2');
    } else if (currentLvl === 2) {
        showScreen('level-3');
    } else if (currentLvl === 3) {
        showScreen('level-4');
    } else if (currentLvl === 4) {
        showScreen('level-5');
    } else if (currentLvl === 5) {
        showVictory();
    }
}

function showVictory() {
    document.getElementById('final-score').textContent = `${score}/5`;
    showScreen('victory-screen');
}

function restartGame() {
    // Reset all inputs
    const nameInput = document.getElementById('answer-1');
    nameInput.value = '';
    nameInput.disabled = false;
    
    // Reset all feedback
    document.querySelectorAll('.feedback-text').forEach(feedback => {
        feedback.textContent = '';
        feedback.className = 'feedback-text';
    });
    
    // Reset all MCQ buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong', 'disabled');
    });
    
    // Reset score
    score = 0;
    
    showScreen('start-screen');
}

// Add enter key support for name input
window.onload = function() {
    const nameInput = document.getElementById('answer-1');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer(1);
            }
        });
    }
};
