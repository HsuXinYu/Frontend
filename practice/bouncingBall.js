const c = document.getElementById("myCanvas");
const ct = c.getContext("2d");
const canvasWidth = c.width;
const canvasHeight = c.height;

let circle_x = 50;
let circle_y = 50;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let ground_x = 10;
let ground_y = 400;
let brickArray = [];
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    brickArray.push(this);
  }

  drawBrick(ct) {
    ct.fillStyle = "lightgreen";
    ct.fillRect(this.x, this.y, this.width, this.height);
  }

  touchBall(circle_x, circle_y) {
    return (
      circle_x + radius >= this.x &&
      circle_x <= this.x + this.width + radius &&
      circle_y + radius >= this.y &&
      circle_y <= this.y + this.height + radius
    );
  }
}

function getRandomNumber(min, max) {
  // console.log(Math.random() * (max - min));
  return min + Math.floor(Math.random() * (max - min));
}

//0 <= x <= 760 ; 0<= y <=460
for (let i = 0; i < 10; i++) {
  new Brick(getRandomNumber(0, 760), getRandomNumber(0, 460));
}

let mouse_x = c.addEventListener("mousemove", function (e) {
  // console.log(e.layerX);
  ground_x = e.layerX;
});

function draw() {
  // console.log(canvasWidth, canvasHeight);
  ct.fillStyle = "black";
  ct.fillRect(0, 0, canvasWidth, canvasHeight);

  ct.beginPath();
  //x, y, radius, startAngle, endAngle;
  ct.strokeStyle = "red";
  ct.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ct.stroke();
  ct.fillStyle = "yellow";
  ct.fill();
  console.log(circle_x, circle_y, "ball");
  ct.fillStyle = "orange";
  ct.fillRect(ground_x, ground_y, 200, 5);

  //球碰到地板反彈
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    if (ySpeed > 0) {
      circle_y -= 30;
      ySpeed *= -1;
    } else {
      circle_y += 30;
      ySpeed *= -1;
    }
  }

  //製作磚塊
  brickArray.forEach((brick) => brick.drawBrick(ct));

  // 確認是否打到磚塊
  brickArray.forEach((brick, index) => {
    if (brick.touchBall(circle_x, circle_y)) {
      console.log(brick.x, circle_x, brick.y, circle_y);
      // alert("touch");
      if (circle_x <= brick.x || circle_x >= brick.x + brick.width) {
        xSpeed *= -1;
      } else if (circle_y <= brick.y || circle_y >= brick.y + brick.height) {
        ySpeed *= -1;
      }
      brickArray.splice(index, 1);
    }
  });

  //移動球

  if (circle_y >= canvasHeight - radius) {
    console.log(circle_y);
    // alert("bottom wall");
    ySpeed *= -1;
  }
  if (circle_x >= canvasWidth - radius) {
    console.log(circle_x);
    // alert("right wall");
    xSpeed *= -1;
  }
  if (circle_y <= radius) {
    console.log(circle_y);
    // alert("top wall");
    ySpeed *= -1;
  }
  if (circle_x <= radius) {
    console.log(circle_x);
    // alert("left wall");
    xSpeed *= -1;
  }
  circle_x += xSpeed;
  circle_y += ySpeed;

  if (brickArray.length == 0) {
    alert("遊戲結束");
    clearInterval(myGame);
  }
}

let myGame = setInterval(draw, 100);
