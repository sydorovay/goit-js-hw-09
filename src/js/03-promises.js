// Імпортуємо Notiflix.
import Notiflix from 'notiflix';

// отримуємо посилання на форму і створюємо обробник події для відправки форми.
const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
  // Відключаємо стандартну поведінку браузера
  evt.preventDefault();
  // Отримуємо значення полів форми
  const delay = Number(evt.target.elements.delay.value);
  const step = Number(evt.target.elements.step.value);
  const amount = Number(evt.target.elements.amount.value);
  // Створюємо функції для обробки успішного та неуспішного виконання промісустворює обробник події для відправки форми.
  const onSuccess = ({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  };
  const onFailure = ({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  };
  // Запускаємо цикл для створення та виконання промісів.
  for (const i of Array(amount).keys()) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => onSuccess({ position, delay }))
      .catch(({ position, delay }) => onFailure({ position, delay }));
  }
});

// Створюємо функцію createPromise, яка приймає position - позицію промісу та delay - затримку перед виконанням промісу.
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(`Creating promise ${position} with delay ${delay}ms`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
