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
        shipLengthsToAdd: [5, 4, 3, 3, 2],
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


function possibleOptions() {
    let options = [];
    for (let i = 0; i < 10; i ++) {
        for (let j = 0; j < 10; j++) {
            options.push([i, j]);
        }
    }
    return options;
}

let attackOptions = possibleOptions();
  
  
function Player(name){
    return {
        name,
        playerGB: (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_0__.Gameboard)(),
        options: attackOptions,
        randomiseTanks: function() {
            while (!this.playerGB.isBoardSet()) {
                this.playerGB.placeDirectionY = Boolean(getRandomInt(2));
                this.playerGB.placeShip(getRandomInt(10), getRandomInt(10));
            }
        },

        // For AI
        attemptedAttacks: [],
        randomisedMove: function() {
            let moveArr = this.options.splice(getRandomInt(this.options.length), 1);
            return moveArr[0];
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

            if (player.name === "Human") {
                box.onmouseover = () => {
                    if (gameStarted()) return;
                    let ships = player.playerGB.isShipPlaceValid(x, y)
                    if (ships) {
                        for (let shipArray of ships) {
                            let boxID = `Human:${shipArray[0]},${shipArray[1]}`;
                            let box = document.getElementById(boxID);
                            box.classList.add('potential')
                        }
                    } else box.style.backgroundColor = 'rgba(255, 99, 71, 1)';
                }

                box.onclick = () => {
                    let ships = player.playerGB.placeShip(x, y)
                    if (ships) {
                        for (let shipArray of ships) {
                            let boxID = `Human:${shipArray[0]},${shipArray[1]}`;
                            let box = document.getElementById(boxID);
                            box.classList.add('ship')
                        }
                    }
                    setGameMsg()
                }
        
                box.onmouseleave = () => {
                    let boxes = document.querySelectorAll('.potential')
                    boxes.forEach(box => {
                        box.classList.remove('potential');
                    });
                    if (gameStarted()) return;
                    box.style.backgroundColor = null;
                }
            } else if (player.name === "AI") {
                box.onclick = () => {
                    if (gameStarted() && isHumanTurn && !isGameDone){
                        let result = P2.playerGB.receiveAttack(x, y)
                        checkWinner();
                        if (result) {
                            isHumanTurn = false;
                            if (result === 'hit') box.style.backgroundColor = 'black';
                            else if (result === 'miss') box.style.backgroundColor = 'blue';
                            let computerMove = P2.randomisedMove();
                            attackHuman(computerMove[0], computerMove[1]);
                            checkWinner()
                            isHumanTurn = true;
                        } 
                    }
                }
            }
        }
    }

    grid.classList.add('grid')
    return grid
}

let isHumanTurn = true;
let isGameDone = false;

function gameStarted() {
    return P1.playerGB.isBoardSet() && P2.playerGB.isBoardSet(); 
}


function checkWinner() {
    if (P1.playerGB.isShipsSunk()) {
        isGameDone = true;
        setGameMsg("AI");
    }
    else if (P2.playerGB.isShipsSunk()) {
        isGameDone = true;
        setGameMsg("Human");
    }
}

function attackHuman(x, y) {
    let boxID = `Human:${x},${y}`;
    let box = document.getElementById(boxID)
    let result = P1.playerGB.receiveAttack(x, y);
    if (result === 'hit') box.style.backgroundColor = 'black';
    else if (result === 'miss') box.style.backgroundColor = 'blue';
}

function setGameMsg(winner=null) {
    if (!gameStarted()) messageDiv.textContent = "Place Tanks";
    else if (isGameDone) {
        messageDiv.textContent = `${winner} Wins!`;
        messageDiv.appendChild(playAgainBtn)

    } else {
        messageDiv.textContent = "Play!";
        messageDiv.style.color = 'rgb(19, 173, 34)';
    }

}

let P1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)('Human');
let P2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.Player)('AI');

let gridsContainerDiv = document.createElement('div');
let P1Grid = createGrid(P1);
let P2Grid = createGrid(P2);
let changeAxisBtn = document.createElement('button');
let messageDiv = document.createElement('div');
let playAgainBtn = document.createElement('button');


messageDiv.textContent = 'Place Tanks';
messageDiv.id = 'message-div';

playAgainBtn.textContent = 'Play Again!'
playAgainBtn.onclick = () => window.location.reload();

changeAxisBtn.textContent = 'Change Axis';
changeAxisBtn.id = 'change-axis-btn';
changeAxisBtn.addEventListener('click', () => {
    P1.playerGB.placeDirectionY = !P1.playerGB.placeDirectionY;
})

gridsContainerDiv.classList.add('grid-container')
gridsContainerDiv.appendChild(P1Grid);
gridsContainerDiv.appendChild(P2Grid);

P2.randomiseTanks()

document.body.appendChild(gridsContainerDiv);
document.body.appendChild(changeAxisBtn)
document.body.appendChild(messageDiv)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHJlcGFyZUJvYXJkKCl7XHJcbiAgICBsZXQgYm9hcmQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKyl7XHJcbiAgICAgICAgYm9hcmQucHVzaChbLi4uQXJyYXkoMTApXS5tYXAoKCkgPT4gZmFsc2UpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBoaXRzUmVtYWluaW5nOiAwLFxyXG4gICAgICAgIGJvYXJkOiBwcmVwYXJlQm9hcmQoKSxcclxuICAgICAgICBpc1Nob3RSZWNlaXZlZDogcHJlcGFyZUJvYXJkKCksXHJcbiAgICAgICAgc2hpcExlbmd0aHNUb0FkZDogWzUsIDQsIDMsIDMsIDJdLFxyXG4gICAgICAgIHBsYWNlRGlyZWN0aW9uWTogdHJ1ZSxcclxuICAgICAgICBpc1NoaXBQbGFjZVZhbGlkOiBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICAgICAgICAgIGxldCBzaGlwID0gW107XHJcbiAgICAgICAgICAgIGxldCBzaGlwTGVuZ3RoID0gdGhpcy5zaGlwTGVuZ3Roc1RvQWRkWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5wbGFjZURpcmVjdGlvblkpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh5ICsgaSA8PSA5ICYmICF0aGlzLmJvYXJkW3hdW3kgKyBpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucHVzaChbeCwgeSArIGldKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeCArIGkgPD0gOSAmJiAhdGhpcy5ib2FyZFt4ICsgaV1beV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwLnB1c2goW3ggKyBpLCB5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNoaXA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZVNoaXA6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSB0aGlzLmlzU2hpcFBsYWNlVmFsaWQoeCwgeSk7XHJcbiAgICAgICAgICAgIGlmKHNoaXApIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGFyciBvZiBzaGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBhcnJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSBhcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpdHNSZW1haW5pbmcgKz0gdGhpcy5zaGlwTGVuZ3Roc1RvQWRkLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hpcDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWNlaXZlQXR0YWNrOiBmdW5jdGlvbih4LCB5KXsgIFxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTaG90UmVjZWl2ZWRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3RSZWNlaXZlZFt4XVt5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYm9hcmRbeF1beV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGl0c1JlbWFpbmluZy0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaGl0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiAnbWlzcyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1NoaXBzU3VuazogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGl0c1JlbWFpbmluZyA8PSAwO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNCb2FyZFNldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoaXBMZW5ndGhzVG9BZGQubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7R2FtZWJvYXJkfSIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1heCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gcG9zc2libGVPcHRpb25zKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKFtpLCBqXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbn1cclxuXHJcbmxldCBhdHRhY2tPcHRpb25zID0gcG9zc2libGVPcHRpb25zKCk7XHJcbiAgXHJcbiAgXHJcbmZ1bmN0aW9uIFBsYXllcihuYW1lKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICBwbGF5ZXJHQjogR2FtZWJvYXJkKCksXHJcbiAgICAgICAgb3B0aW9uczogYXR0YWNrT3B0aW9ucyxcclxuICAgICAgICByYW5kb21pc2VUYW5rczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHdoaWxlICghdGhpcy5wbGF5ZXJHQi5pc0JvYXJkU2V0KCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyR0IucGxhY2VEaXJlY3Rpb25ZID0gQm9vbGVhbihnZXRSYW5kb21JbnQoMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJHQi5wbGFjZVNoaXAoZ2V0UmFuZG9tSW50KDEwKSwgZ2V0UmFuZG9tSW50KDEwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBGb3IgQUlcclxuICAgICAgICBhdHRlbXB0ZWRBdHRhY2tzOiBbXSxcclxuICAgICAgICByYW5kb21pc2VkTW92ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlQXJyID0gdGhpcy5vcHRpb25zLnNwbGljZShnZXRSYW5kb21JbnQodGhpcy5vcHRpb25zLmxlbmd0aCksIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW92ZUFyclswXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLy8gbGV0IHAgPSBQbGF5ZXIoKTtcclxuLy8gcC5yYW5kb21pc2VUYW5rcygpXHJcblxyXG5leHBvcnQgeyBQbGF5ZXIgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyLmpzXCJcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUdyaWQocGxheWVyLCBsZW5ndGg9MTApIHtcclxuICAgIGxldCBncmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGxlbmd0aDsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBsZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGJveC5pZCA9IGAke3BsYXllci5uYW1lfToke3h9LCR7eX1gXHJcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3gnKVxyXG4gICAgICAgICAgICBncmlkLmFwcGVuZChib3gpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllci5uYW1lID09PSBcIkh1bWFuXCIpIHtcclxuICAgICAgICAgICAgICAgIGJveC5vbm1vdXNlb3ZlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZVN0YXJ0ZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGlwcyA9IHBsYXllci5wbGF5ZXJHQi5pc1NoaXBQbGFjZVZhbGlkKHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHNoaXBBcnJheSBvZiBzaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJveElEID0gYEh1bWFuOiR7c2hpcEFycmF5WzBdfSwke3NoaXBBcnJheVsxXX1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJveElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdwb3RlbnRpYWwnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsIDk5LCA3MSwgMSknO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJveC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGlwcyA9IHBsYXllci5wbGF5ZXJHQi5wbGFjZVNoaXAoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc2hpcEFycmF5IG9mIHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94SUQgPSBgSHVtYW46JHtzaGlwQXJyYXlbMF19LCR7c2hpcEFycmF5WzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm94SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ3NoaXAnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNldEdhbWVNc2coKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYm94Lm9ubW91c2VsZWF2ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG90ZW50aWFsJylcclxuICAgICAgICAgICAgICAgICAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJveC5jbGFzc0xpc3QucmVtb3ZlKCdwb3RlbnRpYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FtZVN0YXJ0ZWQoKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBsYXllci5uYW1lID09PSBcIkFJXCIpIHtcclxuICAgICAgICAgICAgICAgIGJveC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lU3RhcnRlZCgpICYmIGlzSHVtYW5UdXJuICYmICFpc0dhbWVEb25lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFAyLnBsYXllckdCLnJlY2VpdmVBdHRhY2soeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tXaW5uZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNIdW1hblR1cm4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09ICdoaXQnKSBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gJ21pc3MnKSBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXB1dGVyTW92ZSA9IFAyLnJhbmRvbWlzZWRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRhY2tIdW1hbihjb21wdXRlck1vdmVbMF0sIGNvbXB1dGVyTW92ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja1dpbm5lcigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0h1bWFuVHVybiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcpXHJcbiAgICByZXR1cm4gZ3JpZFxyXG59XHJcblxyXG5sZXQgaXNIdW1hblR1cm4gPSB0cnVlO1xyXG5sZXQgaXNHYW1lRG9uZSA9IGZhbHNlO1xyXG5cclxuZnVuY3Rpb24gZ2FtZVN0YXJ0ZWQoKSB7XHJcbiAgICByZXR1cm4gUDEucGxheWVyR0IuaXNCb2FyZFNldCgpICYmIFAyLnBsYXllckdCLmlzQm9hcmRTZXQoKTsgXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaGVja1dpbm5lcigpIHtcclxuICAgIGlmIChQMS5wbGF5ZXJHQi5pc1NoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgaXNHYW1lRG9uZSA9IHRydWU7XHJcbiAgICAgICAgc2V0R2FtZU1zZyhcIkFJXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoUDIucGxheWVyR0IuaXNTaGlwc1N1bmsoKSkge1xyXG4gICAgICAgIGlzR2FtZURvbmUgPSB0cnVlO1xyXG4gICAgICAgIHNldEdhbWVNc2coXCJIdW1hblwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNrSHVtYW4oeCwgeSkge1xyXG4gICAgbGV0IGJveElEID0gYEh1bWFuOiR7eH0sJHt5fWA7XHJcbiAgICBsZXQgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm94SUQpXHJcbiAgICBsZXQgcmVzdWx0ID0gUDEucGxheWVyR0IucmVjZWl2ZUF0dGFjayh4LCB5KTtcclxuICAgIGlmIChyZXN1bHQgPT09ICdoaXQnKSBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsYWNrJztcclxuICAgIGVsc2UgaWYgKHJlc3VsdCA9PT0gJ21pc3MnKSBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2JsdWUnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRHYW1lTXNnKHdpbm5lcj1udWxsKSB7XHJcbiAgICBpZiAoIWdhbWVTdGFydGVkKCkpIG1lc3NhZ2VEaXYudGV4dENvbnRlbnQgPSBcIlBsYWNlIFRhbmtzXCI7XHJcbiAgICBlbHNlIGlmIChpc0dhbWVEb25lKSB7XHJcbiAgICAgICAgbWVzc2FnZURpdi50ZXh0Q29udGVudCA9IGAke3dpbm5lcn0gV2lucyFgO1xyXG4gICAgICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQocGxheUFnYWluQnRuKVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWVzc2FnZURpdi50ZXh0Q29udGVudCA9IFwiUGxheSFcIjtcclxuICAgICAgICBtZXNzYWdlRGl2LnN0eWxlLmNvbG9yID0gJ3JnYigxOSwgMTczLCAzNCknO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubGV0IFAxID0gUGxheWVyKCdIdW1hbicpO1xyXG5sZXQgUDIgPSBQbGF5ZXIoJ0FJJyk7XHJcblxyXG5sZXQgZ3JpZHNDb250YWluZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxubGV0IFAxR3JpZCA9IGNyZWF0ZUdyaWQoUDEpO1xyXG5sZXQgUDJHcmlkID0gY3JlYXRlR3JpZChQMik7XHJcbmxldCBjaGFuZ2VBeGlzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbmxldCBtZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbmxldCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcblxyXG5tZXNzYWdlRGl2LnRleHRDb250ZW50ID0gJ1BsYWNlIFRhbmtzJztcclxubWVzc2FnZURpdi5pZCA9ICdtZXNzYWdlLWRpdic7XHJcblxyXG5wbGF5QWdhaW5CdG4udGV4dENvbnRlbnQgPSAnUGxheSBBZ2FpbiEnXHJcbnBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuY2hhbmdlQXhpc0J0bi50ZXh0Q29udGVudCA9ICdDaGFuZ2UgQXhpcyc7XHJcbmNoYW5nZUF4aXNCdG4uaWQgPSAnY2hhbmdlLWF4aXMtYnRuJztcclxuY2hhbmdlQXhpc0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIFAxLnBsYXllckdCLnBsYWNlRGlyZWN0aW9uWSA9ICFQMS5wbGF5ZXJHQi5wbGFjZURpcmVjdGlvblk7XHJcbn0pXHJcblxyXG5ncmlkc0NvbnRhaW5lckRpdi5jbGFzc0xpc3QuYWRkKCdncmlkLWNvbnRhaW5lcicpXHJcbmdyaWRzQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKFAxR3JpZCk7XHJcbmdyaWRzQ29udGFpbmVyRGl2LmFwcGVuZENoaWxkKFAyR3JpZCk7XHJcblxyXG5QMi5yYW5kb21pc2VUYW5rcygpXHJcblxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdyaWRzQ29udGFpbmVyRGl2KTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjaGFuZ2VBeGlzQnRuKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lc3NhZ2VEaXYpXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==