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
let myGame = setInterval(draw, 30);

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    brickArray.push(this);
  }

  drawBrick() {
    ct.fillStyle = "lightgreen";
    ct.fillRect(this.x, this.y, this.width, this.height);
  }
}

function getRandomNumber(min, max) {
  console.log(Math.random() * (max - min));
  return min + Math.floor(Math.random() * (max - min));
}

//0 <= x <= 770 ; 0<= y <=470
for (let i = 0; i < 10; i++) {
  new Brick(getRandomNumber(0, 770), getRandomNumber(0, 470));
}

let ran_x = c.addEventListener("mousemove", function (e) {
  // console.log(e.layerX);
  ground_x = e.layerX;
});

function draw() {
  //   console.log(canvasWidth, canvasHeight);
  ct.fillStyle = "black";
  ct.fillRect(0, 0, canvasWidth, canvasHeight);

  //製作磚塊
  brickArray.forEach((brick) => brick.drawBrick());

  ct.beginPath();
  //x,y,radius,startAngle,endAngle
  ct.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ct.stroke();
  ct.fillStyle = "yellow";
  ct.fill();

  //移動球
  circle_x += xSpeed;
  circle_y += ySpeed;
  if (circle_y >= canvasHeight - radius) {
    // console.log(circle_y);
    ySpeed *= -1;
  }
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  if (circle_y <= radius) {
    // console.log(circle_y);
    ySpeed *= -1;
  }
  if (circle_x <= radius) {
    xSpeed *= -1;
  }

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
      circle_y -= 40;
      ySpeed *= -1;
    } else {
      circle_y += 40;
      ySpeed *= -1;
    }
  }
}
