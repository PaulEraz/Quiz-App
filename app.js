import { quizData } from './js/questions.js';
import { timer } from './js/timer.js';

const startBtn = document.querySelector('#start-btn');
const info = document.querySelector('#info');
const exitBtn = document.querySelector('#exit');
const continueBtn = document.querySelector('#continue');
const quizBox = document.querySelector('#quiz-box');

startBtn.addEventListener('click', () => {
  info.classList.add('show');
});

exitBtn.addEventListener('click', () => {
  info.classList.remove('show');
});

continueBtn.addEventListener('click', () => {
  info.classList.remove('show');
  quizBox.classList.add('show');
  timer(15);
});

quizData();
