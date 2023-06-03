const canvas = document.getElementById("myCanvas");
const ct = canvas.getContext("2d");
//設定格數15格
const unit = 20;
const col = canvas.width / unit;
const row = canvas.height / unit;

//更新畫布
let myGame = setInterval(draw, 150);

let snake = [];
snake[0] = {
  x: 60,
  y: 0,
};
snake[1] = {
  x: 40,
  y: 0,
};
snake[2] = {
  x: 20,
  y: 0,
};
snake[3] = {
  x: 0,
  y: 0,
};

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * col) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ct.fillStyle = "orange";
    ct.fillRect(this.x, this.y, unit, unit);
  }
}

let myFruit = new Fruit();

window.addEventListener("keydown", changeDirection);
let dir = "right";
function changeDirection(e) {
  // console.log(e.key);
  if (e.key == "ArrowUp" && dir != "down") {
    dir = "up";
  } else if (e.key == "ArrowDown" && dir != "up") {
    dir = "down";
  } else if (e.key == "ArrowLeft" && dir != "right") {
    dir = "left";
  } else if (e.key == "ArrowRight" && dir != "left") {
    dir = "right";
  }
}

function draw() {
  // console.log("test");
  //畫布
  ct.fillStyle = "black";
  ct.fillRect(0, 0, canvas.width, canvas.height);

  //畫果實
  myFruit.drawFruit();

  //畫蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ct.fillStyle = "lightblue";
    } else {
      ct.fillStyle = "lightgreen";
    }
    //x,y,width,height
    ct.fillRect(snake[i]["x"], snake[i]["y"], unit, unit);
    ct.strokeStyle = "white";
    ct.strokeRect(snake[i]["x"], snake[i]["y"], unit, unit);

    //當蛇遇到牆
    if (snake[i]["x"] >= canvas.width) {
      snake[i]["x"] = 0;
    }
    if (snake[i]["y"] >= canvas.height) {
      snake[i]["y"] = 0;
    }
    if (snake[i]["x"] < 0) {
      snake[i]["x"] = canvas.width - unit;
    }
    if (snake[i]["y"] < 0) {
      snake[i]["y"] = canvas.height - unit;
    }
  }
  //移動蛇
  let snakeX = snake[0]["x"];
  let snakeY = snake[0]["y"];
  if (dir == "up") {
    snakeY -= unit;
  } else if (dir == "down") {
    snakeY += unit;
  } else if (dir == "left") {
    snakeX -= unit;
  } else if (dir == "right") {
    snakeX += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //蛇是否吃到果實
  if (snake[0]["x"] == myFruit["x"] && snake[0]["y"] == myFruit["y"]) {
    console.log("eating");
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}
