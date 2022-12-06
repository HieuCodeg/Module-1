const ROW = Number(prompt('Nhập số hàng'));
const COL = Number(prompt('Nhập số cột'));
const SIZE = 40;
const VALUE_EMPTY = 0;
const VALUE_X = 1;
const VALUE_O = 2;

function Cell(x,y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getCell = function() {
        var left = y * SIZE;
        var top = x * SIZE;
        var newCell = `<div id='cell${x}${y}' class='cell' onclick='play(${x},${y})'
                        style=' width:${SIZE}px; height:${SIZE}px; left:${left}px; top:${top}px;
                        position: absolute; line-height:${SIZE}px'></div>`;
        return newCell;
    }

}
function main(row,col,id) {
    this.row = row;
    this.col = col;
    this.id = id;
    this.turn = false;
    this.chessBoard=[];
    this.player = VALUE_X;
    this.draw = function() {
        var gameBoard = document.getElementById(id);
        gameBoard.innerHTML = '';
        for (let i = 0; i< row; i++) {
            var rowChess=[];
            for (let j = 0; j < col ; j++) {
                var cell = new Cell(i,j);
                rowChess.push(cell);
                gameBoard.innerHTML += cell.getCell();
            }
            this.chessBoard.push(rowChess);
        }
    }
    this.play = function(x,y) {
        if (this.turn) {
            return;
        }
        var cell = this.chessBoard[x][y];
        if (cell.value == VALUE_EMPTY) {
            var cellDiv = document.getElementById(`cell${x}${y}`);
            switch (this.player) {
                case VALUE_X: 
                    cellDiv.classList.add('redText');
                    cellDiv.innerHTML = "X";
                    cell.value = VALUE_X;
                    break;
                case VALUE_O:
                    cellDiv.innerHTML = "O";
                    cell.value = VALUE_O;
                    break;
            }
            if (this.player == VALUE_X) {
                this.player = VALUE_O;
            } else {
                this.player = VALUE_X;
            }
            this.check(x,y);
        } else {
            alert('Ô đã nhập');
        }
        
    }
    this.check = function(x,y) {
        var cellTest = this.chessBoard[x][y].value;
        var cell = this.chessBoard;
        // hang doc
        var dem = 1;
        var i = 1;
        while (x + i < this.col && cellTest == cell[x+i][y].value) {
            dem++;
            i++;
        }
        var i = 1;
        while (x - i >=0 && cellTest == cell[x-i][y].value) {
            dem++;
            i++;
        }
        this.endGame(dem);
        // hang ngang
        var dem = 1;
        var i = 1;
        while (y + i < this.row && cellTest == cell[x][y+i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while (y - i >=0 && cellTest == cell[x][y-i].value) {
            dem++;
            i++
        }
        this.endGame(dem);
        // cheo trai
        var dem = 1;
        var i = 1;
        while (x+i < this.col && y+i < this.row && cellTest == cell[x+i][y+i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while (x-i >=0 && y-i >= 0 && cellTest == cell[x-i][y-i].value) {
            dem++;
            i++;
        }
        this.endGame(dem);
        // cheo phai
        var dem = 1;
        var i = 1;
        while (x-i >= 0 && y+i < this.row && cellTest == cell[x-i][y+i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while (x+i < this.col && y-i >= 0 && cellTest == cell[x+i][y-i].value) {
            dem++;
            i++;
        }
        this.endGame(dem);
    }
    this.endGame = function(dem) {
        if (dem >= 5) {
            if (this.player == VALUE_X) {
                alert('Person 2 won');
            } else {
                alert('Person 1 won');
            }
            this.turn = true;
        }
    }
}

function play(x,y) {
    game.play(x,y);
}
function start() {
    game = new main(ROW,COL,"mainBoard");
    game.draw();
}
start();

