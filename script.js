const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const catchSound = document.getElementById('catch-sound');

let score = 0;

// تحريك اللاعب
document.addEventListener('mousemove', (e) => {
  const containerRect = gameContainer.getBoundingClientRect();
  const playerWidth = player.offsetWidth;

  let newX = e.clientX - containerRect.left - playerWidth / 2;

  if (newX < 0) newX = 0;
  if (newX > containerRect.width - playerWidth) newX = containerRect.width - playerWidth;

  player.style.left = newX + 'px';
});

// إنشاء الكرات
function createBall() {
  const ball = document.createElement('div');
  ball.classList.add('ball');

  const randomX = Math.floor(Math.random() * (gameContainer.offsetWidth - 30));
  ball.style.left = randomX + 'px';

  gameContainer.appendChild(ball);

  const fallDuration = Math.random() * 3 + 2; // مدة السقوط بين 2 إلى 5 ثوانٍ
  ball.style.animationDuration = fallDuration + 's';

  ball.addEventListener('animationend', () => {
    gameContainer.removeChild(ball);
  });

  checkCollision(ball);
}

// التحقق من الاصطدام
function checkCollision(ball) {
  const interval = setInterval(() => {
    const ballRect = ball.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      ballRect.bottom > playerRect.top &&
      ballRect.top < playerRect.bottom &&
      ballRect.left < playerRect.right &&
      ballRect.right > playerRect.left
    ) {
      score++;
      scoreDisplay.textContent = score;
      catchSound.currentTime = 0;
      catchSound.play();
      ball.remove();
      clearInterval(interval);

      // عرض رسالة "كفو تولين" كلما تجمع 100 نقطة
      if (score % 100 === 0) {
        showMessage("كفو تولين!");
      }
    }
  }, 50);
}

// عرض الرسائل على الشاشة
function showMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  gameContainer.appendChild(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, 2000); // الرسالة تختفي بعد ثانيتين
}

// إنشاء كرات بشكل متكرر
setInterval(createBall, 1000);
