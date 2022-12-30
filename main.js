/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
function prepareBoard(){
    let board = [];
    for (let i = 0; i < 10; i++){
        board.push([...Array(10)].map(() => false))
    }
    return board;
}


function Gameboard() {
    return {
        hitsRemaining: 0,
        board: prepareBoard(),
        isShotReceived: prepareBoard(),
        shipLengthsToAdd: [5, 4, 3, 2, 2, 1],
        placeDirectionY: true,
        isShipPlaceValid: function(x, y) {
            let ship = [];
            let shipLength = this.shipLengthsToAdd[0];

            if(this.placeDirectionY){
                for (let i = 0; i < shipLength; i++){
                    if (y + i <= 9 && !this.board[x][y + i]){
                        ship.push([x, y + i]);
                    } else return false;
                }

            } else {
                for (let i = 0; i < shipLength; i++){
                    if (x + i <= 9 && !this.board[x + i][y]){
                        ship.push([x + i, y]);
                    } else return false;
                }
            }

            return ship;
        },
        placeShip: function(x, y) {
            // let ship = [];
            // let shipLength = this.shipLengthsToAdd[0];

            // if(this.placeDirectionY){
            //     for (let i = 0; i < shipLength; i++){
            //         if (y + i <= 9 && !this.board[x][y + i]){
            //             ship.push([x, y + i]);
            //             this.board[x][y + i] = true;
            //         } else return false;
            //     }

            // } else {
            //     for (let i = 0; i < shipLength; i++){
            //         if (x + i <= 9 && !this.board[x + i][y]){
            //             ship.push([x + i, y]);
            //             this.board[x + i][y] = true;
            //         } else return false;
            //     }
            // }

            let ship = this.isShipPlaceValid(x, y);
            if(ship) {
                for (let arr of ship) {
                    let x = arr[0];
                    let y = arr[1];
                    this.board[x][y] = true;
                }
                this.hitsRemaining += this.shipLengthsToAdd.shift();
                return ship;            
            } else return false;

        },
        receiveAttack: function(x, y){  
            if (!this.isShotReceived[x][y]){
                this.isShotReceived[x][y] = true;
                
                if(this.board[x][y]){
                    this.hitsRemaining--;
                    return 'hit';
                }
                return 'miss';
            }
            return false
        },
        isShipsSunk: function(){
            return this.hitsRemaining <= 0;
        },
        isBoardSet: function() {
            return this.shipLengthsToAdd.length === 0;
        } 
    }
}
// let gb = Gameboard();
// console.log(gb.placeShip(0, 0));
// console.log(gb.isShipPlaceValid(0, 6));



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ "./src/gameboard.js");


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};


function isContainedIn2DArray(array, container) {
    for (let i = 0; i < container.length; i++) {
      if (container[i].join('') === array.join('')) {
        return true;
      }
    }
    return false;
};
  
  
function Player(name){
    return {
        name,
        playerGB: (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(),
        randomiseTanks: function() {
            while (!this.playerGB.isBoardSet()) {
                this.playerGB.placeDirectionY = Boolean(getRandomInt(2));
                this.playerGB.placeShip(getRandomInt(10), getRandomInt(10));
            }
        },

        // For AI
        attemptedAttacks: [],
        randomisedMove: function() {
            let isMoveValid = false;
            while (!isMoveValid) {
                let move = [getRandomInt(10), getRandomInt(10)];
                if (isContainedIn2DArray(move, this.attemptedAttacks)) continue;
                return move;
            }
        }
    };
};

// let p = Player();
// p.randomiseTanks()



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");


function createGrid(player, length=10) {
    let grid = document.createElement('div');
    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            let box = document.createElement('div');
            box.id = `${player.name}:${x},${y}`
            box.classList.add('box')
            grid.append(box);

            box.onmouseover = () => {
                let ships = player.playerGB.isShipPlaceValid(x, y)
                if (ships) {
                    for (let shipArray of ships) {
                        let boxID = `Human:${shipArray[0]},${shipArray[1]}`;
                        let box = document.getElementById(boxID);
                        box.classList.add('potential')
                    }
                } else box.style.backgroundColor = 'rgba(255, 99, 71, 1)';
            }
    
            box.onmouseleave = () => {
                let boxes = document.querySelectorAll('.potential')
                boxes.forEach(box => {
                    box.classList.remove('potential');
                });
                box.style.backgroundColor = null;
            }
        }
    }

    grid.classList.add('grid')
    return grid
}


const P1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)('Human');
const P2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)('AI');

let gridsContainerDiv = document.createElement('div');
let grid1 = createGrid(P1);
let grid2 = createGrid(P2);
let changeAxisBtn = document.createElement('button');

changeAxisBtn.textContent = 'Change Axis';
changeAxisBtn.id = 'change-axis-btn';
changeAxisBtn.addEventListener('click', () => {
    P1.playerGB.placeDirectionY = !P1.playerGB.placeDirectionY;
})

gridsContainerDiv.classList.add('grid-container')
gridsContainerDiv.appendChild(grid1);
gridsContainerDiv.appendChild(grid2);

document.body.appendChild(gridsContainerDiv);
document.body.appendChild(changeAxisBtn)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZ0JBQWdCO0FBQ2hEO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGNBQWM7QUFDZCxnQ0FBZ0MsZ0JBQWdCO0FBQ2hEO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsbUNBQW1DLGdCQUFnQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RjJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdEQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0Esd0JBQXdCLFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxhQUFhLEdBQUcsYUFBYTtBQUMxRTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrREFBTTtBQUNqQixXQUFXLGtEQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHJlcGFyZUJvYXJkKCl7XHJcbiAgICBsZXQgYm9hcmQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XHJcbiAgICAgICAgYm9hcmQucHVzaChbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gZmFsc2UpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBoaXRzUmVtYWluaW5nOiAwLFxyXG4gICAgICAgIGJvYXJkOiBwcmVwYXJlQm9hcmQoKSxcclxuICAgICAgICBpc1Nob3RSZWNlaXZlZDogcHJlcGFyZUJvYXJkKCksXHJcbiAgICAgICAgc2hpcExlbmd0aHNUb0FkZDogWzUsIDQsIDMsIDIsIDIsIDFdLFxyXG4gICAgICAgIHBsYWNlRGlyZWN0aW9uWTogdHJ1ZSxcclxuICAgICAgICBpc1NoaXBQbGFjZVZhbGlkOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gW107XHJcbiAgICAgICAgICAgIGxldCBzaGlwTGVuZ3RoID0gdGhpcy5zaGlwTGVuZ3Roc1RvQWRkWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wbGFjZURpcmVjdGlvblkpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5ICsgaSA8PSA5ICYmICF0aGlzLmJvYXJkW3hdW3kgKyBpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucHVzaChbeCwgeSArIGldKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCArIGkgPD0gOSAmJiAhdGhpcy5ib2FyZFt4ICsgaV1beV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnB1c2goW3ggKyBpLCB5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNoaXA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICAgICAgLy8gbGV0IHNoaXAgPSBbXTtcclxuICAgICAgICAgICAgLy8gbGV0IHNoaXBMZW5ndGggPSB0aGlzLnNoaXBMZW5ndGhzVG9BZGRbMF07XHJcblxyXG4gICAgICAgICAgICAvLyBpZih0aGlzLnBsYWNlRGlyZWN0aW9uWSl7XHJcbiAgICAgICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHkgKyBpIDw9IDkgJiYgIXRoaXMuYm9hcmRbeF1beSArIGldKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hpcC5wdXNoKFt4LCB5ICsgaV0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3kgKyBpXSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKHggKyBpIDw9IDkgJiYgIXRoaXMuYm9hcmRbeCArIGldW3ldKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hpcC5wdXNoKFt4ICsgaSwgeV0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmJvYXJkW3ggKyBpXVt5XSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgbGV0IHNoaXAgPSB0aGlzLmlzU2hpcFBsYWNlVmFsaWQoeCwgeSk7XHJcbiAgICAgICAgICAgIGlmKHNoaXApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGFyciBvZiBzaGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBhcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBhcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpdHNSZW1haW5pbmcgKz0gdGhpcy5zaGlwTGVuZ3Roc1RvQWRkLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpcDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbih4LCB5KXsgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTaG90UmVjZWl2ZWRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3RSZWNlaXZlZFt4XVt5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0c1JlbWFpbmluZy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaGl0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAnbWlzcyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1NoaXBzU3VuazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGl0c1JlbWFpbmluZyA8PSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNCb2FyZFNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoaXBMZW5ndGhzVG9BZGQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbn1cclxuLy8gbGV0IGdiID0gR2FtZWJvYXJkKCk7XHJcbi8vIGNvbnNvbGUubG9nKGdiLnBsYWNlU2hpcCgwLCAwKSk7XHJcbi8vIGNvbnNvbGUubG9nKGdiLmlzU2hpcFBsYWNlVmFsaWQoMCwgNikpO1xyXG5cclxuZXhwb3J0IHtHYW1lYm9hcmR9IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBpc0NvbnRhaW5lZEluMkRBcnJheShhcnJheSwgY29udGFpbmVyKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoY29udGFpbmVyW2ldLmpvaW4oJycpID09PSBhcnJheS5qb2luKCcnKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbiAgXHJcbiAgXHJcbmZ1bmN0aW9uIFBsYXllcihuYW1lKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBwbGF5ZXJHQjogR2FtZWJvYXJkKCksXHJcbiAgICAgICAgcmFuZG9taXNlVGFua3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB3aGlsZSAoIXRoaXMucGxheWVyR0IuaXNCb2FyZFNldCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckdCLnBsYWNlRGlyZWN0aW9uWSA9IEJvb2xlYW4oZ2V0UmFuZG9tSW50KDIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyR0IucGxhY2VTaGlwKGdldFJhbmRvbUludCgxMCksIGdldFJhbmRvbUludCgxMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gRm9yIEFJXHJcbiAgICAgICAgYXR0ZW1wdGVkQXR0YWNrczogW10sXHJcbiAgICAgICAgcmFuZG9taXNlZE1vdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgaXNNb3ZlVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKCFpc01vdmVWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBbZ2V0UmFuZG9tSW50KDEwKSwgZ2V0UmFuZG9tSW50KDEwKV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDb250YWluZWRJbjJEQXJyYXkobW92ZSwgdGhpcy5hdHRlbXB0ZWRBdHRhY2tzKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW92ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG4vLyBsZXQgcCA9IFBsYXllcigpO1xyXG4vLyBwLnJhbmRvbWlzZVRhbmtzKClcclxuXHJcbmV4cG9ydCB7IFBsYXllciB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR3JpZChwbGF5ZXIsIGxlbmd0aD0xMCkge1xyXG4gICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbGVuZ3RoOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYm94LmlkID0gYCR7cGxheWVyLm5hbWV9OiR7eH0sJHt5fWBcclxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXHJcbiAgICAgICAgICAgIGdyaWQuYXBwZW5kKGJveCk7XHJcblxyXG4gICAgICAgICAgICBib3gub25tb3VzZW92ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hpcHMgPSBwbGF5ZXIucGxheWVyR0IuaXNTaGlwUGxhY2VWYWxpZCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc2hpcEFycmF5IG9mIHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3hJRCA9IGBIdW1hbjoke3NoaXBBcnJheVswXX0sJHtzaGlwQXJyYXlbMV19YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJveElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ3BvdGVudGlhbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsIDk5LCA3MSwgMSknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgYm94Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3RlbnRpYWwnKVxyXG4gICAgICAgICAgICAgICAgYm94ZXMuZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5jbGFzc0xpc3QucmVtb3ZlKCdwb3RlbnRpYWwnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJylcclxuICAgIHJldHVybiBncmlkXHJcbn1cclxuXHJcblxyXG5jb25zdCBQMSA9IFBsYXllcignSHVtYW4nKTtcclxuY29uc3QgUDIgPSBQbGF5ZXIoJ0FJJyk7XHJcblxyXG5sZXQgZ3JpZHNDb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxubGV0IGdyaWQxID0gY3JlYXRlR3JpZChQMSk7XHJcbmxldCBncmlkMiA9IGNyZWF0ZUdyaWQoUDIpO1xyXG5sZXQgY2hhbmdlQXhpc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuY2hhbmdlQXhpc0J0bi50ZXh0Q29udGVudCA9ICdDaGFuZ2UgQXhpcyc7XHJcbmNoYW5nZUF4aXNCdG4uaWQgPSAnY2hhbmdlLWF4aXMtYnRuJztcclxuY2hhbmdlQXhpc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIFAxLnBsYXllckdCLnBsYWNlRGlyZWN0aW9uWSA9ICFQMS5wbGF5ZXJHQi5wbGFjZURpcmVjdGlvblk7XHJcbn0pXHJcblxyXG5ncmlkc0NvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCdncmlkLWNvbnRhaW5lcicpXHJcbmdyaWRzQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKGdyaWQxKTtcclxuZ3JpZHNDb250YWluZXJEaXYuYXBwZW5kQ2hpbGQoZ3JpZDIpO1xyXG5cclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChncmlkc0NvbnRhaW5lckRpdik7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hhbmdlQXhpc0J0bikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=