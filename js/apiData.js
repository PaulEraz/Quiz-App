import escapeHtml from './escapeHtml.js';

const api = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';

const quizData = async () => {
  const res = await fetch(api);
  const data = await res.json();
  return data;
};

const data = await quizData();
const questions = data.results.map(data => escapeHtml(data.question));
const correctAnswer = data.results.map(data => escapeHtml(data.correct_answer));
const incorrectAnswers = data.results.map(data => data.incorrect_answers);

export { questions, correctAnswer, incorrectAnswers };
