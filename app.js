const startBtn = document.querySelector('#start'),
   screens = document.querySelectorAll('.screen'),
   timeList = document.querySelector('#time-list'),
   timeEl = document.querySelector('#time'),
   board = document.querySelector('#board');
colors = ['red', 'lemon', 'blue', 'green', 'purple', 'yellow', 'fuchsia']

let time = 0;
let score = 0;


startBtn.addEventListener('click', (event) => {
   event.preventDefault();
   screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
   if (event.target.classList.contains('time-btn')) {
      time = +(event.target.getAttribute('data-time'));
      screens[1].classList.add('up');
      startGame();
   }
});

board.addEventListener('click', event => {
   if (event.target.classList.contains('circle')) {
      score++;
      event.target.remove();
      createRandomCircle();
   }
});

function startGame() {
   setInterval(decreaseTime, 1000);
   createRandomCircle();
   setTime(time);
}

function decreaseTime() {
   if (time === 0) {
      finishGame();
   } else {
      let current = --time;
      if (current < 10) {
         current = `0${current}`;
      }
      setTime(current);
   }
   
}

function setTime(value) {
   timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
   timeEl.parentNode.classList.add('hide')
   board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
   const circle = document.createElement('div');
   const size = getRandomSize(10, 60);
   const { width, height } = board.getBoundingClientRect();
   const x = getRandomSize(0, width - size);
   const y = getRandomSize(0, height - size);

   circle.classList.add('circle');
   circle.style.width = `${size}px`;
   circle.style.height = `${size}px`;
   circle.style.top = `${y}px`;
   circle.style.left = `${x}px`;

   setColor(circle)

   board.append(circle);
}

function getRandomSize(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length);
   return colors[index];
}
function setColor(element) {
   const color = getRandomColor();
   element.style.background = color;
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}