var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.boardCon = document.getElementById("board");
        this.pionks = [];
        this.renew = function () {
            _this.renderPionek();
        };
        this.checkBorderPionks = function (pos, rotation) {
            var xLeft, xRight, y;
            if (rotation == 90 || rotation == 270) {
            }
            else {
                xLeft = pos.x - 20;
                xRight = pos.x + 20;
                y = pos.y + 20;
            }
            // const index=this.pionks.findIndex(el=>(el.position.x==xLeft||el.position.x==xRight)&&el.position.y==y)
            var index = null;
            _this.pionks.forEach(function (el, i) {
                if ((el.position.x == xRight ||
                    el.position.x == xLeft ||
                    el.position.x == pos.x) &&
                    el.position.y == y) {
                    index = i;
                }
            });
            if (index != null)
                return true;
            else
                return false;
        };
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
        var pionek = new Pionek(this.boardCon, this.renew, this.checkBorderPionks);
        this.pionks.push(pionek);
    };
    return Game;
}());
var Pionek = /** @class */ (function () {
    function Pionek(boardDiv, renew, checkBorderPionks) {
        this.possibleColors = [
            "#BB8FCE",
            "#85C1E9",
            "#F7DC6F",
            "#F1948A",
            "#E59866",
        ];
        this.stop = false;
        this.manualMovingDown = false;
        ///
        this.position = { x: 60, y: 0 };
        this.rotation = 0;
        this.boardDiv = boardDiv;
        this.buildPionek();
        this.moving();
        this.addControls();
        this.renewGame = renew;
        this.checkBorderPionks = checkBorderPionks;
    }
    Pionek.prototype.getColor = function (except) {
        var i = Math.floor(Math.random() * 5);
        while (i == except) {
            i = Math.floor(Math.random() * 5);
        }
        return i;
    };
    Pionek.prototype.buildPionek = function () {
        this.pionek = document.createElement("div");
        this.pionek.classList.add("pionek");
        var fristColor = null;
        for (var index = 0; index < 2; index++) {
            var cell1 = document.createElement("div");
            var colorIndex = this.getColor(fristColor);
            fristColor = colorIndex;
            cell1.style.backgroundColor = this.possibleColors[colorIndex];
            cell1.classList.add("pionek-cell");
            this.pionek.append(cell1);
        }
        this.pionek.style.left = "60px";
        this.boardDiv.append(this.pionek);
    };
    Pionek.prototype.moving = function () {
        var _this = this;
        this.movingInterval = setInterval(function () {
            if (_this.manualMovingDown)
                return;
            var y = 20 + Number(_this.pionek.style.top.split("p")[0]);
            if (_this.chechForBorderCollisions(undefined, y, true)) {
                clearInterval(_this.movingInterval);
                _this.renewGame();
                return;
            }
            _this.position.y = y;
            _this.pionek.style.top = "".concat(y, "px");
        }, 400);
    };
    Pionek.prototype.chechForBorderCollisions = function (x, y, autonomous) {
        if (this.checkBorderPionks(this.position, this.rotation)) {
            console.log("PIONEK!!!!");
            this.stop = true;
            return true;
        }
        if (autonomous) {
            if (y >= 300) {
                this.stop = true;
                return true;
            }
        }
        else {
            if (x <= 0 || x >= 160) {
                return true;
            }
            else if (y >= 300) {
                this.stop = true;
                return true;
            }
        }
    };
    Pionek.prototype.rotate = function () {
        var prevRot = this.rotation;
        if (prevRot == 360)
            this.rotation = 0;
        this.rotation += 90;
        if (this.rotation == 270 || this.rotation == 90) {
            this.position.x += 10;
            this.position.y -= 10;
            this.pionek.style.left = "".concat(this.position.x, "px");
            this.pionek.style.top = "".concat(this.position.y, "px");
        }
        if (this.rotation == 180 || this.rotation == 360) {
            this.position.x -= 10;
            this.position.y += 10;
            this.pionek.style.top = "".concat(this.position.y, "px");
            this.pionek.style.left = "".concat(this.position.x, "px");
        }
        this.pionek.style.transform = "rotate(".concat(this.rotation, "deg)");
    };
    Pionek.prototype.addControls = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (_this.stop)
                return;
            var key = e.key;
            var x = +_this.pionek.style.left.split("p")[0];
            var y = +_this.pionek.style.top.split("p")[0];
            switch (key) {
                case "ArrowLeft":
                    if (!_this.chechForBorderCollisions(x, y, false)) {
                        var span = x - 20;
                        _this.pionek.style.left = "".concat(span, "px");
                        _this.position.x = span;
                    }
                    break;
                case "ArrowRight":
                    if (!_this.chechForBorderCollisions(x + 40, y, false)) {
                        var span = x + 20;
                        _this.pionek.style.left = "".concat(span, "px");
                        _this.position.x = span;
                    }
                    break;
                case "ArrowDown":
                    if (!_this.chechForBorderCollisions(x, y + 20, false)) {
                        _this.manualMovingDown = true;
                        var span = y + 20;
                        _this.pionek.style.top = "".concat(span, "px");
                        _this.position.y = span;
                    }
                    break;
                case "r":
                    _this.rotate();
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
