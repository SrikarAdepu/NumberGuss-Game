from flask import Flask, render_template, request, jsonify
import random


app = Flask(__name__)

# Generate a random number between 1 and 100
secret_number = random.randint(1, 100)
attempts = 0


@app.route('/')
def index():
    return render_template('index1.html')


@app.route('/'
           'check_guess', methods=['POST'])
def check_guess():
    global attempts
    user_guess = int(request.form['user_guess'])
    attempts += 1

    if user_guess == secret_number:
        message = f'Congratulations! You guessed the number {secret_number} in {attempts} attempts.'
        color = 'lightgreen'
    elif user_guess < secret_number:
        message = 'Too low,guess high. Try again.'
        color = 'yellow'
    else:
        message = 'Too high,guess low. Try again.'
        color = 'red'

    return jsonify({'message': message, 'color': color})


if __name__ == '__main__':
    app.run(debug=True)
