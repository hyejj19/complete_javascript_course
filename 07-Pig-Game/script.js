'use strict';

// 선택된 요소들
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerActive = document.querySelector('.player--active');
const diceEl = document.querySelector('.dice');
const diceSrc = document.querySelector('.dice').src;
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


//시작 컨디션
let totalScore, playing, currScore, activePlayer;
const init = function(){
    totalScore = [0,0];
    playing = true;
    currScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currScore0El.textContent = 0;
    currScore1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

// 플레이어 변경
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// 주사위 굴리기 기능
btnRollDice.addEventListener('click', function(){
    if(playing){

            //1. 랜덤 주사위 생성
        const diceNum = Math.ceil(Math.random()*6);

        //2. 주사위 화면 표시
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNum}.png`;

        //3. 주사위 번호가 1인지 확인
        if(diceNum !== 1) {
            // 현재 score에 저장
            currScore += diceNum;
            document.getElementById(`current--${activePlayer}`).textContent = currScore;
        }
        else {
            
            // 플레이어 교체
            switchPlayer();
        }
    }
});

// 현재 점수 홀드 기능
btnHold.addEventListener('click',function(){
    if(playing){

        // 1. 현재 스코어를 현재 플레이어의 토탈 스코어에 반영
        totalScore[activePlayer] += currScore;
        document.getElementById(`score--${activePlayer}`).textContent =totalScore[`${activePlayer}`];

        // 2. 현재 플레이어의 토탈 스코어 >= 100 여부 확인
        if(totalScore[activePlayer] >= 100){
            // 게임 종료
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            diceEl.classList.add('hidden');

            playing = false;
            console.log(playing);
        }
        else {
            // 플레이어 교체
            switchPlayer();
        }
    }
});

// Restart
btnNewGame.addEventListener('click', init);