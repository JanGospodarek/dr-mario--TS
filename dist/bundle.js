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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Pionek__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pionek */ \"./src/Pionek.ts\");\n/* harmony import */ var _utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/genUniqueId */ \"./src/utils/genUniqueId.ts\");\n\n\n// export class Game {\n//   private boardCon = <HTMLDivElement>document.getElementById(\"board\");\n//   public pionks: Pionek[] = [];\n//   public cells: cellObj[] = [];\n//   public cellsToDelete: cellObj[] = [];\n//   constructor() {\n//     this.renderBoard();\n//     this.renderPionek();\n//   }\n//   private renderBoard() {\n//     for (let y = 0; y < 15; y++) {\n//       for (let x = 0; x < 8; x++) {\n//         const div = document.createElement(\"div\");\n//         div.classList.add(\"cell\");\n//         div.style.left = `${20 * x}px`;\n//         div.style.top = `${20 * y}px`;\n//         this.cells.push({\n//           x: 20 * x + 8,\n//           y: 20 * y + 8,\n//           color: \"none\",\n//           id: genUniqueId(),\n//           div: null,\n//         });\n//         this.boardCon.append(div);\n//       }\n//     }\n//   }\n//   public renew = (pionek: Pionek) => {\n//     const cells = pionek.pionek.children as HTMLCollectionOf<HTMLElement>;\n//     console.log(cells);\n//     for (let index = 0; index < cells.length; index++) {\n//       const element = cells[index];\n//       const pos = element.getBoundingClientRect();\n//       const color = element.style.backgroundColor;\n//       //   const obj: cellObj = {\n//       //     id: Date.now(),\n//       //     x: pos.x,\n//       //     y: pos.y,\n//       //     color: color,\n//       //   };\n//       console.log(element);\n//       const i = this.cells.findIndex(\n//         (el) => el.x == pos.x - 20 && el.y == pos.y - 20\n//       );\n//       this.cells[i].color = color;\n//       this.cells[i].div = element;\n//       this.checkForZbicie(this.cells[i]);\n//       element.classList.add(\"stopped-cell\");\n//       element.style.top = pos.y - 8 + \"px\";\n//       element.style.left = pos.x - 8 + \"px\";\n//       this.boardCon.append(element);\n//       //   this.stoppedCells.push(obj);\n//     }\n//     // pionek.pionek.remove();\n//     this.renderPionek();\n//   };\n//   public checkForZbicie(obj: cellObj) {\n//     const indexLeft = this.cells.findIndex(\n//       (el) => el.x == obj.x - 20 && el.y == obj.y\n//     );\n//     const indexTop = this.cells.findIndex(\n//       (el) => el.x == obj.x && el.y == obj.y - 20\n//     );\n//     const indexRight = this.cells.findIndex(\n//       (el) => el.x == obj.x + 20 && el.y == obj.y\n//     );\n//     const indexBottom = this.cells.findIndex(\n//       (el) => el.x == obj.x && el.y == obj.y + 20\n//     );\n//     const indexes = [indexLeft, indexRight, indexTop, indexBottom];\n//     const checkInRow = (element: cellObj, vectorX: number, vectorY: number) => {\n//       this.cellsToDelete = [element];\n//       let bool = true;\n//       for (let index = 1; index < 3; index++) {\n//         const l = this.cells.findIndex(\n//           (el) =>\n//             el.x == obj.x + vectorX * index && el.y == obj.y + vectorY * index\n//         );\n//         // console.log(this.cells[l]);\n//         if (l == -1) {\n//           bool = false;\n//           break;\n//         }\n//         if (this.cells[l].div == null) {\n//           bool = false;\n//           break;\n//         }\n//         if (this.cells[l].color !== obj.color) {\n//           bool = false;\n//           break;\n//         }\n//         this.cellsToDelete.push(this.cells[l]);\n//       }\n//       return bool;\n//     };\n//     // console.log(indexes[key]);\n//     indexes.forEach((e) => {\n//       if (e == -1) return;\n//       const element = this.cells[e];\n//       // if (element.div == null) return;\n//       const vectorX = obj.x - element.x;\n//       const vectorY = obj.y - element.y;\n//       // console.log(obj, vectorX, vectorY);\n//       if (checkInRow(obj, vectorX, vectorY)) {\n//         console.log(\"znaleziono!\", obj.color);\n//         this.cellsToDelete.forEach((cell) => {\n//           cell.div.style.display = \"none\";\n//           cell.color = \"none\";\n//         });\n//       }\n//     });\n//   }\n//   public checkBorderPionks = (\n//     pos: { x: number; y: number },\n//     rotation: number\n//   ): boolean => {\n//     let xLeft, xRight, y, x;\n//     if (rotation == 90 || rotation == 270) {\n//       xLeft = pos.x - 10;\n//       xRight = pos.x + 10;\n//       y = pos.y + 30;\n//     } else {\n//       xLeft = pos.x - 20;\n//       xRight = pos.x + 20;\n//       y = pos.y + 20;\n//     }\n//     let index: number | null = null;\n//     this.pionks.forEach((el, i) => {\n//       if (\n//         (el.rotation == 90 || el.rotation == 270) &&\n//         (el.position.x == xRight - 10 ||\n//           el.position.x == xLeft + 10 ||\n//           el.position.x - 10 == x) &&\n//         el.position.y == y + 10\n//       ) {\n//         index = i;\n//       }\n//       if (\n//         (el.position.x == xRight ||\n//           el.position.x == xLeft ||\n//           el.position.x == pos.x) &&\n//         el.position.y == y\n//       ) {\n//         index = i;\n//       }\n//     });\n//     if (index != null) return true;\n//     else return false;\n//   };\n//   private renderPionek() {\n//     const pionek = new Pionek(\n//       this.boardCon,\n//       this.renew,\n//       this.checkBorderPionks\n//     );\n//     this.pionks.push(pionek);\n//   }\n// }\n//dupa\nvar Game = /** @class */ (function () {\n    function Game() {\n        this.boardCon = document.getElementById(\"board\");\n        this.pionks = [];\n        this.cells = [];\n        this.cellsToDelete = [];\n        this.renderBoard();\n        this.renderPionek();\n    }\n    Game.prototype.renderBoard = function () {\n        for (var y = 0; y < 15; y++) {\n            for (var x = 0; x < 8; x++) {\n                var div = document.createElement(\"div\");\n                div.classList.add(\"cell\");\n                div.style.left = \"\".concat(20 * x, \"px\");\n                div.style.top = \"\".concat(20 * y, \"px\");\n                this.cells.push({\n                    x: 20 * x + 8,\n                    y: 20 * y + 8,\n                    color: \"none\",\n                    id: (0,_utils_genUniqueId__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(),\n                    div: null,\n                });\n                this.boardCon.append(div);\n            }\n        }\n    };\n    Game.prototype.renderPionek = function () {\n        var pionek = new _Pionek__WEBPACK_IMPORTED_MODULE_0__.Pionek(this.boardCon);\n        this.pionks.push(pionek);\n    };\n    return Game;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Game.ts?");

/***/ }),

/***/ "./src/Pionek.ts":
/*!***********************!*\
  !*** ./src/Pionek.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pionek\": () => (/* binding */ Pionek)\n/* harmony export */ });\n// export class Pionek {\n//   private boardDiv: HTMLDivElement;\n//   public pionek!: HTMLDivElement;\n//   private movingInterval: any;\n//   private possibleColors = [\n//     \"#BB8FCE\",\n//     \"#85C1E9\",\n//     \"#F7DC6F\",\n//     \"#F1948A\",\n//     \"#E59866\",\n//   ];\n//   private stop = false;\n//   private checkBorderPionks: Function;\n//   private renewGame: Function;\n//   private manualMovingDown = false;\n//   ///\n//   public position = { x: 60, y: 0 };\n//   public rotation = 0;\n//   constructor(\n//     boardDiv: HTMLDivElement,\n//     renew: Function,\n//     checkBorderPionks: Function\n//   ) {\n//     this.boardDiv = boardDiv;\n//     this.buildPionek();\n//     this.moving();\n//     this.addControls();\n//     this.renewGame = renew;\n//     this.checkBorderPionks = checkBorderPionks;\n//   }\nvar Pionek = /** @class */ (function () {\n    ///\n    function Pionek(boardDiv) {\n        this.cells = {\n            left: { x: 60, y: 0, div: null },\n            right: { x: 80, y: 0, div: null },\n        };\n        this.possibleColors = [\n            \"#BB8FCE\",\n            \"#85C1E9\",\n            \"#F7DC6F\",\n            \"#F1948A\",\n            \"#E59866\",\n        ];\n        this.stop = false;\n        // private checkBorderPionks: Function;\n        // private renewGame: Function;\n        this.manualMovingDown = false;\n        this.boardDiv = boardDiv;\n        this.buildPionek();\n        this.moving();\n        this.addControls();\n    }\n    Pionek.prototype.buildPionek = function () {\n        var fristColor = null;\n        for (var index = 0; index < 2; index++) {\n            var cell = document.createElement(\"div\");\n            var colorIndex = this.getColor(fristColor);\n            fristColor = colorIndex;\n            cell.style.backgroundColor = this.possibleColors[colorIndex];\n            cell.classList.add(\"pionek-cell\");\n            //   cell.setAttribute(\"data-position\", JSON.stringify(pos));\n            this.boardDiv.append(cell);\n            var key = \"\";\n            index == 0 ? (key = \"left\") : (key = \"right\");\n            cell.style.left = this.cells[key].x + \"px\";\n            cell.style.top = this.cells[key].y + \"px\";\n            this.cells[key].div = cell;\n        }\n    };\n    Pionek.prototype.getColor = function (except) {\n        var i = Math.floor(Math.random() * 5);\n        while (i == except) {\n            i = Math.floor(Math.random() * 5);\n        }\n        return i;\n    };\n    Pionek.prototype.moving = function () {\n        var _this = this;\n        this.movingInterval = setInterval(function () {\n            if (_this.manualMovingDown)\n                return;\n            var newY = 20 + _this.cells.left.y;\n            // this.cells.left.y = newY;\n            _this.updateBothCoordinates(undefined, _this.cells.left.y + 20, undefined, _this.cells.right.y + 20);\n            // prettier-ignore\n            if (_this.checkBottomCollision()) {\n                clearInterval(_this.movingInterval);\n                // this.renewGame(this);\n                return;\n            }\n        }, 400);\n    };\n    Pionek.prototype.checkLeftCollision = function () {\n        if (this.cells.left.x <= 0)\n            return true;\n        else\n            return false;\n    };\n    Pionek.prototype.checkRightCollision = function () {\n        if (this.cells.right.x >= 140)\n            return true;\n        else\n            return false;\n    };\n    Pionek.prototype.checkBottomCollision = function () {\n        if (this.cells.left.y >= 280 || this.cells.right.y >= 280) {\n            this.stop = true;\n            return true;\n        }\n        else {\n            return false;\n        }\n    };\n    Pionek.prototype.addControls = function () {\n        var _this = this;\n        document.addEventListener(\"keydown\", function (e) {\n            if (_this.stop)\n                return;\n            var key = e.key;\n            switch (key) {\n                case \"ArrowLeft\":\n                    // prettier-ignore\n                    if (_this.checkLeftCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x - 20, undefined, _this.cells.right.x - 20, undefined);\n                    break;\n                case \"ArrowRight\":\n                    // prettier-ignore\n                    if (_this.checkRightCollision())\n                        break;\n                    _this.updateBothCoordinates(_this.cells.left.x + 20, undefined, _this.cells.right.x + 20, undefined);\n                    break;\n                case \"ArrowDown\":\n                    // prettier-ignore\n                    if (_this.checkBottomCollision())\n                        break;\n                    _this.manualMovingDown = true;\n                    _this.updateBothCoordinates(undefined, _this.cells.left.y + 20, undefined, _this.cells.right.y + 20);\n                    break;\n                case \"r\":\n                    var xSpan = _this.cells.right.x - _this.cells.left.x;\n                    var ySpan = _this.cells.right.y - _this.cells.left.y;\n                    _this.rotate(xSpan, ySpan);\n                    break;\n                case \"t\":\n                    var xSpanR = _this.cells.left.x - _this.cells.right.x;\n                    var ySpanR = _this.cells.left.y - _this.cells.right.y;\n                    _this.rotate(xSpanR, ySpanR);\n                    break;\n            }\n        });\n        document.addEventListener(\"keyup\", function (e) {\n            if (e.key == \"ArrowDown\")\n                _this.manualMovingDown = false;\n        });\n    };\n    Pionek.prototype.rotate = function (xSpan, ySpan) {\n        //refactor!\n        if (xSpan == 20 && ySpan == 0) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x, this.cells.left.y - 20);\n        }\n        if (xSpan == 0 && ySpan == -20) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x - 20, this.cells.left.y);\n        }\n        if (xSpan == -20 && ySpan == 0) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x, this.cells.left.y + 20);\n        }\n        if (xSpan == 0 && ySpan == 20) {\n            //prettier-ignore\n            this.updateBothCoordinates(undefined, undefined, this.cells.left.x + 20, this.cells.left.y);\n        }\n    };\n    Pionek.prototype.updateBothCoordinates = function (xLeft, yLeft, xRight, yRight) {\n        if (yLeft !== undefined) {\n            this.cells.left.y = yLeft;\n            this.cells.left.div.style.top = yLeft + \"px\";\n        }\n        if (xLeft !== undefined) {\n            this.cells.left.x = xLeft;\n            this.cells.left.div.style.left = xLeft + \"px\";\n        }\n        if (yRight !== undefined) {\n            this.cells.right.y = yRight;\n            this.cells.right.div.style.top = yRight + \"px\";\n        }\n        if (xRight !== undefined) {\n            this.cells.right.x = xRight;\n            this.cells.right.div.style.left = xRight + \"px\";\n        }\n    };\n    return Pionek;\n}());\n\n\n\n//# sourceURL=webpack:///./src/Pionek.ts?");

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