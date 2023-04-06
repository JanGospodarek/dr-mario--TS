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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Pionek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pionek */ \"./src/Pionek.ts\");\n/* harmony import */ var _utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/genUniqueId */ \"./src/utils/genUniqueId.ts\");\n\n\nvar Game = /** @class */ (function () {\n    function Game() {\n        var _this = this;\n        this.boardCon = document.getElementById(\"board\");\n        this.pionks = [];\n        this.cells = [];\n        this.renew = function (pionek) {\n            var cells = pionek.pionek.children;\n            console.log(cells);\n            var _loop_1 = function (index) {\n                var element = cells[index];\n                var pos = element.getBoundingClientRect();\n                var color = element.style.backgroundColor;\n                //   const obj: cellObj = {\n                //     id: Date.now(),\n                //     x: pos.x,\n                //     y: pos.y,\n                //     color: color,\n                //   };\n                var i = _this.cells.findIndex(function (el) { return el.x == pos.x - 20 && el.y == pos.y - 20; });\n                _this.cells[i].color = color;\n                _this.cells[i].div = element;\n            };\n            for (var index = 0; index < cells.length; index++) {\n                _loop_1(index);\n            }\n            // pionek.pionek.style.display = \"none\";\n            _this.checkForZbicie();\n            _this.renderPionek();\n        };\n        this.checkBorderPionks = function (pos, rotation) {\n            var xLeft, xRight, y, x;\n            if (rotation == 90 || rotation == 270) {\n                xLeft = pos.x - 10;\n                xRight = pos.x + 10;\n                y = pos.y + 30;\n                //  this.position.x += 10;\n                // this.position.y -= 10;\n            }\n            else {\n                xLeft = pos.x - 20;\n                xRight = pos.x + 20;\n                y = pos.y + 20;\n            }\n            // const index=this.pionks.findIndex(el=>(el.position.x==xLeft||el.position.x==xRight)&&el.position.y==y)\n            var index = null;\n            _this.pionks.forEach(function (el, i) {\n                if ((el.rotation == 90 || el.rotation == 270) &&\n                    (el.position.x == xRight - 10 ||\n                        el.position.x == xLeft + 10 ||\n                        el.position.x - 10 == x) &&\n                    el.position.y == y + 10) {\n                    index = i;\n                }\n                if ((el.position.x == xRight ||\n                    el.position.x == xLeft ||\n                    el.position.x == pos.x) &&\n                    el.position.y == y) {\n                    index = i;\n                }\n            });\n            if (index != null)\n                return true;\n            else\n                return false;\n        };\n        this.renderBoard();\n        this.renderPionek();\n    }\n    Game.prototype.renderBoard = function () {\n        for (var y = 0; y < 15; y++) {\n            for (var x = 0; x < 8; x++) {\n                var div = document.createElement(\"div\");\n                div.classList.add(\"cell\");\n                div.style.left = \"\".concat(20 * x, \"px\");\n                div.style.top = \"\".concat(20 * y, \"px\");\n                this.cells.push({\n                    x: 20 * x + 8,\n                    y: 20 * y + 8,\n                    color: \"none\",\n                    id: (0,_utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n                    div: null,\n                });\n                this.boardCon.append(div);\n            }\n        }\n        console.log(this.cells);\n    };\n    Game.prototype.checkForZbicie = function () { };\n    Game.prototype.renderPionek = function () {\n        var pionek = new _Pionek__WEBPACK_IMPORTED_MODULE_0__.Pionek(this.boardCon, this.renew, this.checkBorderPionks);\n        this.pionks.push(pionek);\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/Pionek.ts":
/*!***********************!*\
  !*** ./src/Pionek.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pionek\": () => (/* binding */ Pionek)\n/* harmony export */ });\nvar Pionek = /** @class */ (function () {\n    function Pionek(boardDiv, renew, checkBorderPionks) {\n        this.possibleColors = [\n            \"#BB8FCE\",\n            \"#85C1E9\",\n            \"#F7DC6F\",\n            \"#F1948A\",\n            \"#E59866\",\n        ];\n        this.stop = false;\n        this.manualMovingDown = false;\n        ///\n        this.position = { x: 60, y: 0 };\n        this.rotation = 0;\n        this.boardDiv = boardDiv;\n        this.buildPionek();\n        this.moving();\n        this.addControls();\n        this.renewGame = renew;\n        this.checkBorderPionks = checkBorderPionks;\n    }\n    Pionek.prototype.getColor = function (except) {\n        var i = Math.floor(Math.random() * 5);\n        while (i == except) {\n            i = Math.floor(Math.random() * 5);\n        }\n        return i;\n    };\n    Pionek.prototype.buildPionek = function () {\n        this.pionek = document.createElement(\"div\");\n        this.pionek.classList.add(\"pionek\");\n        var fristColor = null;\n        for (var index = 0; index < 2; index++) {\n            var cell1 = document.createElement(\"div\");\n            var colorIndex = this.getColor(fristColor);\n            fristColor = colorIndex;\n            cell1.style.backgroundColor = this.possibleColors[colorIndex];\n            cell1.classList.add(\"pionek-cell\");\n            //   const pos = { x: 60, y: 0 };\n            //   cell1.setAttribute(\"data-position\", JSON.stringify(pos));\n            this.pionek.append(cell1);\n        }\n        this.pionek.style.left = \"60px\";\n        this.boardDiv.append(this.pionek);\n    };\n    Pionek.prototype.moving = function () {\n        var _this = this;\n        this.movingInterval = setInterval(function () {\n            if (_this.manualMovingDown)\n                return;\n            var y = 20 + Number(_this.pionek.style.top.split(\"p\")[0]);\n            if (_this.chechForBorderCollisions(undefined, y, true)) {\n                clearInterval(_this.movingInterval);\n                _this.renewGame(_this);\n                return;\n            }\n            _this.position.y = y;\n            _this.pionek.style.top = \"\".concat(y, \"px\");\n            //   this.updateDatasets({ x: this.position.x, y: this.position.y });\n        }, 400);\n    };\n    Pionek.prototype.updateDatasets = function (obj) {\n        for (var index = 0; index < this.pionek.children.length; index++) {\n            var element = this.pionek.children[index];\n            element.setAttribute(\"data-position\", JSON.stringify(obj));\n        }\n    };\n    Pionek.prototype.chechForBorderCollisions = function (x, y, autonomous) {\n        if (this.checkBorderPionks(this.position, this.rotation)) {\n            console.log(\"PIONEK!!!!\");\n            this.stop = true;\n            return true;\n        }\n        if (autonomous) {\n            if (y >= 300 ||\n                ((this.rotation == 90 || this.rotation == 270) && y >= 280)) {\n                this.stop = true;\n                return true;\n            }\n        }\n        else {\n            if (x <= 0 || x >= 160) {\n                return true;\n            }\n            else if (y >= 300 ||\n                ((this.rotation == 90 || this.rotation == 270) && y >= 280)) {\n                this.stop = true;\n                return true;\n            }\n        }\n    };\n    Pionek.prototype.rotate = function () {\n        var prevRot = this.rotation;\n        if (prevRot == 360)\n            this.rotation = 0;\n        this.rotation += 90;\n        if (this.rotation == 270 || this.rotation == 90) {\n            this.position.x += 10;\n            this.position.y -= 10;\n            this.pionek.style.left = \"\".concat(this.position.x, \"px\");\n            this.pionek.style.top = \"\".concat(this.position.y, \"px\");\n        }\n        if (this.rotation == 180 || this.rotation == 360) {\n            this.position.x -= 10;\n            this.position.y += 10;\n            this.pionek.style.top = \"\".concat(this.position.y, \"px\");\n            this.pionek.style.left = \"\".concat(this.position.x, \"px\");\n        }\n        // this.updateDatasets({ x: this.position.x, y: this.position.y });\n        this.pionek.style.transform = \"rotate(\".concat(this.rotation, \"deg)\");\n    };\n    Pionek.prototype.addControls = function () {\n        var _this = this;\n        document.addEventListener(\"keydown\", function (e) {\n            if (_this.stop)\n                return;\n            var key = e.key;\n            var x = +_this.pionek.style.left.split(\"p\")[0];\n            var y = +_this.pionek.style.top.split(\"p\")[0];\n            switch (key) {\n                case \"ArrowLeft\":\n                    if (!_this.chechForBorderCollisions(x, y, false)) {\n                        var span = x - 20;\n                        _this.pionek.style.left = \"\".concat(span, \"px\");\n                        _this.position.x = span;\n                    }\n                    break;\n                case \"ArrowRight\":\n                    if (!_this.chechForBorderCollisions(x + 40, y, false)) {\n                        var span = x + 20;\n                        _this.pionek.style.left = \"\".concat(span, \"px\");\n                        _this.position.x = span;\n                    }\n                    break;\n                case \"ArrowDown\":\n                    if (!_this.chechForBorderCollisions(x, y + 20, false)) {\n                        _this.manualMovingDown = true;\n                        var span = y + 20;\n                        _this.pionek.style.top = \"\".concat(span, \"px\");\n                        _this.position.y = span;\n                    }\n                    break;\n                case \"r\":\n                    _this.rotate();\n            }\n            //   this.updateDatasets({ x: this.position.x, y: this.position.y });\n        });\n        document.addEventListener(\"keyup\", function (e) {\n            if (e.key == \"ArrowDown\")\n                _this.manualMovingDown = false;\n        });\n    };\n    return Pionek;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Pionek.ts?");

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