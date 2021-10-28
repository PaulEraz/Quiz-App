const api = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';

const question = document.querySelector('#question');
const answers = document.querySelector('#answers');
const nextBtn = document.querySelector('#next');
const questionNum = document.querySelector('#question-num');

export const quizData = async () => {
  const res = await fetch(api);
  const data = await res.json();
  const questions = data.results.map(data => data.question);
  const correctAnswer = data.results.map(data => data.correct_answer);
  const incorrectAnswers = data.results.map(data => data.incorrect_answers);

  let quizNum = 0;

  const showQuestion = index => {
    const options = [correctAnswer[index], ...incorrectAnswers[index]];
    const randomOptions = options.sort(() => Math.random() - 0.5);

    question.textContent = `${index + 1}. ${questions[index]}`;
    answers.innerHTML = `
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

    const answer = [...document.querySelectorAll('#answer')];
    answer.forEach(option =>
      option.addEventListener('click', e => {
        if (e.target.firstElementChild.innerText === correctAnswer[index]) {
          e.target.classList.add('right-answer');
          e.target.innerHTML += `<i class="fas fa-check right"></i>`;
        } else {
          e.target.classList.add('wrong-answer');
          e.target.innerHTML += `<i class="fas fa-times wrong"></i>`;
        }
        answer.forEach(option => option.classList.add('disabled'));
      })
    );
  };
  showQuestion(quizNum);

  nextBtn.addEventListener('click', () => {
    if (quizNum < questions.length - 1) {
      quizNum++;
      showQuestion(quizNum);
    } else {
      console.log('gg');
    }
  });
};
