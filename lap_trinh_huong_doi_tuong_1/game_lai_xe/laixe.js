var canvas = document.getElementById('gameoto');
var ctx = canvas.getContext('2d');
var x = (canvas.width - 70)/2;
var y = canvas.height - 150;
var leftPressed = false;
var rightPressed = false;
var dx = 3;
var carWidth = 70;
var carHeight = 120;
var yLine = -500;
var xObstacle = xObstacle = Math.floor(Math.random()* (canvas.width - 200) ) + 50;
var yObstacle = 0;
var obHeight = 60;
var obWidth = 40;
var diem = 0;
var xXu = Math.floor(Math.random()* (canvas.width - 200) ) + 50;
var yXu = -60;
var xNuoc = Math.floor(Math.random()* (canvas.width - 300) ) + 60;
var yNuoc = -100;
var dy = 1;
var kiemtra = 0;

document.onkeydown = function(e) {
    if (e.which == 37 ) {
        leftPressed = true;
        document.getElementById('demo').play();
    } else if (e.which == 39) {
        rightPressed = true;
    }
    if (e.which == 32 || e.which == 13 || e.which == 27) {
        document.location.reload();
    }
    if (e.which == 17) {
        dy ++;
    }
    
}

document.onkeyup = function(e) {
    if (e.which == 37 ) {
        leftPressed = false;
    } else if (e.which == 39) {
        rightPressed = false;
    }
}
var img = new Image();
img.onload = drawCar();
function drawCar() {
    ctx.drawImage(img, x, y, carWidth, carHeight);
    img.src = 'car.png';
}
var img1 = new Image();
img1.onload = drawXu();
function drawXu() {
    ctx.drawImage(img1, xXu, yXu,60,60);
    img1.src = 'xu.png';
}
var img2 = new Image();
img2.onload = drawNuoc();
function drawNuoc() {
    ctx.drawImage(img2, xNuoc, yNuoc,60,60);
    img2.src = 'nuoc.png';
}
function drawLine() {
    ctx.beginPath();
    ctx.setLineDash([20,20]);
    ctx.lineWidth = 3;
    ctx.moveTo(500,yLine);
    ctx.lineTo(500,500);
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([30,30]);
    ctx.lineWidth = 30;
    ctx.moveTo(50,yLine);
    ctx.lineTo(50,500);
    ctx.strokeStyle = '#f6f5f8';
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([30,30]);
    ctx.lineWidth = 30;
    ctx.moveTo(canvas.width - 50,yLine);
    ctx.lineTo(canvas.width - 50,500);
    ctx.strokeStyle = '#f6f5f8';
    ctx.stroke();
    ctx.closePath();
}
function drawObstacle () {
    
    ctx.beginPath();
    ctx.moveTo(xObstacle, yObstacle);
    ctx.lineTo(xObstacle + obWidth,yObstacle - obHeight);
    ctx.lineTo(xObstacle + obWidth *2,yObstacle);
    ctx.lineWidth = 5;
    ctx.fillStyle = "#eded0b";
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fillStyle = "black"
    ctx.fillText("!",xObstacle + 35,yObstacle - 12,50);
}
function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = '#ed0b62';
    ctx.fillText("Score: " + diem,70,50);
}

function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawLine();
    drawObstacle ();
    drawScore();
    drawXu();
    drawNuoc();
    drawCar();
    if (leftPressed && x >= 0) {
        x -= dx;
    } else if (rightPressed && x < canvas.width - carWidth) {
        x += dx;
    }
    if (x >= xObstacle - carWidth && x <= xObstacle + obWidth*2 && yObstacle >= y) {
            ctx.font = "30px Arial";
            ctx.fillStyle = 'red';
            ctx.fillText("Game over",420,150);
            ctx.font = "20px Arial";
            ctx.fillStyle = '#47ed0b';
            ctx.fillText("Please press 'Space' to play again",320,180);
            document.getElementById("gameoto").classList.add("over");
            document.querySelector('#gameOver').play();
            document.getElementById("demo").pause();
            clearInterval(interval);
    } else {
        if (yLine < 0) {
            yLine += dy;
        } else {
            yLine = -500;
        }
        if (yObstacle < canvas.height) {
            yObstacle += dy;
        } else {
            yObstacle = 0;
            xObstacle = Math.floor(Math.random()* (canvas.width - 200) ) + 50;
            if (kiemtra >= 5) {
                dy += 0.5;
                kiemtra = 0;
            }
            kiemtra++;
        }
        if (yXu < canvas.height) {
            yXu += dy;
        } else {
            yXu = -60;
            xXu = Math.floor(Math.random()* (canvas.width - 200) ) + 50;
        }
        if (yNuoc < canvas.height) {
            yNuoc += dy;
        } else {
            yNuoc = -100;
            xNuoc = Math.floor(Math.random()* (canvas.width - 300) ) + 60;
        }
        if ( x >= xXu - carWidth && x <= xXu + 60 && yXu + 50 >= y) {
            diem++;
            document.querySelector('#dongXu').play();
            yXu = -80;
        }
        if ( x >= xNuoc - carWidth && x <= xNuoc + 60 && yNuoc + 50 >= y) {
            diem++;
            document.querySelector('#dongXu').play();
            yNuoc = -100;
        }
    }
}
var interval = setInterval(draw,10);




