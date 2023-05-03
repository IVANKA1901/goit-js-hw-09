// Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('.form'),
  btn: document.querySelector('button'),
};

refs.input.addEventListener('submit', onHandleSubmit);

function onHandleSubmit(e) {
  e.preventDefault();
  const delay = Number.parseInt(e.target.elements.delay.value);
  const step = Number.parseInt(e.target.elements.step.value);
  const amount = e.target.elements.amount.value;
  // console.log(delay, step, amount);

  for (let position = 1; position <= amount; position++) {
    let promDelay = delay + step * position;

    createPromise(position, promDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          { timeout: 3000 }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 3000,
          }
        );
      });
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
