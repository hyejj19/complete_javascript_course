'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Here We Go';

//페이지를 로드하며 랜덤 넘버 생성
let secretNumber = Math.ceil(Math.random() * 20);

//score와 highScore 초기값 셋팅
let score = 20;
let highScore;

//메시지 바뀜
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

//랜덤넘버 뿌려주기
const displayNumber = function (num) {
  document.querySelector('.number').textContent = num;
};

//스코어
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

//하이스코어
const displayHighScore = function (highScore) {
  document.querySelector('.highscore').textContent = highScore;
};

//input값으로 숫자 예측
const guessHandler = function () {
  const guess = Number(document.querySelector('.guess').value);

  //input이 없는 경우
  if (!guess) displayMessage('❌ No Number');
  //숫자를 맞춘 경우
  else if (guess === secretNumber) {
    displayMessage('💘 Correct!');

    if (highScore >= score) highScore = highScore;
    else highScore = score;
    displayHighScore(highScore);
    displayNumber(secretNumber);

    document.querySelector('body').style.backgroundColor = '#7FB3D5';
    document.querySelector('.number').style.width = '30rem';
  }

  //예측이 틀렸을 경우
  else if (guess !== secretNumber) {
    if (score > 0) {
      displayMessage(guess > secretNumber ? '💥 Too high' : '💦 Too low');
      score--;
      displayScore(score);
    } else displayMessage('YOU LOST');
  }
};

//Again 재시작
const againHandler = function () {
  score = 20;
  displayScore(score);
  displayMessage('Start guessing...');
  secretNumber = Math.ceil(Math.random() * 20);
  // displayNumber(secretNumber);
  displayNumber('?');
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
};

//숫자예측 클릭시 클릭 이벤트 발생
document.querySelector('.check').addEventListener('click', guessHandler);

//Again!
document.querySelector('.again').addEventListener('click', againHandler);
