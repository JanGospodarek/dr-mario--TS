var Game = /** @class */ (function () {
    function Game() {
        this.boardCon = document.getElementById('board');
        this.renderBoard();
        this.renderPionek();
    }
    Game.prototype.renderBoard = function () {
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 8; x++) {
                var div = document.createElement('div');
                div.classList.add('cell');
                div.style.left = "".concat(20 * x, "px");
                div.style.top = "".concat(20 * y, "px");
                this.boardCon.append(div);
            }
        }
    };
    Game.prototype.renderPionek = function () {
        var pionek = new Pionek(this.boardCon);
    };
    return Game;
}());
var Pionek = /** @class */ (function () {
    function Pionek(boardDiv) {
        this.boardDiv = boardDiv;
        this.buildPionek();
        this.moving();
    }
    Pionek.prototype.buildPionek = function () {
        this.pionek = document.createElement('div');
        var cell1 = document.createElement('div');
        var cell2 = document.createElement('div');
        cell1.style.backgroundColor = 'red';
        cell2.style.backgroundColor = 'blue';
        this.pionek.classList.add('pionek');
        cell1.classList.add('pionek-cell');
        cell2.classList.add('pionek-cell');
        this.pionek.append(cell1);
        this.pionek.append(cell2);
        this.pionek.style.left = '60px';
        this.boardDiv.append(this.pionek);
    };
    Pionek.prototype.moving = function () {
        var _this = this;
        var i = 0;
        this.movingInterval = setInterval(function () {
            console.log(20 * _this.movingInterval);
            _this.pionek.style.top = "".concat(20 * i, "px");
            i++;
        }, 400);
    };
    return Pionek;
}());
var game = new Game();
