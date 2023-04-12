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

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Pionek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pionek */ \"./src/Pionek.ts\");\n\nvar Game = /** @class */ (function () {\n    function Game() {\n        var _this = this;\n        this.boardCon = document.getElementById(\"board\");\n        this.pionks = [];\n        this.allCells = [];\n        this.cellsToDelete = [];\n        this.renew = function (pionek) {\n            var _loop_1 = function (key) {\n                var c = pionek.cells[key];\n                var index = _this.allCells.findIndex(function (el) { return el.x == c.x && el.y == c.y; });\n                _this.allCells[index].x = c.x;\n                _this.allCells[index].y = c.y;\n                _this.allCells[index].color = c.color;\n                _this.allCells[index].div = c.div;\n            };\n            for (var key in pionek.cells) {\n                _loop_1(key);\n            }\n            _this.checkForZbicie(pionek);\n            _this.renderPionek();\n        };\n        this.checkBorderPionks = function (pionek) {\n            var wynik = false;\n            _this.pionks.forEach(function (element) {\n                for (var key in pionek.cells) {\n                    var pos = pionek.cells[key];\n                    if (pionek.id == element.id)\n                        return;\n                    if ((pos.x == element.cells.left.x || pos.x == element.cells.right.x) &&\n                        (pos.y == element.cells.left.y - 20 ||\n                            pos.y == element.cells.right.y - 20)) {\n                        wynik = true;\n                    }\n                }\n            });\n            return wynik;\n        };\n        this.renderBoard();\n        this.renderPionek();\n    }\n    Game.prototype.renderBoard = function () {\n        for (var y = 0; y < 15; y++) {\n            for (var x = 0; x < 8; x++) {\n                var div = document.createElement(\"div\");\n                div.classList.add(\"cell\");\n                // div.innerText = String(this.allCells.length);\n                div.style.left = \"\".concat(20 * x, \"px\");\n                div.style.top = \"\".concat(20 * y, \"px\");\n                this.allCells.push({\n                    x: 20 * x,\n                    y: 20 * y,\n                    color: \"none\",\n                    div: null,\n                });\n                this.boardCon.append(div);\n            }\n        }\n    };\n    Game.prototype.renderPionek = function () {\n        var pionek = new _Pionek__WEBPACK_IMPORTED_MODULE_0__.Pionek(this.boardCon, this.checkBorderPionks, this.renew);\n        this.pionks.push(pionek);\n    };\n    Game.prototype.checkForZbicie = function (pionek) {\n        var _this = this;\n        var checkInRow = function (element, vectorX, vectorY) {\n            _this.cellsToDelete = [element];\n            var bool = true;\n            var _loop_3 = function (index) {\n                var l = _this.allCells.findIndex(function (el) {\n                    return el.x == element.x - vectorX * index &&\n                        el.y == element.y - vectorY * index;\n                });\n                console.log(_this.allCells[l]);\n                if (l == -1) {\n                    bool = false;\n                    return \"break\";\n                }\n                if (_this.allCells[l].div == null) {\n                    bool = false;\n                    return \"break\";\n                }\n                if (_this.allCells[l].color !== element.color) {\n                    bool = false;\n                    return \"break\";\n                }\n                _this.cellsToDelete.push(_this.allCells[l]);\n            };\n            for (var index = 1; index < 3; index++) {\n                var state_1 = _loop_3(index);\n                if (state_1 === \"break\")\n                    break;\n            }\n            return bool;\n        };\n        var _loop_2 = function (key) {\n            var obj = pionek.cells[key];\n            var indexLeft = this_1.allCells.findIndex(function (el) { return el.x == obj.x - 20 && el.y == obj.y; });\n            var indexTop = this_1.allCells.findIndex(function (el) { return el.x == obj.x && el.y == obj.y - 20; });\n            var indexRight = this_1.allCells.findIndex(function (el) { return el.x == obj.x + 20 && el.y == obj.y; });\n            var indexBottom = this_1.allCells.findIndex(function (el) { return el.x == obj.x && el.y == obj.y + 20; });\n            var indexes = [indexLeft, indexRight, indexTop, indexBottom];\n            ////////////\n            indexes.forEach(function (element, i) {\n                if (element == -1)\n                    return;\n                var cellObj = _this.allCells[element];\n                if (cellObj.div == null)\n                    return;\n                var vectorX = obj.x - cellObj.x;\n                var vectorY = obj.y - cellObj.y;\n                console.log(element, \"index\", i, \"vectorx: \", vectorX, \"vectory: \", vectorY);\n                if (checkInRow(obj, vectorX, vectorY)) {\n                    console.log(\"znaleziono!\", obj.color);\n                    _this.cellsToDelete.forEach(function (cell) {\n                        cell.div.remove();\n                        cell.color = \"none\";\n                        cell.flag = \"zbite\";\n                        _this.spadamyPanowie();\n                    });\n                }\n            });\n        };\n        var this_1 = this;\n        for (var key in pionek.cells) {\n            _loop_2(key);\n        }\n    };\n    Game.prototype.spadamyPanowie = function () {\n        var _this = this;\n        var opadlo = false;\n        var opadanie = function () {\n            opadlo = false;\n            var _loop_4 = function (index) {\n                var cell = _this.allCells[index];\n                var indexBelow = _this.allCells.findIndex(function (el) { return el.x == cell.x && el.y - 20 == cell.y; });\n                if (indexBelow == -1)\n                    return { value: void 0 };\n                var cellBellow = _this.allCells[indexBelow];\n                if (cellBellow.flag == \"zbite\") {\n                    //zejdz w dol\n                    opadlo = true;\n                }\n                if (opadlo) {\n                    opadanie();\n                }\n                else {\n                    //update interface\n                }\n            };\n            for (var index = _this.allCells.length - 1; index > 0; index--) {\n                var state_2 = _loop_4(index);\n                if (typeof state_2 === \"object\")\n                    return state_2.value;\n            }\n        };\n        opadanie();\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/Pionek.ts":
/*!***********************!*\
  !*** ./src/Pionek.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pionek\": () => (/* binding */ Pionek)\n/* harmony export */ });\n/* harmony import */ var _utils_genUniqueId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/genUniqueId */ \"./src/utils/genUniqueId.ts\");\n\nvar Pionek = /** @class */ (function () {\n    function Pionek(boardDiv, checkBorderPionks, renewGame) {\n        var _this = this;\n        this.checkBorderPionks = checkBorderPionks;\n        this.renewGame = renewGame;\n        this.btn = document.getElementById(\"stop\");\n        this.id = (0,_utils_genUniqueId__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n        this.stop = false;\n        this.manualMovingDown = false;\n        this.possibleColors = [\n            \"#BB8FCE\",\n            \"#85C1E9\",\n            \"#F7DC6F\",\n            \"#F1948A\",\n            \"#E59866\",\n        ];\n        this.cells = {\n            left: { x: 60, y: 0, div: null, color: \"none\", flag: \"working\" },\n            right: { x: 80, y: 0, div: null, color: \"none\", flag: \"working\" },\n        };\n        this.boardDiv = boardDiv;\n        this.buildPionek();\n        this.moving();\n        this.addControls();\n        ///development proposes\n        this.btn.addEventListener(\"click\", function () {\n            clearInterval(_this.movingInterval);\n        });\n    }\n    Pionek.prototype.buildPionek = function () {\n        var fristColor = null;\n        for (var index = 0; index < 2; index++) {\n            var cell = document.createElement(\"div\");\n            var colorIndex = this.getColor(fristColor);\n            fristColor = colorIndex;\n            cell.style.backgroundColor = this.possibleColors[colorIndex];\n            cell.classList.add(\"pionek-cell\");\n            this.boardDiv.append(cell);\n            var key = \"\";\n            index == 0 ? (key = \"left\") : (key = \"right\");\n            cell.style.left = this.cells[key].x + \"px\";\n            cell.style.top = this.cells[key].y + \"px\";\n            this.cells[key].div = cell;\n            this.cells[key].color = this.possibleColors[colorIndex];\n        }\n    };\n    Pionek.prototype.getColor = function (except) {\n        var i = Math.floor(Math.random() * 5);\n        while (i == except) {\n            i = Math.floor(Math.random() * 5);\n        }\n        return i;\n    };\n    Pionek.prototype.moving = function () {\n        var _this = this;\n        this.movingInterval = setInterval(function () {\n            if (_this.manualMovingDown)\n                return;\n            if (!_this.stop) {\n                _this.updateBothCoordinates(undefined, _this.cells.left.y + 20, undefined, _this.cells.right.y + 20);\n            }\n            if (_this.checkBottomCollision()) {\n                clearInterval(_this.movingInterval);\n                _this.stop = true;\n                _this.renewGame(_this);\n                return;\n            }\n        }, 400);\n    };\n    Pionek.prototype.checkLeftCollision = function () {\n        if (this.cells.left.x <= 0)\n            return true;\n        else\n            return false;\n    };\n    Pionek.prototype.checkRightCollision = function () {\n        if (this.cells.right.x >= 140)\n            return true;\n        else\n            return false;\n    };\n    Pionek.prototype.checkBottomCollision = function () {\n        if (this.cells.left.y >= 280 ||\n            this.cells.right.y >= 280 ||\n            this.checkBorderPionks(this)) {\n            this.stop = true;\n            return true;\n        }\n        else {\n            return false;\n        }\n    };\n    Pionek.prototype.addControls = function () {\n        var _this = this;\n        document.addEventListener(\"keydown\", function (e) {\n            if (_this.stop)\n                return;\n            var key = e.key;\n            switch (key) {\n                case \"ArrowLeft\":\n                    // prettier-ignore\n                    if (_this.checkLeftCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x - 20, undefined, _this.cells.right.x - 20, undefined);\n                    break;\n                case \"ArrowRight\":\n                    // prettier-ignore\n                    if (_this.checkRightCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x + 20, undefined, _this.cells.right.x + 20, undefined);\n                    break;\n                case \"ArrowDown\":\n                    // prettier-ignore\n                    _this.manualMovingDown = true;\n                    if (_this.checkBottomCollision()) {\n                        _this.stop = true;\n                        break;\n                    }\n                    _this.updateBothCoordinates(undefined, _this.cells.left.y + 20, undefined, _this.cells.right.y + 20);\n                    break;\n                case \"r\":\n                    var xSpan = _this.cells.right.x - _this.cells.left.x;\n                    var ySpan = _this.cells.right.y - _this.cells.left.y;\n                    _this.rotate(xSpan, ySpan);\n                    break;\n                case \"t\":\n                    var xSpanR = _this.cells.left.x - _this.cells.right.x;\n                    var ySpanR = _this.cells.left.y - _this.cells.right.y;\n                    _this.rotate(xSpanR, ySpanR);\n                    break;\n            }\n        });\n        document.addEventListener(\"keyup\", function (e) {\n            if (e.key == \"ArrowDown\")\n                _this.manualMovingDown = false;\n        });\n    };\n    Pionek.prototype.rotate = function (xSpan, ySpan) {\n        //refactor!\n        if (xSpan == 20 && ySpan == 0) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x, this.cells.left.y - 20);\n        }\n        if (xSpan == 0 && ySpan == -20) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x - 20, this.cells.left.y);\n        }\n        if (xSpan == -20 && ySpan == 0) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x, this.cells.left.y + 20);\n        }\n        if (xSpan == 0 && ySpan == 20) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x + 20, this.cells.left.y);\n        }\n    };\n    Pionek.prototype.updateBothCoordinates = function (xLeft, yLeft, xRight, yRight) {\n        if (yLeft !== undefined) {\n            this.cells.left.y = yLeft;\n            this.cells.left.div.style.top = yLeft + \"px\";\n        }\n        if (xLeft !== undefined) {\n            this.cells.left.x = xLeft;\n            this.cells.left.div.style.left = xLeft + \"px\";\n        }\n        if (yRight !== undefined) {\n            this.cells.right.y = yRight;\n            this.cells.right.div.style.top = yRight + \"px\";\n        }\n        if (xRight !== undefined) {\n            this.cells.right.x = xRight;\n            this.cells.right.div.style.left = xRight + \"px\";\n        }\n    };\n    return Pionek;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Pionek.ts?");

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