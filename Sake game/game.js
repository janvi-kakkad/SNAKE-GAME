const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 50, y: 50 },
  { x: 40, y: 50 },
  { x: 30, y: 50 }
];
let fruit = { x: 0, y: 0 };
let obstacles = [];
let direction = "RIGHT";
let score = 0;
let gameOver = false;
let snakeSize = 10; 
let speed = 100; 
let obstacleCount = 5; 


const obstacleSlider = document.getElementById("obstacleSlider");
const obstacleCountDisplay = document.getElementById("obstacleCount");
const startGameBtn = document.getElementById("startGameBtn");
const gameOverScreen = document.getElementById("gameOver");
const playAgainBtn = document.getElementById("playAgainBtn");
const exitBtn = document.getElementById("exitBtn");
const gameScore = document.getElementById("gameScore");
const scoreValue = document.getElementById("scoreValue");


obstacleSlider.addEventListener("input", function() {
  obstacleCount = this.value;
  obstacleCountDisplay.textContent = obstacleCount;
});


startGameBtn.addEventListener("click", function() {
  document.getElementById("difficultySelection").style.display = "none";
  document.querySelector('.score').style.display = 'block';  

  canvas.style.display = "block";
  gameOverScreen.style.display = "none";
  startGame();
});


function generateFruit() {
  fruit.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
  fruit.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;

  
  obstacles.forEach(obstacle => {
    if (fruit.x === obstacle.x && fruit.y === obstacle.y) {
      generateFruit(); 
    }
  });
}


function generateObstacles() {
  obstacles = [];
  for (let i = 0; i < obstacleCount; i++) {
    let obstacle = {
      x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
      y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize
    };

    
    while (obstacles.some(o => o.x === obstacle.x && o.y === obstacle.y) || 
           (obstacle.x === fruit.x && obstacle.y === fruit.y)) {
      obstacle = {
        x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize
      };
    }

    obstacles.push(obstacle);
  }
}


function drawSnake() {
  ctx.fillStyle = "#2C3E50"; 
  snake.slice(1).forEach(segment => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });
  
  
  ctx.fillStyle = "#F39C12"; 
  ctx.fillRect(snake[0].x, snake[0].y, snakeSize, snakeSize);
}


function drawFruit() {
  ctx.fillStyle = "#E74C3C";  
  ctx.fillRect(fruit.x, fruit.y, snakeSize, snakeSize);
}


function drawObstacles() {
  ctx.fillStyle = "#34495E";  
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, snakeSize, snakeSize);
  });
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function moveSnake() {
  let head = { ...snake[0] };

  if (direction === "UP") head.y -= snakeSize;
  if (direction === "DOWN") head.y += snakeSize;
  if (direction === "LEFT") head.x -= snakeSize;
  if (direction === "RIGHT") head.x += snakeSize;

  snake.unshift(head); 

  
  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    generateFruit();
  } else {
    snake.pop(); 
  }

  
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollision(head) || isTouchingObstacle(head)) {
    gameOver = true;
  }
}


function isCollision(head) {
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}


function isTouchingObstacle(head) {
  return obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y);
}


function changeDirection(e) {
  if (gameOver) return;

  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}


function draw() {
  clearCanvas();
  drawSnake();
  drawFruit();
  drawObstacles();

  if (gameOver) {
    gameOverScreen.style.display = "block";
    gameScore.textContent = score;
  }
}


function updateScore() {
  scoreValue.textContent = score;
}


function startGame() {
  snake = [
    { x: 50, y: 50 },
    { x: 40, y: 50 },
    { x: 30, y: 50 }
  ];
  score = 0;
  direction = "RIGHT";
  gameOver = false;
  generateObstacles();
  generateFruit();
  gameOverScreen.style.display = "none";
  playGame();
}


function playGame() {
  if (gameOver) return;

  moveSnake();
  draw();
  updateScore();
  setTimeout(playGame, speed);
}


playAgainBtn.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  document.getElementById("difficultySelection").style.display = "block";
  document.querySelector('.score').style.display = 'none';  

  canvas.style.display = "none";
});


exitBtn.addEventListener("click", () => {
  window.close();
});

document.addEventListener("keydown", changeDirection);

window.addEventListener('resize', function() {
    let canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth * 0.90;  
    canvas.height = canvas.width;  
});











