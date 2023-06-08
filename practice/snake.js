const canvas = document.getElementById("myCanvas");
const ct = canvas.getContext("2d");
//設定格數15格
const unit = 20;
const col = canvas.width / unit;
const row = canvas.height / unit;

//更新畫布
let myGame = setInterval(draw, 100);

let snake = [];
function createSnake() {
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
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * col) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ct.fillStyle = "orange";
    ct.fillRect(this.x, this.y, unit, unit);
  }

  pickLocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    do {
      new_x = Math.floor(Math.random() * col) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      console.log("果實新座標", new_x, new_y);
      checkOverlap(new_x, new_y);
    } while (overlapping);

    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          console.log("overlapping...");
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    this.x = new_x;
    this.y = new_y;
  }
}

//初始設定
let score = 0;
let highestScore;
loadHighestScore();
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("highestScore").innerHTML = "最高分數:" + highestScore;

createSnake();
let myFruit = new Fruit();

//按下按鍵變更蛇移動方向
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

  //防止連續點擊按鍵導致問題
  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  //確認蛇是否咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[0]["x"] == snake[i]["x"] && snake[0]["y"] == snake[i]["y"]) {
      clearInterval(myGame);
      alert("遊戲結束!");
      return;
    }
  }

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

  //確認蛇是否吃到果實
  if (snake[0]["x"] == myFruit["x"] && snake[0]["y"] == myFruit["y"]) {
    myFruit.pickLocation();
    score++;
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    setHighesScore(score);
    document.getElementById("highestScore").innerHTML =
      "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

function loadHighestScore() {
  console.log(localStorage.getItem("highestScore"));
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighesScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
