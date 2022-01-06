function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const player = document.getElementById("player");

function detectCollision(object1, object2) {
  let obj1 = object1.getBoundingClientRect();
  let obj2 = object2.getBoundingClientRect();

  if (
    obj1.left < obj2.left + obj2.width &&
    obj1.left + obj1.width > obj2.left &&
    obj1.top < obj2.top + obj2.height &&
    obj1.top + obj1.height > obj2.top
  ) {
    object2.classList.add("collide");
    console.log("COLLISION !!", document.querySelectorAll(".bullet").length);
    object2.remove();
    object1.remove();
  }
}

let playerX = 0;

setInterval(() => {
  let bullets = document.querySelectorAll(".bullet");
  bullets.forEach((bullet) => {
    document.querySelectorAll(".obstacle").forEach((obstacle) => {
      detectCollision(bullet, obstacle);
    });

    if (bullet.getBoundingClientRect().top < 0) {
      bullet.remove();
    }
  });
}, 5);

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    playerX -= 16;
    player.style.transform = `translateX(${playerX}px)`;
  }
  if (e.code === "ArrowRight") {
    playerX += 16;
    player.style.transform = `translateX(${playerX}px)`;
  }
});

let fireDelay = 0;
let initialFireDelay = 10;

setInterval(() => {
  if (fireDelay > 0) {
    fireDelay--;
    console.log('%capp.js line:57 fireDelay', 'color: #007acc;', fireDelay);
  }
}, 100);

document.addEventListener("keypress", (e) => {
  if (e.code === "Space" && fireDelay === 0) {
    fire(player.style.transform);
    fireDelay = initialFireDelay;
  }
});

function fire(x) {
  const bullet = document.createElement("DIV");
  const xVal = parseInt(x.split("(")[1].split("px")[0]);
  console.log("%capp.js line:62 xVal", "color: #007acc;", xVal);

  bullet.classList.add("bullet");
  bullet.style.transform = x;
  // bullet.classList.add("mFluctuate");
  // bullet.classList.add("mHuge");
  bullet.classList.add("mSlow");
  bullet.classList.add("mWave");

  // bullet.classList.add("mDouble");

  if (bullet.classList.contains("mDouble")) {
    x = `translateX(${xVal - 64}px)`;
    xR = `translateX(${xVal + 64}px)`;
    const secondbullet = document.createElement("DIV");
    secondbullet.classList = bullet.classList;
    bullet.style.transform = `translateX(${xVal - 8}px)`;
    secondbullet.style.transform = `translateX(${xVal + 8}px)`;
    setTimeout(() => {
      secondbullet.style.transform = xR + " " + "translateY(-999px)";
    }, 10);
    frame.appendChild(secondbullet);
  }

  frame.appendChild(bullet);
  setTimeout(() => {
    bullet.style.transform = x + " " + "translateY(-999px)";
  }, 10);
}

function initGame() {
  playerX = window.innerWidth / 2;
  player.style.transform = `translateX(${playerX}px)`;
  spawnObstacle();
}

initGame();

function spawnObstacle() {
  const o = document.createElement("DIV");
  o.classList.add("obstacle");
  o.dataset.transY = 0;
  o.style.left = `${getRandom(0, window.innerWidth - 64)}px`;
  frame.appendChild(o);
}

setInterval(() => {
  spawnObstacle();
}, 1000);

setInterval(() => {
  document.querySelectorAll(".obstacle").forEach((o) => {
    let currTrans = parseInt(o.dataset.transY);
    currTrans += 8;
    o.dataset.transY = currTrans;
    o.style.transform = `translateY(${currTrans}px)`;

    if (o.getBoundingClientRect().top > window.innerHeight) {
      o.remove();
    }
  });
}, 100);
