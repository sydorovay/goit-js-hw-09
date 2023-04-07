import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

require('flatpickr/dist/themes/dark.css');
// посилання на елементи
const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

// об'єкт параметрів
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

//  обробник події onClose
function onClose(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate.getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
		startButton.disabled = true;
		startButton.classList.remove('active-Btn');
  } else {
		startButton.disabled = false;
		startButton.classList.add('active-Btn')
  }
}
// створення віджета
const picker = flatpickr(datePicker, options);

// кнопка старт - вимкнута за замовчуванням
startButton.disabled = true;

// ф-ція підрахунку значень
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

// перетворити число дати в рядок , додати 0 попереду
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// обробник подій для кнопки старт
startButton.addEventListener('click', getAndReturnDateWithAnInterval);

//ф-ція отримує і заданий час, отримує різницю між отриманим і поточним часом, коли час до цільової дати вже минув, відображення на сторінці буде оновлено і показуватиме "00", забезпечує коректне відображення решти часу до цільової дати, з оновленням кожну секунду.
function getAndReturnDateWithAnInterval() {
	const targetDate = picker.selectedDates[0];
	const intervalId = setInterval(function () {
		const timeRemaining = targetDate.getTime() - Date.now();
		if (timeRemaining < 0) {
			clearInterval(intervalId);
			days.textContent = '00';
			hours.textContent = '00';
			minutes.textContent = '00';
			seconds.textContent = '00';
			return;
		}
		const remaining = convertMs(timeRemaining);
		days.textContent = addLeadingZero(remaining.days);
		hours.textContent = addLeadingZero(remaining.hours);
		minutes.textContent = addLeadingZero(remaining.minutes);
		seconds.textContent = addLeadingZero(remaining.seconds);
	}, 1000)
}