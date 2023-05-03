import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dateTimeSelector: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert(`"Please choose a date in the future"`);
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateTimeSelector, options);

let intervalId = null;
// Натисканням на кнопку «Start» починається відлік часу до обраної дати з моменту натискання
function onBtnClick() {
  intervalId = setInterval(timer, 1000);
  refs.startBtn.disabled = true;
  refs.dateTimeSelector.disabled = true;
  refs.console.log(intervalId);
}

function timer() {
  const selDate = new Date(refs.dateTimeSelector.value).getTime();
  const currentDate = new Date().getTime();
  const deltaTime = selDate - currentDate;
  //   console.log(deltaTime);

  if (deltaTime <= 0) {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
    refs.dateTimeSelector.disabled = false;
  } else {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
