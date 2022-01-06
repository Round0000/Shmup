function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const player = document.getElementById("player");

function detectCollision(bullet, obs) {
  let obj1 = bullet.getBoundingClientRect();
  let obj2 = obs.getBoundingClientRect();

  if (
    obj1.left < obj2.left + obj2.width &&
    obj1.left + obj1.width > obj2.left &&
    obj1.top < obj2.top + obj2.height &&
    obj1.top + obj1.height > obj2.top
  ) {
    obs.classList.add("damaged");
    setTimeout(() => {
      obs.classList.remove("damaged");
    }, 300)

    console.log("COLLISION !!");

    bullet.remove();

    let currHP = Math.round(parseInt(obs.dataset.hp) - 10 * damageMultiplier);

    if (currHP < 1) {
      obs.remove();
      console.log("%capp.js line:29 currHP", "color: #007acc;", currHP);
    } else {
      obs.dataset.hp = currHP;
      obs.innerText = currHP;
    }
  }
}

let playerX = 0;

let damageMultiplier = 1;

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

// document.addEventListener("keydown", (e) => {
//   if (e.code === "ArrowLeft") {
//     playerX -= 16;
//     player.style.transform = `translateX(${playerX}px)`;
//   }
//   if (e.code === "ArrowRight") {
//     playerX += 16;
//     player.style.transform = `translateX(${playerX}px)`;
//   }
// });

let fireDelay = 0;
let initialFireDelay = 4;

setInterval(() => {
  if (fireDelay > 0) {
    fireDelay--;
  } else if (fireDelay === 0 && keymap[32]) {
    fire(player.style.transform);
  }
}, 100);

// document.addEventListener("keypress", (e) => {
//   if (e.code === "Space" && fireDelay === 0) {
//     fire(player.style.transform);
//     fireDelay = initialFireDelay;
//   }
// });

function fire(x) {
  fireDelay = initialFireDelay;

  const bullet = document.createElement("DIV");
  const xVal = parseInt(x.split("(")[1].split("px")[0]);
  console.log("%capp.js line:62 xVal", "color: #007acc;", xVal);

  bullet.classList.add("bullet");
  bullet.style.transform = x;
  // bullet.classList.add("mFluctuate");
  // bullet.classList.add("mHuge");
  // bullet.classList.add("mSlow");
  // bullet.classList.add("mWave");
  bullet.classList.add("mBeam");

  bullet.classList.add("mDouble");
  

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
  o.dataset.hp = getRandom(50, 100);
  o.innerText = o.dataset.hp;
  o.style.left = `${getRandom(0, window.innerWidth - 64)}px`;
  frame.appendChild(o);
}

setInterval(() => {
  spawnObstacle();
}, 1500);

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

// Keys
let keymap = {}; // You could also use an array
onkeydown = onkeyup = function (e) {
  keymap[e.keyCode] = e.type == "keydown";

  if (keymap[32]) {
    if (keymap[37]) {
      move("l");
    } else if (keymap[39]) {
      move("r");
    }
  } else if (keymap[37]) {
    move("l");
  } else if (keymap[39]) {
    move("r");
  }
};

function move(direction) {
  if (direction === "l") {
    playerX -= 16;
    if (playerX < 0) {
      playerX = 0;
    }
    player.style.transform = `translateX(${playerX}px)`;
  } else if (direction === "r") {
    playerX += 16;
    if (playerX > frame.getBoundingClientRect().width - 32) {
      playerX = frame.getBoundingClientRect().width - 32;
    }
    player.style.transform = `translateX(${playerX}px)`;
  }
}
