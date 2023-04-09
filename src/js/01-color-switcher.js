//  посилання на кнопки
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
// ідентифікатор інтервалу
let interval = null;
// Ф-ція випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
// Ф-ція призначення кольору для body
function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
// Ф-ція зміни колюру з інтервалом і відключенням кнопки start
function changeColor() {
    interval = setInterval(changeBodyColor, 1000);
    startButton.disabled = true;
  }

// ф-ція зупинки зміни колюру з активацією кнопки start
function stopChangeBackgroundColor() {
  clearInterval(interval);
  interval = null;
  startButton.disabled = false;
}
// обробник події 'click' для кнопки start
startButton.addEventListener('click', changeColor);
// обробник події 'click' для кнопки stop
stopButton.addEventListener('click', stopChangeBackgroundColor);
