var Game = /** @class */ (function () {
    function Game() {
        this.boardCon = document.getElementById("board");
        this.renderBoard();
        this.renderPionek();
    }
    Game.prototype.renderBoard = function () {
        for (var y = 0; y < 15; y++) {
            for (var x = 0; x < 8; x++) {
                var div = document.createElement("div");
                div.classList.add("cell");
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
        this.manualMovingDown = false;
        this.boardDiv = boardDiv;
        this.buildPionek();
        this.moving();
        this.addControls();
    }
    Pionek.prototype.buildPionek = function () {
        this.pionek = document.createElement("div");
        var cell1 = document.createElement("div");
        var cell2 = document.createElement("div");
        cell1.style.backgroundColor = "red";
        cell2.style.backgroundColor = "blue";
        this.pionek.classList.add("pionek");
        cell1.classList.add("pionek-cell");
        cell2.classList.add("pionek-cell");
        this.pionek.append(cell1);
        this.pionek.append(cell2);
        this.pionek.style.left = "60px";
        this.boardDiv.append(this.pionek);
    };
    Pionek.prototype.moving = function () {
        var _this = this;
        // let i = +this.pionek.style.top.split("p")[0] / 20;
        this.movingInterval = setInterval(function () {
            if (_this.manualMovingDown)
                return;
            var y = 20 + Number(_this.pionek.style.top.split("p")[0]);
            var x = +_this.pionek.style.left.split("p")[0];
            if (_this.chechForBorderCollisions(x, y, true)) {
                clearInterval(_this.movingInterval);
                return;
            }
            _this.pionek.style.top = "".concat(y, "px");
            //   i++;
        }, 400);
    };
    Pionek.prototype.chechForBorderCollisions = function (x, y, autonomous) {
        console.log(x, y);
        if (autonomous) {
            if (y >= 300)
                return true;
        }
        else {
            if (x <= 0 || x >= 160 || y >= 300)
                return true;
        }
    };
    Pionek.prototype.addControls = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            var key = e.key;
            var x = +_this.pionek.style.left.split("p")[0];
            var y = +_this.pionek.style.top.split("p")[0];
            switch (key) {
                case "ArrowLeft":
                    if (!_this.chechForBorderCollisions(x, y, false))
                        _this.pionek.style.left = "".concat(x - 20, "px");
                    break;
                case "ArrowRight":
                    if (!_this.chechForBorderCollisions(x + 40, y, false))
                        _this.pionek.style.left = "".concat(x + 20, "px");
                    break;
                case "ArrowDown":
                    if (!_this.chechForBorderCollisions(x, y + 20, false)) {
                        _this.manualMovingDown = true;
                        _this.pionek.style.top = "".concat(y + 20, "px");
                    }
                    break;
            }
        });
        document.addEventListener("keyup", function (e) {
            if (e.key == "ArrowDown")
                _this.manualMovingDown = false;
        });
    };
    return Pionek;
}());
var game = new Game();
