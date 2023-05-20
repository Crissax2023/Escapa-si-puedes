var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;
var score = 0;
var gameOver = false;
var maxFish =10;
var max = 3
var gameFrames = 0;
var fishAnimationSpeed = 20;
var difficulty = 1;

var dory = {
  x: 250,
  y: 10,
  w: 30,
  h: 30,
  vy: 0,
  gravity: 2,
  lift: -25,
  image: new Image(),
  update: function() {
    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.vy = 0;
    }
  },
  draw: function() {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  },
  flap: function() {
    this.vy += this.lift;
  }
};

dory.image.src = "../Images/pez_user.png";

var fishArray = []; // Arreglo para almacenar todos los peces

var fish = {
  x: width,
  y: Math.random() * (height - 50) + 50,
  w: 70,
  h: 60,
  vx: -5 * difficulty,
  vy: Math.random() * 10 - 15,
  animate: 0,
  position: 0,
  image: new Image(),
  update: function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < -this.w) {
      this.x = width;
      this.y = Math.random() * (height - 50) + 50;
      this.vx = -5 * difficulty;
      this.vy = Math.random() * 10 - 5;
      score++;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy = -this.vy;
    }
    if (this.y + this.h > height) {
      this.y = height - this.h;
      this.vy = -this.vy;
    }
  },
  draw: function() {
    ctx.drawImage(
      this.image,
      (this.animate * 254) / 4,
      (this.position * 264) / 4,
      260 / 4,
      264 / 4,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }
};

fish.image.src = "../Images/Water-Monsters-Pixel-Art-Sprite-Sheet-Pack2-removebg-preview-removebg-preview.png";

function collision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y;
}

function fishAnimation() {
  if (gameFrames % fishAnimationSpeed === 0) {
    if (fish.animate === 3) {
      fish.animate = 0;
    } else {
      fish.animate++;
    }
  }
}

function addFish() {
  if (fishArray.length < 2) {
    var newFish = Object.assign({}, fish);
    newFish.x = width;
    newFish.y = Math.random() * (height - 50) + 50;
    newFish.vx = -5 * difficulty;
    newFish.vy = Math.random() * 10 - 5;

    fishArray.push(newFish);
  }
}

function update() {
  ctx.clearRect(0, 0, width, height);

  dory.update();
  dory.draw();

  fish.update();
  fish.draw();

  fishArray.forEach(function(fish) {
    fish.update();
    fish.draw();
  });

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Puntaje: " + score + "/" + maxFish, 10, 30);

  if (collision(dory, fish) || score === maxFish) {
    gameOver = true;
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    if (collision(dory, fish)) {
      ctx.fillText("¡Fin del juego!", width / 2 - 120, height / 2);
    } else {
      ctx.fillText("¡Ganaste!", width / 2 - 90, height / 2);
    }
    ctx.fillText("Puntaje final: " + score, width / 2 - 120, height / 2 + 50);
  } else {
    if (score > 0 && score % 5 === 0) {
      addFish();
    }

    requestAnimationFrame(update);
  }

  gameFrames++;
  fishAnimation();
}

function flap() {
  if (!gameOver) {
    dory.flap();
  }
}

document.addEventListener("keydown", flap);

update();

