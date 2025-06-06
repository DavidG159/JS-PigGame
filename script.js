'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dicesfx = new Audio('dice-roll.mp3');
const holdsfx = new Audio('hold.mp3');
const reset = new Audio('reset.mp3');
const win = new Audio('win.mp3');



const rules = document.querySelector('.btn-rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

let highscore = 0;

//Starting condition

let scores, currentScore, activePlayer, playing;


const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function () {
    modal.classList.remove('hidden');
    console.log('test');
    overlay.classList.remove('hidden');
}

rules.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden'))
        closeModal();

});


const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;


    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;



    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');



}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//Rolling dice functionality
btnRoll.addEventListener('click', function () {

    if (playing) {
        //1. Generating a random dice roll 
        const dice = Math.trunc(Math.random() * 6) + 1;
        dicesfx.play();
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            dicesfx.play();
            //Add dice to the current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;


        } else {
            //switch to the next player
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    holdsfx.play();
    if (playing) {
        //Add current score to the active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //Check if players score is already >= 100
        //If true finish the game
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`#score--${activePlayer}`).style.color = 'white';
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            highscore = scores[activePlayer] > highscore ? highscore = scores[activePlayer] : highscore = highscore;
            document.querySelector('.highscore-num').textContent = highscore;



            win.play();
        } else {
            switchPlayer();
        }



        //if not switch to the next player
    }
});

btnNew.addEventListener('click', init);                                                                                                                                                                                                                                                                                                                                                                                               