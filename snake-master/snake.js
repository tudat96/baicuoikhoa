//board
var blockSize = 25
var rows = 20
var cols = 20
var board
var context

//snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

var snakeBody = []

//food
var foodX
var foodY

var gameOver = false

window.onload = function () {
  board = document.getElementById("board")
  board.height = rows * blockSize
  board.width = cols * blockSize
  context = board.getContext("2d") //used for drawing on the board

  placeFood()
  document.addEventListener("keyup", changeDirection)
  // update();
  setInterval(update, 200) //100 milliseconds
}

function update() {
  if (gameOver) {
    return
  }

  context.fillStyle = "black"
  context.fillRect(0, 0, board.width, board.height)

  context.fillStyle = "red"
  context.fillRect(foodX, foodY, blockSize, blockSize)

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY])
    placeFood()
  } // eat food and push to snake body

  // update new location of snake
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY]
  }

  // render new location of snake on the board
  context.fillStyle = "lime"
  // let snake head moving
  snakeX += velocityX * blockSize
  snakeY += velocityY * blockSize
  context.fillRect(snakeX, snakeY, blockSize, blockSize)
  // let snake body moving
  for (const element of snakeBody) {
    context.fillRect(element[0], element[1], blockSize, blockSize)
  }

  // game over conditions - check if snake move out of the board
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true
    alert("Game Over")
  }

  // check if snake eating itself
  for (const element of snakeBody) {
    if (snakeX == element[0] && snakeY == element[1]) {
      gameOver = true
      alert("Game Over")
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0
    velocityY = -1
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0
    velocityY = 1
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1
    velocityY = 0
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1
    velocityY = 0
  }
}

function placeFood() {
  //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
  foodX = Math.floor(Math.random() * cols) * blockSize
  foodY = Math.floor(Math.random() * rows) * blockSize
}
