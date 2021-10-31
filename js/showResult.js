import { score } from './questions.js';

const quizBox = document.querySelector('#quiz-box');
const resultBox = document.querySelector('#result-box');
const playerScore = document.querySelector('#score');
const replayBtn = document.querySelector('#replay');

export const showResult = () => {
  quizBox.classList.remove('show');
  resultBox.classList.add('show');
  playerScore.textContent = score;
};

replayBtn.addEventListener('click', () => {
  window.location.reload();
});
