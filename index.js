const words = ["javascript", "python", "html", "css", "react"];
let selectedWord;
let guessedLetters = [];
let attemptsLeft = 6;

const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = 6;
    updateWordDisplay();
    message.textContent = `You have ${attemptsLeft} attempts left.`;
    restartButton.style.display = "none";
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord.split("").map(letter => {
        return guessedLetters.includes(letter) ? letter : "_";
    }).join(" ");
}

function handleGuess() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";

    if (guessedLetters.includes(letter) || letter.length === 0) {
        message.textContent = "You've already guessed that letter or it's invalid.";
        return;
    }

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        attemptsLeft--;
        message.textContent = `Wrong guess! You have ${attemptsLeft} attempts left.`;
    } else {
        message.textContent = "Good guess!";
    }

    updateWordDisplay();

    if (attemptsLeft <= 0) {
        message.textContent = `Game Over! The word was "${selectedWord}".`;
        guessButton.disabled = true;
        restartButton.style.display = "block";
    } else if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        message.textContent = "Congratulations! You've guessed the word!";
        guessButton.disabled = true;
        restartButton.style.display = "block";
    }
}

guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", startGame);

// Start the game on page load
startGame();
