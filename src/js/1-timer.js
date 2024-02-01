import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = new Date();

    if (selectedDate - dateNow < 0 || selectedDate === false) {
      iziToast.show({
        title: 'Err',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'red',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
      userSelectedDate = selectedDate;
      console.log('future:', userSelectedDate);
    }
  },
};

let userSelectedDate;
console.log(userSelectedDate);

const datetime = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

flatpickr(datetime, options);
button.addEventListener('click', onBtnClick);
button.disabled = true;
datetime.disabled = false;

let timerId = null;

function onBtnClick(event) {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    button.disabled = true;
    datetime.disabled = true;

    if (diff < 1000) {
      clearInterval(timerId);
      return;
    }
    onTimeValue(convertMs(diff));
  }, 1000);
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
convertMs();

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onTimeValue({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}
