import { questions, correctAnswer, incorrectAnswers } from './apiData.js';
import { idInterval } from './timer.js';

const question = document.querySelector('#question');
const answersList = document.querySelector('#answers-list');
const questionNum = document.querySelector('#question-num');

let score = 0;

const showQuestion = index => {
  const options = [correctAnswer[index], ...incorrectAnswers[index]];
  const randomOptions = options.sort(() => Math.random() - 0.5);

  question.textContent = `${index + 1}. ${questions[index]}`;
  answersList.innerHTML = `
    <div class="answer flex flex--sb" id="answer">
        <p>${randomOptions[0]}</p>
    </div>
    <div class="answer flex flex--sb" id="answer">
        <p>${randomOptions[1]}</p>
    </div>
    <div class="answer flex flex--sb" id="answer">
        <p>${randomOptions[2]}</p>
    </div>
    <div class="answer flex flex--sb" id="answer">
        <p>${randomOptions[3]}</p>
    </div>`;
  questionNum.textContent = index + 1;

  const answers = document.querySelectorAll('#answer');
  answers.forEach(answer =>
    answer.addEventListener('click', e => {
      if (e.target.innerText === correctAnswer[index]) {
        e.target.closest('#answer').classList.add('right-answer');
        e.target.closest(
          '#answer'
        ).innerHTML += `<i class="fas fa-check right"></i>`;
        score++;
      } else {
        e.target.closest('#answer').classList.add('wrong-answer');
        e.target.closest(
          '#answer'
        ).innerHTML += `<i class="fas fa-times wrong"></i>`;
        answers.forEach(answer => {
          if (answer.innerText === correctAnswer[index]) {
            answer.classList.add('right-answer');
            answer.innerHTML += `<i class="fas fa-check right"></i>`;
          }
        });
      }
      answers.forEach(answer => answer.classList.add('disabled'));
      clearInterval(idInterval);
    })
  );
};

export { score, showQuestion };
