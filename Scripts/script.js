'use strict';

// Assigning Values that will be used in game
let tries = 3;
let highScore = 0;
let playing = true;

// targeting necesarry element and storing them in variables
let titleText = document.querySelector('.guessmynum');
let secNumRev = document.querySelector('.ques');
let infoText = document.querySelector('.guess');
let tryCount = document.querySelector('.tries span');
let highScoreCount = document.querySelector('.high-score span');
let userInput = document.querySelector('.input');
let body = document.querySelector('body');

// generating secret Number
let secNum = Math.trunc(Math.random() * 10 + 1)

// Sound Effects
let wrongAns = new Audio();
wrongAns.src = '../Assets/Sound-effects/Wrong-ans.wav';
let gameOver = new Audio();
gameOver.src = '../Assets/Sound-effects/Game-over.wav'
let numberGuessed = new Audio();
numberGuessed.src = '../Assets/Sound-effects/Win.wav'

// Function for decreasing tries
let tryDec = function () {
    if (tries > 1) {
        tries--;
        tryCount.textContent = tries;
        wrongAns.play();
    }
    else {
        tryCount.textContent = 0;
        body.style.background = 'red'
        titleText.textContent = 'Here Is The Number'
        infoText.textContent = '☹ Oops.. You Lost!'
        secNumRev.textContent = secNum;
        playing = false;
        body.classList.add('game-over')
        gameOver.play();
    }
}


// Whole functionality to check if user guessed the value within the given tries or not
function checkWinOrLose () {
    if (playing){
    
        if (userInput.value == secNum) {
            playing = false;
            infoText.textContent = '🏆 You Win!'
            body.style.background = 'rgb(0, 180, 0)'
            titleText.textContent = 'Here Is The Number'
            secNumRev.textContent = secNum;
            body.classList.add('win')
            numberGuessed.play();
            if (tries == 3) {
                highScore = 100;
                highScoreCount.textContent = highScore
            }
            else if (tries == 2 && highScore < 66) {
                highScore = 66
                highScoreCount.textContent = highScore
    
            }
            else if (tries == 1 && highScore < 33) {
                highScore = 33
                highScoreCount.textContent = highScore
    
            }
        }
        else if (!userInput.value) {
            infoText.textContent = '🔢 Enter A Number'
            // tryDec();
        }
        else if (userInput.value > secNum) {
            infoText.textContent = '📈 Too High!';
            tryDec();
        }
        else if (userInput.value < secNum) {
            infoText.textContent = '📉 Too Low!';
            tryDec();
        }
    }
    }


    // Reseting the whole game (Except Highscore)
    function playAgain() {
        secNum = Math.trunc(Math.random() * 10 + 1);
        infoText.textContent = '🤔 Guess The Number'
        body.style.background = 'black';
        tries = 3
        tryCount.textContent = tries;
        titleText.textContent = 'Guess My Number'
        secNumRev.textContent = '?'
        userInput.value = '';
        playing = true;
        body.classList.remove('game-over')
        body.classList.remove('win')
    }

    // Checking the user input on clicking on check button
    // and calling out winner or loser functionality
    document.querySelector('.check').addEventListener('click', checkWinOrLose)
    
    
    // Checking the user input on pressing Enter key on user keyboard
document.addEventListener('keypress',function(keypressed){
    if(keypressed.key == 'Enter'){
        checkWinOrLose()
    }
} )

// calling out the reset game function when 'Again' button is clicked
document.querySelector('.play-again').addEventListener('click', playAgain)

// calling out the reset game function when 'A' key is pressed on users keyboard
document.addEventListener('keypress',function(keypressed){
    if(keypressed.key == 'a' || keypressed.key == 'A'){
        playAgain()
    }
} )
