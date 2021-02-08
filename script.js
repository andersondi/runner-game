const hero = document.querySelector('.hero');
const background = document.querySelector('.background');

const jumpLimitHeight = 47 * 3;
const riseTime = 200;
const fallTime = 200;
let isJumping = false;
let heroPosition = 0;
let isGameOver = false;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      let x = document.getElementById("h");
      x.className = x.className.replace(/(^|\s+)walk($|\s+)/g, " jump");
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (heroPosition >= jumpLimitHeight) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (heroPosition <= 47) {
          clearInterval(downInterval);
          isJumping = false;
          let x = document.getElementById("h");
          x.className = x.className.replace(/(^|\s+)jump($|\s+)/g, " walk");
        } else {
          heroPosition -= 47;
          hero.style.bottom = heroPosition + "px";
        }
      }, riseTime);
    } else {
      heroPosition += 47;
      hero.style.bottom = heroPosition + "px";
    }
  }, fallTime);
}

function createEnemy() {
  const enemy = document.createElement('div');
  let enemyPosition = 1000;
  let randomTime = Math.random() * 6000;

  if(isGameOver) return;

  enemy.classList.add('enemy');
  enemy.classList.add('zombie', 'zombie--rise');
  enemy.style.left = 1000 + 'px';

  background.appendChild(enemy);

  let walkInterval = setInterval(() => {
    enemy.classList.remove('zombie--rise');
    enemy.classList.add('zombie--walk');
  }, 1600);

  let leftInterval = setInterval(() => {
    if (enemyPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(enemy);
    } else if (enemyPosition > 0 && enemyPosition < 40 && heroPosition < 50) {
      isGameOver = true;
      clearInterval(leftInterval);
        document.head.innerHTML = `
                                  <meta charset="UTF-8">
                                  <title>Runner Game</title>
                                  <link rel="stylesheet" href="style.css"></link>
                                  <script src="script.js" charset="UTF-8" defer></script>
                                  `
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      enemyPosition -= 3;
      enemy.style.left = enemyPosition + 'px';
    }
  }, 20);
  setTimeout(createEnemy, randomTime);
}

createEnemy();
document.addEventListener('keyup', handleKeyUp);