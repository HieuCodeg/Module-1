const canvas = document.getElementById('gameSnake');
const ctx = canvas.getContext('2d');
let titleCount = 20;
let titleSize = titleCount -2;
let headX = 10;
let headY = 10;
let xvelocity = 0;
let yvelocity = 0;
let xFood = 5;
let yFood = 5;
let speed = 7;
const snakeParts = [];
let tailLength = 2;
let score = 0;
let check = true;
let boxMode;
const tingSound = new Audio('ting.mp3');
const overSound = new Audio('gameover.wav');
class snakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function playMode1() {
    boxMode = true;
    document.querySelector('#boxMode').classList.add('click');
    document.querySelector('#noBoxMode').classList.remove('click');
}
function playMode2() {
    boxMode = false;
    document.querySelector('#noBoxMode').classList.add('click');
    document.querySelector('#boxMode').classList.remove('click');
}

function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    
    clearScreen();
    drawSnake();
    drawFood();
    checkCollision();
    drawScore();
    check = true;
    setTimeout(drawGame,1000/speed);

}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * titleCount, part.y * titleCount, titleSize, titleSize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * titleCount, headY * titleCount, titleSize, titleSize);

}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(xFood * titleCount, yFood * titleCount, titleSize, titleSize);
}

function checkCollision() {
    if (xFood == headX && yFood == headY) {
        xFood = Math.floor(Math.random() * titleCount);
        yFood = Math.floor(Math.random() * titleCount);
        tailLength++;
        tingSound.play();
        score++;
        if (speed < 10) {
            speed += 0.1;
        }
    }
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '15px verdena';
    ctx.fillText("Score: " + score, canvas.clientWidth - 70, 15);
}

function isGameOver() {
    let gameOver = false;
    if (xvelocity == 0 && yvelocity ==0) {
        return false;
    }
    if (boxMode) {
        if (headX < 0) {
            gameOver = true;
        } else if (headX === titleCount) {
            gameOver = true;
        } else if (headY < 0) {
            gameOver = true;
        } else if (headY === titleCount) {
            gameOver = true;
        }
    }

    for (let i = 0; i < snakeParts.length ; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (gameOver) {
        overSound.play();
        document.querySelector('#gameSnake').classList.add('gameOver');
        ctx.fillStyle = 'white';
        ctx.font = '45px verdana';
        ctx.fillText('Game Over!', canvas.clientWidth/6.5, canvas.clientHeight/2);
    }
    return gameOver;
}
document.body.addEventListener('keydown',keyDown);
document.onkeydown = function(e) {
    if (e.which == 32 || e.which == 13 || e.which == 27) {
        document.location.reload();
    }
}

function keyDown(event) {
// move up
    if (boxMode == undefined) {
        alert('Please choose play mode first');
        return;
    }
    if (event.keyCode == 38) {
        if (yvelocity <= 0 && check) {
            xvelocity = 0;
            yvelocity = -1;
            check = false;
        }
    } else
// move down
    if (event.keyCode == 40) {
        if (yvelocity >= 0 && check) {
            xvelocity = 0;
            yvelocity = 1;
            check = false;
        }
    } else 
// move left
    if (event.keyCode == 37) {
        if (xvelocity <=0 && check) {
            xvelocity = -1;
            yvelocity = 0;
            check = false;
        }
    } else
// move down
    if (event.keyCode == 39) {
        if (xvelocity >= 0 && check) {
            xvelocity = 1;
            yvelocity = 0;
            check = false;
        }
    }
}

function changeSnakePosition() {
    headX += xvelocity;
    headY += yvelocity; 
    if (boxMode == false) {
        if (headX < 0) {
            headX = titleCount - 1;
         }
         if (headX > titleCount -1) {
             headX = 0;
         } 
         if (headY < 0) {
             headY = titleCount - 1;
         } 
         if (headY > titleCount -1) {
             headY = 0;
         }
    }
}
drawGame();