const time = document.querySelector('#time');
const timerLine = document.querySelector('#timer-line');

export let idInterval;

export const timer = seconds => {
  let widthSize = 0;
  const denominator = seconds;

  idInterval = setInterval(() => {
    time.textContent = seconds;

    timerLine.style.width = `${widthSize}%`;

    widthSize += (1 / denominator) * 100;
    seconds--;

    if (seconds < 0) {
      clearInterval(idInterval);
    }
  }, 1000);
};
