import { showQuestion } from './js/questions.js';
import { timer, idInterval } from './js/timer.js';
import { showResult } from './js/showResult.js';
import { questions } from './js/apiData.js';

const startBtn = document.querySelector('#start-btn');
const info = document.querySelector('#info');
const exitBtn = document.querySelector('#exit');
const continueBtn = document.querySelector('#continue');
const quizBox = document.querySelector('#quiz-box');
const nextBtn = document.querySelector('#next');

let quizNum = 0;

startBtn.addEventListener('click', () => {
  info.classList.add('show');
});

exitBtn.addEventListener('click', () => {
  info.classList.remove('show');
});

continueBtn.addEventListener('click', () => {
  info.classList.remove('show');
  quizBox.classList.add('show');
  showQuestion(quizNum);
  timer(15);
});

nextBtn.addEventListener('click', () => {
  if (quizNum < questions.length - 1) {
    quizNum++;
    clearInterval(idInterval);
    timer(15);
    showQuestion(quizNum);
  } else {
    showResult();
  }
});
