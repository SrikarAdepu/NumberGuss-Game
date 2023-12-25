function checkGuess() {
    const userGuess = document.getElementById('userGuess').value;
    const messageElement = document.getElementById('message');

    if (userGuess === '') {
        messageElement.textContent = 'Please enter a number.';
        return;
    }

    const guess = parseInt(userGuess);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100.';
        color = "red"
        return;
    }

    // Make an AJAX request to the Flask server to check the guess
    fetch('/check_guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_guess=${guess}`,
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message;
        messageElement.style.color = data.color;

        // Disable input after a correct guess
        if (data.color === 'green') {
            document.getElementById('userGuess').disabled = true;
        }
    })
    .catch(error => console.error('Error:', error));
}
