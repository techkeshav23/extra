// Treasure Hunt Game Logic

const answers = {
    1: 'any', // Accept any name
    3: ['technovation : the networking club', 'technovation', 'technovation the networking club','Technovation',],
    4: ['JavaScript Object Notation', 'javaScript object notation', 'json'],
    5: ['academy of business and engineering sciences', 'abes']
};

const hints = {
    1: [
        "Just type your name!",
        "What do people call you?",
        "Enter your first name or full name!"
    ],
    3: [
        "Check our Instagram for the answer!",
        "Look for 'see insta' - it's our club name!",
        "It starts with 'Technovation'..."
    ],
    4: [
        "simple type 'json'"
    ],
    5: [
        "Academy of ____ and ____ Sciences"
    ]
};

let currentLevel = 0;
let hintCount = {};
let wrongClicks = 0;

// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// Initialize on load
window.onload = function() {
    createParticles();
    
    // Add enter key support for inputs
    document.querySelectorAll('.answer-input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const level = this.id.split('-')[1];
                checkAnswer(parseInt(level));
            }
        });
    });
};

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    currentLevel = 1;
    hintCount = {1: 0, 3: 0, 4: 0, 5: 0};
    wrongClicks = 0;
    showScreen('level-1');
    document.getElementById('answer-1').focus();
}

function checkAnswer(level) {
    const input = document.getElementById(`answer-${level}`);
    const hint = document.getElementById(`hint-${level}`);
    const userAnswer = input.value.trim().toLowerCase();
    
    if (!userAnswer) {
        hint.textContent = "Please enter an answer!";
        hint.className = 'hint-text';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
        return;
    }
    
    const correctAnswers = answers[level];
    
    // Level 1 accepts any name
    const isCorrect = correctAnswers === 'any' ? true : correctAnswers.includes(userAnswer);
    
    if (isCorrect) {
        // Correct answer!
        hint.textContent = "✓ Correct! Well done, brave adventurer!";
        hint.className = 'hint-text success';
        input.disabled = true;
        
        setTimeout(() => {
            nextLevel(level);
        }, 1500);
    } else {
        // Wrong answer - show hint
        hintCount[level] = (hintCount[level] || 0) + 1;
        const hintIndex = Math.min(hintCount[level] - 1, hints[level].length - 1);
        
        hint.textContent = "✗ Wrong! Hint: " + hints[level][hintIndex];
        hint.className = 'hint-text';
        
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 300);
        input.value = '';
        input.focus();
    }
}

function nextLevel(currentLvl) {
    if (currentLvl === 1) {
        showScreen('level-2');
    } else if (currentLvl === 3) {
        showScreen('level-4');
        document.getElementById('answer-4').focus();
    } else if (currentLvl === 4) {
        showScreen('level-5');
        document.getElementById('answer-5').focus();
    } else if (currentLvl === 5) {
        showVictory();
    }
}

// Level 2 functions
function wrongClick() {
    wrongClicks++;
    const hint = document.getElementById('hint-2');
    
    if (wrongClicks === 1) {
        hint.textContent = "Hint: That's a decoy! The real treasure is hiding... look for something invisible!";
    } else if (wrongClicks === 2) {
        hint.textContent = "Hint: Hover over the empty-looking spaces carefully...";
    } else if (wrongClicks >= 3) {
        hint.textContent = "Hint: There's an invisible cell that sparkles when you hover over it!";
    }
    
    hint.className = 'hint-text';
}

function foundHidden() {
    wrongClick();
}

function foundTreasure() {
    const hint = document.getElementById('hint-2');
    hint.textContent = "✓ You found the hidden treasure!";
    hint.className = 'hint-text success';
    
    setTimeout(() => {
        showScreen('level-3');
        document.getElementById('answer-3').focus();
    }, 1500);
}

function showVictory() {
    showScreen('victory-screen');
    createConfetti();
}

function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ff8c00'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}

function restartGame() {
    // Reset all inputs
    document.querySelectorAll('.answer-input').forEach(input => {
        input.value = '';
        input.disabled = false;
    });
    
    // Reset all hints
    document.querySelectorAll('.hint-text').forEach(hint => {
        hint.textContent = '';
        hint.className = 'hint-text';
    });
    
    // Reset level 2 hint
    document.getElementById('hint-2').textContent = "Hint: The real treasure is invisible to the untrained eye... hover carefully!";
    
    // Reset counters
    hintCount = {1: 0, 3: 0, 4: 0, 5: 0};
    wrongClicks = 0;
    
    showScreen('start-screen');
}
