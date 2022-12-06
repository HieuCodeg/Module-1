const HANG = 10;
const COT = 10;
const SIZEO = 40;
const VALUE_X = 2;
const VALUE_O = 3;
const VALUE_EMPTY = 1;
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getHtml =function(){
        var left = x * SIZEO;
        var top = y * SIZEO;
        var cellMau =`<div id="cell_${x}_${y}" onclick="play(${x},${y})" class="cell" 
        style="position: absolute; width:${SIZEO}px; 
        height:${SIZEO}px; left:${left}px; top:${top}px; 
        line-height:${SIZEO}px;"></div>`;
        return cellMau;
    }
    this.draw = function() {
        let cellId = document.getElementById(`cell_${x}_${y}`);
        switch (this.value) {
            case VALUE_X: {
                cellId.innerHTML = "X";
                break;
            }
            case VALUE_O: {
                cellId.innerHTML = "O";
                break;
            }
            default: {
                cellId.innerHTML = "";
                break;
            }
        }
    }
}

function Main(hang, cot, id) {
    this.hang = hang;
    this.cot = cot;
    this.id = id;
    this.nguoichoi = VALUE_X;
    this.kiemtra = false;
    this.mang = [];
    this.draw = function() {
        var manhinh = document.getElementById(this.id);
        manhinh.innerHTML = '';
        for (var i = 0; i < this.hang; i++) {
            let row = [];
            for (var j = 0; j < this.cot; j++) {
                var cell = new Cell(i,j);
                row.push(cell);
                manhinh.innerHTML += cell.getHtml();
            }
            this.mang.push(row);
        }
    }
    this.play = function(x,y) {
        if (this.kiemtra) {
            return;
        }
        var cell = this.mang[x][y];
        if (cell.value === VALUE_EMPTY) {
            cell.value = this.nguoichoi;
            cell.draw();
            this.check(x,y);
            if (this.nguoichoi === VALUE_X) {
                this.nguoichoi = VALUE_O;
            } else {
                this.nguoichoi = VALUE_X;
            }
        } else {
            alert("Ô đã nhập");
        }
    }
    this.check = function(x, y) {
        var cell = this.mang[x][y];
        var i = 1;
        var who = cell.value;
        while (( y + i < this.cot) && cell.value === this.mang[x][y + i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while ((y - i >=0) && cell.value === this.mang[x][y - i].value) {
            dem++;
            i++;
        }
        this.end(dem);
        
        var i = 1;
        var dem = 1;
        while (( x + i < this.hang) && cell.value === this.mang[x + i][y].value) {
            dem++;
            i++;
        }
        var i =1;
        while ((x - i >=0) && cell.value === this.mang[x - i][y].value) {
            dem++;
            i++;
        }
        this.end(dem);

        var i = 1;
        var dem = 1;
        while ((x + i < this.hang) && (y + i < this.cot) && cell.value === this.mang[x+i][y+i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while ((x - i >= 0) && (y - i >= 0) && cell.value === this.mang[x-i][y-i].value) {
            dem++;
            i++;
        }
        this.end(dem);

        var i = 1;
        var dem = 1;
        while ((x - i >= 0) && (y + i < this.cot) && cell.value === this.mang[x-i][y+i].value) {
            dem++;
            i++;
        }
        var i = 1;
        while ((y - i >= 0) && (x + i < this.hang) && cell.value === this.mang[x+i][y-i].value) {
            dem++;
            i++;
        }
        this.end(dem);

    }
    this.end = function(dem) {
        if (dem >= 5) {
            this.kiemtra = true;
            if (this.nguoichoi == VALUE_O) {
                ketqua = "người chơi 2 thắng";
            } else {
                ketqua = "người chơi 1 thắng";
            }
            alert(ketqua);
        }
    }

}
function play(x,y) {
    game.play(x,y);
}
function start() {
    game = new Main(HANG, COT, 'gamecaro');
    game.draw();
}
start();