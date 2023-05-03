// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick(e) {
  if (!intervalId) {
    intervalId = setInterval(() => {
      const backgroundColor = getRandomHexColor();
      refs.body.style.backgroundColor = backgroundColor;
    }, 1000);

    refs.startBtn.disabled = true;
  }
}

function onStopBtnClick() {
  clearInterval(intervalId);
  intervalId = null;
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
