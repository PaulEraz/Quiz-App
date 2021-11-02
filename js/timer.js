import { correctAnswer } from './apiData.js';

const time = document.querySelector('#time');
const timerLine = document.querySelector('#timer-line');

let idInterval;

const timer = seconds => {
  let widthSize = 0;
  const denominator = seconds;

  idInterval = setInterval(() => {
    time.textContent = seconds;

    timerLine.style.width = `${widthSize}%`;

    widthSize += (1 / denominator) * 100;
    seconds--;

    if (seconds < 0) {
      clearInterval(idInterval);

      const answers = document.querySelectorAll('#answer');
      answers.forEach(answer => {
        for (let i = 0; i < correctAnswer.length; i++) {
          if (answer.innerText === correctAnswer[i]) {
            answer.classList.add('right-answer');
            answer.innerHTML += `<i class="fas fa-check right"></i>`;
          }
        }
        answer.classList.add('disabled');
      });
    }
  }, 1000);
};

export { idInterval, timer };
