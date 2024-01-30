import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'https://cdn.jsdelivr.net/npm/izitoast@1/+esm';

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
    });
    button.disabled = true; //------може тут щось
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

let timerId = null;

function onBtnClick(event) {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    button.disabled = true;

    if (diff < 0) {
      clearInterval(timerId);
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




// function dateLimit() {
//     const timeNow = Date.now();

//   if (timeNow < userSelectedDate || userSelectedDate === '') {
//     iziToast.show({
//       title: 'Hey',
//       message: 'What would you like to add?',
//     });
//     button.disabled = 'true'; //------може тут щось
//   }
// }

// onClose(selectedDates) {
//     const selectedDate = selectedDates[0];
//     const dateNow = new Date();
//     if (selectedDate > dateNow) {
//       userSelectedDate = selectedDate;
//       console.log('future:', userSelectedDate);
//     };
//     if (dateNow < userSelectedDate || userSelectedDate === '') {
//     iziToast.show({
//       title: 'Hey',
//       message: 'What would you like to add?',
//     });
//     button.disabled = true; //------може тут щось
//   } else
//   },
// };


// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },

// };

// const datetime = document.querySelector("#datetime-picker");
// const button = document.querySelector("button");

// // button.addEventListener("click", onBtnClick);

// console.log(this.onClose.value);
// let userSelectedDate = false;
// let timerId = null;

// flatpickr(datetime, {options});
// console.log();

// function dateLimit() {

//   const timeNow = Date.now();
//   if (this.onClose.value > timeNow) {

//   }
// }

// dateLimit();

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000));
