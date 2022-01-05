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

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    fire(player.style.transform);
  }
});

function fire(x) {
  console.log(x);
  const bullet = document.createElement("DIV");
  bullet.classList.add("bullet");

  bullet.style.transform = x;
  frame.appendChild(bullet);
  setTimeout(() => {
    bullet.style.transform = x + " " + "translateY(-999px)";
  }, 10);
  console.log(bullet.style.transform);
}

function initGame() {
  playerX = window.innerWidth / 2;
  player.style.transform = `translateX(${playerX}px)`;
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
}, 2000);

setInterval(() => {
  document.querySelectorAll(".obstacle").forEach((o) => {
    let currTrans = parseInt(o.dataset.transY);
    currTrans += 8;
    o.dataset.transY = currTrans;
    o.style.transform = `translateY(${currTrans}px)`;
  });
}, 100);
