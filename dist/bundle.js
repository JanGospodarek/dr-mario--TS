/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Anim.ts":
/*!*********************!*\
  !*** ./src/Anim.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Anim\": () => (/* binding */ Anim)\n/* harmony export */ });\nvar Anim = /** @class */ (function () {\n    function Anim(img, ob, destId) {\n        // spritesheet\n        this.img = img;\n        this.ob = ob;\n        this.destId = destId;\n        this.tickNumber = 0; // aktualny tick (u mnie 60/s)\n        this.actFrame = 0; // aktualnie renderowana klatka\n        // id elementu w DOM'ie do wyświetlania klatek (u mnie przez css background-image)\n        ///// dane z json'a //////\n        this.frames = ob.frames; // tablica z klatkami\n        this.times = ob.times; // tablica z czasami wyświetleń klatki [u mnie czas w tick'ach]\n        this.repeat = ob.repeat; // czy animacja ma się powtarzać\n    }\n    Anim.prototype.renderFrame = function (i) {\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = 96;\n        canvas.height = 72;\n        var ctx = canvas.getContext(\"2d\");\n        ctx.drawImage(this.img, this.frames[i].x0, this.frames[i].y0, this.frames[i].w, this.frames[i].h, 0, 0, this.frames[i].w, this.frames[i].h);\n        var url = canvas.toDataURL();\n        var dest = document.getElementById(this.destId);\n        dest.style.backgroundImage = \"url('\" + url + \"')\";\n    };\n    Anim.prototype.goAnim = function () {\n        this.renderFrame(this.actFrame);\n        this.tickNumber++;\n        if (this.tickNumber == this.times[this.actFrame]) {\n            // rotacja klatek\n            this.tickNumber = 0;\n            this.actFrame++;\n        }\n        if (this.repeat && this.actFrame == this.frames.length)\n            this.actFrame = 0; //zapętlenie\n    };\n    return Anim;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Anim.ts?");

/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Pionek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pionek */ \"./src/Pionek.ts\");\n/* harmony import */ var _utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/genUniqueId */ \"./src/utils/genUniqueId.ts\");\n/* harmony import */ var _Anim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Anim */ \"./src/Anim.ts\");\n\n\n\nvar Game = /** @class */ (function () {\n    function Game() {\n        var _this = this;\n        this.boardCon = document.getElementById(\"board\");\n        this.curScoreCon = document.getElementById(\"cur-cont\");\n        this.bestScoreCon = document.getElementById(\"top-cont\");\n        this.viruses = {\n            red: document.getElementById(\"red\"),\n            blue: document.getElementById(\"blue\"),\n            yellow: document.getElementById(\"yellow\"),\n        };\n        this.CELL_WIDTH = 17;\n        this.score = 0;\n        this.bestScore = 0;\n        this.destId = \"board-img-cont\";\n        this.gameId = (0,_utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        this.pionks = [];\n        this.allCells = [];\n        this.cellsToDelete = [];\n        this.steps = [\n            \"first-step\",\n            \"second-step\",\n            \"third-step\",\n            \"fourth-step\",\n            \"fifth-step\",\n            \"sixth-step\",\n        ];\n        this.possibleColors = [\"red\", \"yellow\", \"blue\"];\n        this.checkCollisionsOnMove = function (x, y) {\n            var index = _this.allCells.findIndex(function (el) { return el.x == x && el.y == y && el.div !== null; });\n            if (index == -1)\n                return false;\n            else\n                return true;\n        };\n        this.renew = function (pionek) {\n            var _loop_1 = function (key) {\n                var c = pionek.cells[key];\n                var index = _this.allCells.findIndex(function (el) { return el.x == c.x && el.y == c.y; });\n                _this.allCells[index].x = c.x;\n                _this.allCells[index].y = c.y;\n                _this.allCells[index].color = c.color;\n                _this.allCells[index].div = c.div;\n            };\n            for (var key in pionek.cells) {\n                _loop_1(key);\n            }\n            _this.checkForZbicie(pionek);\n            _this.renderPionek();\n        };\n        this.checkBorderPionks = function (pionek) {\n            var wynik = false;\n            _this.allCells.forEach(function (element) {\n                for (var key in pionek.cells) {\n                    var pos = pionek.cells[key];\n                    if (pos.x == element.x &&\n                        pos.y + _this.CELL_WIDTH == element.y &&\n                        element.div !== null) {\n                        wynik = true;\n                    }\n                }\n            });\n            return wynik;\n        };\n        this.bestScore = +localStorage.getItem(\"best\");\n        fetch(\"./data/animations.json\")\n            .then(function (res) { return res.json(); })\n            .then(function (data) {\n            var imgsArray = [];\n            var anim = function () {\n                for (var i = 0; i < imgsArray.length; i++)\n                    imgsArray[i].goAnim();\n                window.requestAnimationFrame(anim);\n            };\n            _this.data = data;\n            _this.img = new Image();\n            _this.img.src = \"./img/spritesheet.png\";\n            _this.img.onload = function () {\n                _this.boardGraphicCoords = data.board.pos;\n                imgsArray.push(new _Anim__WEBPACK_IMPORTED_MODULE_2__.Anim(_this.img, data.blue, \"blue\"));\n                imgsArray.push(new _Anim__WEBPACK_IMPORTED_MODULE_2__.Anim(_this.img, data.yellow, \"yellow\"));\n                imgsArray.push(new _Anim__WEBPACK_IMPORTED_MODULE_2__.Anim(_this.img, data.red, \"red\"));\n                anim();\n                ////\n                _this.renderBoard();\n                _this.renderPionek();\n                _this.renderViruses(data);\n                _this.renderScore();\n                _this.renderScore();\n                _this.animateViruses();\n            };\n        });\n    }\n    Game.prototype.renderBoard = function () {\n        for (var y = 0; y < 15; y++) {\n            for (var x = 0; x < 8; x++) {\n                var div = document.createElement(\"div\");\n                div.classList.add(\"cell\");\n                div.style.left = \"\".concat(this.CELL_WIDTH * x, \"px\");\n                div.style.top = \"\".concat(this.CELL_WIDTH * y, \"px\");\n                this.allCells.push({\n                    x: this.CELL_WIDTH * x,\n                    y: this.CELL_WIDTH * y,\n                    color: \"none\",\n                    div: null,\n                    flag: \"normal\",\n                });\n                this.boardCon.append(div);\n            }\n        }\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = this.boardGraphicCoords.w;\n        canvas.height = this.boardGraphicCoords.h;\n        var ctx = canvas.getContext(\"2d\");\n        //prettier-ignore\n        ctx.drawImage(this.img, this.boardGraphicCoords.x0, this.boardGraphicCoords.y0, this.boardGraphicCoords.w, this.boardGraphicCoords.h, 0, 0, this.boardGraphicCoords.w, this.boardGraphicCoords.h);\n        var url = canvas.toDataURL();\n        var dest = document.getElementById(this.destId);\n        dest.style.backgroundImage = \"url('\" + url + \"')\";\n    };\n    Game.prototype.renderPionek = function () {\n        //prettier-ignore\n        var pionek = new _Pionek__WEBPACK_IMPORTED_MODULE_0__.Pionek(this.boardCon, this.checkBorderPionks, this.renew, this.checkCollisionsOnMove, this.data, this.img);\n        this.pionks.push(pionek);\n    };\n    Game.prototype.renderViruses = function (data) {\n        var _this = this;\n        var indexes = [];\n        while (indexes.length < 3) {\n            var index = 40 + Math.floor(Math.random() * 60);\n            if (indexes.indexOf(index) === -1)\n                indexes.push(index);\n        }\n        indexes.forEach(function (index, i) {\n            var div = document.createElement(\"div\");\n            div.classList.add(\"cell\");\n            div.style.left = \"\".concat(_this.allCells[index].x, \"px\");\n            div.style.top = \"\".concat(_this.allCells[index].y, \"px\");\n            var url = _this.getBackgroundUrlVirus(data, _this.possibleColors[i]);\n            div.style.backgroundImage = \"url('\" + url + \"')\";\n            _this.boardCon.append(div);\n            _this.allCells[index].flag = \"virus\";\n            _this.allCells[index].color = _this.possibleColors[i];\n            _this.allCells[index].div = div;\n        });\n    };\n    Game.prototype.animateViruses = function () {\n        var _this = this;\n        var iterator = 1;\n        var i = setInterval(function () {\n            if (iterator == 7)\n                iterator = 1;\n            for (var key in _this.viruses) {\n                var virus = _this.viruses[key];\n                var newClass = _this.steps[iterator];\n                var oldClass = _this.steps[iterator - 1];\n                if (_this.steps[iterator - 1] == \"sixth-step\") {\n                    newClass = _this.steps[0];\n                }\n                virus.classList.replace(oldClass, newClass);\n            }\n            iterator++;\n        }, 2000);\n    };\n    Game.prototype.checkIfVirusWasKilled = function () {\n        var indexOfVirus = this.cellsToDelete.findIndex(function (el) { return el.flag == \"virus\"; });\n        if (indexOfVirus !== -1) {\n            var virusCell = this.cellsToDelete[indexOfVirus];\n            this.viruses[virusCell.color].style.display = \"none\";\n            this.score += 100;\n            if (this.score > this.bestScore)\n                this.bestScore = this.score;\n            localStorage.setItem(\"best\", String(this.score));\n            this.renderScore();\n        }\n    };\n    Game.prototype.renderScore = function () {\n        var curStr = String(this.score).padStart(8, \"0\");\n        var bestStr = String(this.bestScore).padStart(8, \"0\");\n        this.renderScoreHelper(curStr, this.curScoreCon);\n        this.renderScoreHelper(bestStr, this.bestScoreCon);\n    };\n    Game.prototype.renderScoreHelper = function (str, place) {\n        var _this = this;\n        var canvas = document.createElement(\"canvas\");\n        var ctx = canvas.getContext(\"2d\");\n        canvas.width = 300;\n        canvas.height = 23;\n        str.split(\"\").forEach(function (letter, i) {\n            var pos = _this.data.numbers.pos[Number(letter)];\n            //prettier-ignore\n            ctx.drawImage(_this.img, pos.x0, pos.y0, pos.w, pos.h, i * 24, 0, pos.w, pos.h);\n        });\n        var url = canvas.toDataURL();\n        place.style.backgroundImage = \"url('\" + url + \"')\";\n    };\n    Game.prototype.checkForZbicie = function (pionek) {\n        var _this = this;\n        var checkInRow = function (element, vectorX, vectorY) {\n            _this.cellsToDelete = [element];\n            var bool = true;\n            var _loop_3 = function (index) {\n                var l = _this.allCells.findIndex(function (el) {\n                    return el.x == element.x - vectorX * index &&\n                        el.y == element.y - vectorY * index;\n                });\n                if (l == -1) {\n                    bool = false;\n                    return \"break\";\n                }\n                if (_this.allCells[l].div == null) {\n                    bool = false;\n                    return \"break\";\n                }\n                if (_this.allCells[l].color !== element.color) {\n                    bool = false;\n                    return \"break\";\n                }\n                _this.cellsToDelete.push(_this.allCells[l]);\n            };\n            for (var index = 1; index < 4; index++) {\n                var state_1 = _loop_3(index);\n                if (state_1 === \"break\")\n                    break;\n            }\n            return bool;\n        };\n        var _loop_2 = function (key) {\n            var obj = pionek.cells[key];\n            var indexLeft = this_1.allCells.findIndex(function (el) { return el.x == obj.x - _this.CELL_WIDTH && el.y == obj.y; });\n            var indexTop = this_1.allCells.findIndex(function (el) { return el.x == obj.x && el.y == obj.y - _this.CELL_WIDTH; });\n            var indexRight = this_1.allCells.findIndex(function (el) { return el.x == obj.x + _this.CELL_WIDTH && el.y == obj.y; });\n            var indexBottom = this_1.allCells.findIndex(function (el) { return el.x == obj.x && el.y == obj.y + _this.CELL_WIDTH; });\n            var indexes = [indexLeft, indexRight, indexTop, indexBottom];\n            ////////////\n            indexes.forEach(function (element, i) {\n                if (element == -1)\n                    return;\n                var cellObj = _this.allCells[element];\n                if (cellObj.div == null)\n                    return;\n                var vectorX = obj.x - cellObj.x;\n                var vectorY = obj.y - cellObj.y;\n                if (checkInRow(obj, vectorX, vectorY)) {\n                    console.log(\"znaleziono!\", obj.color);\n                    _this.checkIfVirusWasKilled();\n                    _this.cellsToDelete.forEach(function (cell) {\n                        var index = _this.allCells.findIndex(function (el) { return el.x == cell.x && el.y == cell.y; });\n                        var cellToDelete = _this.allCells[index];\n                        cellToDelete.div.style.display = \"none\";\n                        cellToDelete.div.remove();\n                        cellToDelete.div = null;\n                        cellToDelete.color = \"none\";\n                        cellToDelete.flag = \"zbite\";\n                        console.log(cellToDelete);\n                        _this.spadamyPanowie();\n                    });\n                }\n            });\n        };\n        var this_1 = this;\n        for (var key in pionek.cells) {\n            _loop_2(key);\n        }\n    };\n    Game.prototype.spadamyPanowie = function () {\n        // let opadlo;\n        // const opadanie = () => {\n        //   opadlo = false;\n        //   for (let index = this.allCells.length - 1; index > 0; index--) {\n        //     const cell: Cell = this.allCells[index];\n        //     if (cell.div == null) continue;\n        //     const indexBelow = this.allCells.findIndex(\n        //       (el) => el.x == cell.x && el.y - 20 == cell.y\n        //     );\n        //     if (indexBelow == -1) continue;\n        //     const cellBellow = this.allCells[indexBelow];\n        //     if (cellBellow.flag == \"zbite\") {\n        //       //zejdz w dol\n        //       console.log(\";c\");\n        //       // cell.flag = \"normal\";\n        //       cellBellow.flag = \"normal\";\n        //       cellBellow.color = cell.color;\n        //       cell.color = \"none\";\n        //       cellBellow.div = cell.div;\n        //       cell.div = null;\n        //       opadlo = true;\n        //     }\n        //     if (opadlo) {\n        //       opadanie();\n        //     } else {\n        //       //update interface\n        //       this.reRender();\n        //     }\n        //   }\n        // };\n        // opadanie();\n    };\n    // private reRender() {\n    //   this.allCells.forEach((cell) => {\n    //     if (cell.div == null) return;\n    //     cell.div.style.top = cell.x + \"px\";\n    //   });\n    // }\n    Game.prototype.getBackgroundUrlVirus = function (data, color) {\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = 15;\n        canvas.height = 15;\n        var ctx = canvas.getContext(\"2d\");\n        //prettier-ignore\n        var firtsLetter = color[0].toUpperCase();\n        var arr = color.split(\"\");\n        arr.shift();\n        arr.unshift(firtsLetter);\n        console.log(data.virusRed);\n        ctx.drawImage(this.img, data[\"virus\".concat(arr.join(\"\"))].pos.x0, data[\"virus\".concat(arr.join(\"\"))].pos.y0, data[\"virus\".concat(arr.join(\"\"))].pos.w, data[\"virus\".concat(arr.join(\"\"))].pos.h, 0, 0, data[\"virus\".concat(arr.join(\"\"))].pos.w, data[\"virus\".concat(arr.join(\"\"))].pos.h);\n        var url = canvas.toDataURL();\n        return url;\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/Pionek.ts":
/*!***********************!*\
  !*** ./src/Pionek.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pionek\": () => (/* binding */ Pionek)\n/* harmony export */ });\n/* harmony import */ var _utils_genUniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/genUniqueId */ \"./src/utils/genUniqueId.ts\");\n\nvar Pionek = /** @class */ (function () {\n    function Pionek(boardDiv, checkBorderPionks, renewGame, checkCollisionsOnMove, data, img) {\n        var _this = this;\n        this.boardDiv = boardDiv;\n        this.checkBorderPionks = checkBorderPionks;\n        this.renewGame = renewGame;\n        this.checkCollisionsOnMove = checkCollisionsOnMove;\n        this.data = data;\n        this.img = img;\n        this.btn = document.getElementById(\"stop\");\n        this.cells = {\n            left: { x: 51, y: 0, div: null, color: \"none\", flag: \"normal\" },\n            right: { x: 68, y: 0, div: null, color: \"none\", flag: \"normal\" },\n        };\n        this.possibleColors = [\"red\", \"yellow\", \"blue\"];\n        this.id = (0,_utils_genUniqueId__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        this.CELL_WIDTH = 17;\n        this.BOARD_WIDTH = 135;\n        this.BOARD_HEIGHT = 255;\n        this.stop = false;\n        this.manualMovingDown = false;\n        this.checkBordersOnRotation = function (x) {\n            if (x <= 0 || x >= _this.BOARD_WIDTH)\n                return false;\n            else\n                return true;\n        };\n        this.buildPionek();\n        this.moving();\n        this.addControls();\n        this.renderSkin();\n        ///development proposes\n        this.btn.addEventListener(\"click\", function () {\n            clearInterval(_this.movingInterval);\n        });\n    }\n    Pionek.prototype.getBackgroundUrl = function (direction, color) {\n        var canvas = document.createElement(\"canvas\");\n        canvas.width = 17;\n        canvas.height = 17;\n        var ctx = canvas.getContext(\"2d\");\n        var firtsLetter = color[0].toUpperCase();\n        var arr = color.split(\"\");\n        arr.shift();\n        arr.unshift(firtsLetter);\n        var pos = this.data[\"cell\".concat(arr.join(\"\"))];\n        ctx.drawImage(this.img, pos[direction].x0, pos[direction].y0, pos[direction].w, pos[direction].h, 0, 0, pos[direction].w, pos[direction].h);\n        var url = canvas.toDataURL();\n        return url;\n    };\n    Pionek.prototype.buildPionek = function () {\n        var fristColor = null;\n        for (var index = 0; index < 2; index++) {\n            var cell = document.createElement(\"div\");\n            var colorIndex = this.getColor();\n            cell.style.backgroundColor = this.possibleColors[colorIndex];\n            // cell.innerText = String(index);\n            cell.classList.add(\"pionek-cell\");\n            this.boardDiv.append(cell);\n            var key = \"\";\n            index == 0 ? (key = \"left\") : (key = \"right\");\n            cell.style.left = this.cells[key].x + \"px\";\n            cell.style.top = this.cells[key].y + \"px\";\n            this.cells[key].div = cell;\n            this.cells[key].color = this.possibleColors[colorIndex];\n        }\n    };\n    Pionek.prototype.getColor = function () {\n        return Math.floor(Math.random() * 3);\n    };\n    Pionek.prototype.moving = function () {\n        var _this = this;\n        this.movingInterval = setInterval(function () {\n            if (_this.manualMovingDown)\n                return;\n            //prettier-ignore\n            if (!_this.stop)\n                _this.updateBothCoordinates(undefined, _this.cells.left.y + _this.CELL_WIDTH, undefined, _this.cells.right.y + _this.CELL_WIDTH);\n            if (_this.checkBottomCollision()) {\n                clearInterval(_this.movingInterval);\n                _this.stop = true;\n                _this.renewGame(_this);\n                return;\n            }\n        }, 400);\n    };\n    Pionek.prototype.checkLeftCollision = function () {\n        var wynik1, wynik2 = false;\n        for (var key in this.cells) {\n            var cell = this.cells[key];\n            if (this.checkCollisionsOnMove(cell.x - this.CELL_WIDTH, cell.y)) {\n                wynik1 = true;\n            }\n        }\n        if (this.cells.left.x <= 0)\n            wynik2 = true;\n        return wynik1 || wynik2;\n    };\n    Pionek.prototype.checkRightCollision = function () {\n        var wynik1, wynik2 = false;\n        for (var key in this.cells) {\n            var cell = this.cells[key];\n            if (this.checkCollisionsOnMove(cell.x + this.CELL_WIDTH, cell.y)) {\n                wynik1 = true;\n            }\n        }\n        if (this.cells.left.x >= this.BOARD_WIDTH - this.CELL_WIDTH)\n            wynik2 = true;\n        return wynik1 || wynik2;\n    };\n    Pionek.prototype.checkBottomCollision = function () {\n        if (this.cells.left.y >= this.BOARD_HEIGHT - this.CELL_WIDTH ||\n            this.cells.right.y >= this.BOARD_HEIGHT - this.CELL_WIDTH ||\n            this.checkBorderPionks(this)) {\n            this.stop = true;\n            return true;\n        }\n        else {\n            return false;\n        }\n    };\n    Pionek.prototype.addControls = function () {\n        var _this = this;\n        document.addEventListener(\"keydown\", function (e) {\n            if (_this.stop)\n                return;\n            var key = e.key;\n            switch (key) {\n                case \"ArrowLeft\":\n                    // prettier-ignore\n                    if (_this.checkLeftCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x - _this.CELL_WIDTH, undefined, _this.cells.right.x - _this.CELL_WIDTH, undefined);\n                    if (_this.checkBottomCollision()) {\n                        clearInterval(_this.movingInterval);\n                        _this.stop = true;\n                        _this.renewGame(_this);\n                        return;\n                    }\n                    break;\n                case \"ArrowRight\":\n                    // prettier-ignore\n                    if (_this.checkRightCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x + _this.CELL_WIDTH, undefined, _this.cells.right.x + _this.CELL_WIDTH, undefined);\n                    if (_this.checkBottomCollision()) {\n                        clearInterval(_this.movingInterval);\n                        _this.stop = true;\n                        _this.renewGame(_this);\n                        return;\n                    }\n                    break;\n                case \"ArrowDown\":\n                    // prettier-ignore\n                    _this.manualMovingDown = true;\n                    if (_this.checkBottomCollision()) {\n                        _this.stop = true;\n                        break;\n                    }\n                    _this.updateBothCoordinates(undefined, _this.cells.left.y + _this.CELL_WIDTH, undefined, _this.cells.right.y + _this.CELL_WIDTH);\n                    break;\n                case \"r\":\n                    var xSpan = _this.cells.right.x - _this.cells.left.x;\n                    var ySpan = _this.cells.right.y - _this.cells.left.y;\n                    _this.rotate(xSpan, ySpan, \"r\");\n                    break;\n                case \"t\":\n                    var xSpanR = _this.cells.right.x - _this.cells.left.x;\n                    var ySpanR = _this.cells.right.y - _this.cells.left.y;\n                    _this.rotate(xSpanR, ySpanR, \"t\");\n                    break;\n            }\n        });\n        document.addEventListener(\"keyup\", function (e) {\n            if (e.key == \"ArrowDown\")\n                _this.manualMovingDown = false;\n        });\n    };\n    Pionek.prototype.rotate = function (xSpan, ySpan, letter) {\n        //refactor!\n        if (letter == \"r\") {\n            if (xSpan == this.CELL_WIDTH && ySpan == 0) {\n                //prettier-ignore\n                this.updateBothCoordinates(undefined, undefined, this.cells.left.x, this.cells.left.y - this.CELL_WIDTH);\n            }\n            if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.left.x + this.CELL_WIDTH, this.cells.left.y, this.cells.right.x, this.cells.right.y + this.CELL_WIDTH);\n            }\n            if (xSpan == -this.CELL_WIDTH && ySpan == 0) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.right.x, this.cells.right.y - this.CELL_WIDTH, undefined, undefined);\n            }\n            if (xSpan == 0 && ySpan == this.CELL_WIDTH) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.left.x, this.cells.left.y + this.CELL_WIDTH, this.cells.left.x + this.CELL_WIDTH, this.cells.right.y);\n            }\n        }\n        if (letter == \"t\") {\n            if (xSpan == this.CELL_WIDTH && ySpan == 0) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.right.x, this.cells.right.y - this.CELL_WIDTH, undefined, undefined);\n            }\n            if (xSpan == 0 && ySpan == -this.CELL_WIDTH) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.left.x - this.CELL_WIDTH, this.cells.left.y, this.cells.right.x, this.cells.right.y + this.CELL_WIDTH);\n            }\n            if (xSpan == -this.CELL_WIDTH && ySpan == 0) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.left.x, this.cells.left.y, this.cells.right.x + this.CELL_WIDTH, this.cells.left.y - this.CELL_WIDTH);\n            }\n            if (xSpan == 0 && ySpan == this.CELL_WIDTH) {\n                //prettier-ignore\n                this.updateBothCoordinates(this.cells.left.x, this.cells.right.y, this.cells.right.x - this.CELL_WIDTH, this.cells.right.y);\n            }\n        }\n    };\n    Pionek.prototype.renderSkin = function () {\n        if (this.cells.left.y === this.cells.right.y - 17) {\n            this.cells.left.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"top\", this.cells.left.color) + \"')\";\n            this.cells.right.div.style.backgroundImage =\n                \"url('\" +\n                    this.getBackgroundUrl(\"bottom\", this.cells.right.color) +\n                    \"')\";\n        }\n        if (this.cells.left.y === this.cells.right.y + 17) {\n            this.cells.left.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"bottom\", this.cells.left.color) + \"')\";\n            this.cells.right.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"top\", this.cells.right.color) + \"')\";\n        }\n        if (this.cells.left.x === this.cells.right.x - 17) {\n            this.cells.left.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"left\", this.cells.left.color) + \"')\";\n            this.cells.right.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"right\", this.cells.right.color) + \"')\";\n        }\n        if (this.cells.left.x === this.cells.right.x + 17) {\n            this.cells.left.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"right\", this.cells.left.color) + \"')\";\n            this.cells.right.div.style.backgroundImage =\n                \"url('\" + this.getBackgroundUrl(\"left\", this.cells.right.color) + \"')\";\n        }\n    };\n    Pionek.prototype.updateBothCoordinates = function (xLeft, yLeft, xRight, yRight) {\n        if (yLeft > this.BOARD_HEIGHT ||\n            yRight > this.BOARD_HEIGHT ||\n            xLeft < 0 ||\n            xLeft >= this.BOARD_WIDTH ||\n            xRight < 0 ||\n            xRight >= this.BOARD_WIDTH)\n            return;\n        if (yLeft !== undefined) {\n            this.cells.left.y = yLeft;\n            this.cells.left.div.style.top = yLeft + \"px\";\n        }\n        if (xLeft !== undefined) {\n            this.cells.left.x = xLeft;\n            this.cells.left.div.style.left = xLeft + \"px\";\n        }\n        if (yRight !== undefined) {\n            this.cells.right.y = yRight;\n            this.cells.right.div.style.top = yRight + \"px\";\n        }\n        if (xRight !== undefined) {\n            this.cells.right.x = xRight;\n            this.cells.right.div.style.left = xRight + \"px\";\n        }\n        this.renderSkin();\n    };\n    return Pionek;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Pionek.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n\nvar game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/utils/genUniqueId.ts":
/*!**********************************!*\
  !*** ./src/utils/genUniqueId.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction genUniqueId() {\n    var dateStr = Date.now().toString(36); // convert num to base 36 and stringify\n    var randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point\n    return \"\".concat(dateStr, \"-\").concat(randomStr);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (genUniqueId);\n\n\n//# sourceURL=webpack:///./src/utils/genUniqueId.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;