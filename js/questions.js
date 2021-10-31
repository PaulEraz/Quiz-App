import { timer, idInterval } from './timer.js';
import { showResult } from './showResult.js';
import escapeHtml from './escapeHtml.js';

const api = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';

const question = document.querySelector('#question');
const answersList = document.querySelector('#answers-list');
const nextBtn = document.querySelector('#next');
const questionNum = document.querySelector('#question-num');

let score = 0;
let quizNum = 0;

const quizData = async () => {
  const res = await fetch(api);
  const data = await res.json();
  const questions = data.results.map(data => escapeHtml(data.question));
  const correctAnswer = data.results.map(data =>
    escapeHtml(data.correct_answer)
  );
  const incorrectAnswers = data.results.map(data => data.incorrect_answers);

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
        answers.forEach(option => option.classList.add('disabled'));
        clearInterval(idInterval);
      })
    );
  };

  showQuestion(quizNum);

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
};

export { quizData, score };
