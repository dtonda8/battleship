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

    } else messageDiv.textContent = "Play!";

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

function buildLayout() {

}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBwcmVwYXJlQm9hcmQoKXtcclxuICAgIGxldCBib2FyZCA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKXtcclxuICAgICAgICBib2FyZC5wdXNoKFsuLi5BcnJheSgxMCldLm1hcCgoKSA9PiBmYWxzZSkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGhpdHNSZW1haW5pbmc6IDAsXHJcbiAgICAgICAgYm9hcmQ6IHByZXBhcmVCb2FyZCgpLFxyXG4gICAgICAgIGlzU2hvdFJlY2VpdmVkOiBwcmVwYXJlQm9hcmQoKSxcclxuICAgICAgICBzaGlwTGVuZ3Roc1RvQWRkOiBbNSwgNCwgMywgMywgMl0sXHJcbiAgICAgICAgcGxhY2VEaXJlY3Rpb25ZOiB0cnVlLFxyXG4gICAgICAgIGlzU2hpcFBsYWNlVmFsaWQ6IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgICAgICAgICAgbGV0IHNoaXAgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNoaXBMZW5ndGggPSB0aGlzLnNoaXBMZW5ndGhzVG9BZGRbMF07XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnBsYWNlRGlyZWN0aW9uWSl7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHkgKyBpIDw9IDkgJiYgIXRoaXMuYm9hcmRbeF1beSArIGldKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcC5wdXNoKFt4LCB5ICsgaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4ICsgaSA8PSA5ICYmICF0aGlzLmJvYXJkW3ggKyBpXVt5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXAucHVzaChbeCArIGksIHldKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2hpcDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsYWNlU2hpcDogZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgICAgICAgICBsZXQgc2hpcCA9IHRoaXMuaXNTaGlwUGxhY2VWYWxpZCh4LCB5KTtcclxuICAgICAgICAgICAgaWYoc2hpcCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXJyIG9mIHNoaXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IGFyclswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IGFyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuaGl0c1JlbWFpbmluZyArPSB0aGlzLnNoaXBMZW5ndGhzVG9BZGQuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzaGlwOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlY2VpdmVBdHRhY2s6IGZ1bmN0aW9uKHgsIHkpeyAgXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Nob3RSZWNlaXZlZFt4XVt5XSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvdFJlY2VpdmVkW3hdW3ldID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ib2FyZFt4XVt5XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRzUmVtYWluaW5nLS07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdoaXQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdtaXNzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlzU2hpcHNTdW5rOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oaXRzUmVtYWluaW5nIDw9IDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0JvYXJkU2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hpcExlbmd0aHNUb0FkZC5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtHYW1lYm9hcmR9IiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBwb3NzaWJsZU9wdGlvbnMoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnB1c2goW2ksIGpdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxufVxyXG5cclxubGV0IGF0dGFja09wdGlvbnMgPSBwb3NzaWJsZU9wdGlvbnMoKTtcclxuICBcclxuICBcclxuZnVuY3Rpb24gUGxheWVyKG5hbWUpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHBsYXllckdCOiBHYW1lYm9hcmQoKSxcclxuICAgICAgICBvcHRpb25zOiBhdHRhY2tPcHRpb25zLFxyXG4gICAgICAgIHJhbmRvbWlzZVRhbmtzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgd2hpbGUgKCF0aGlzLnBsYXllckdCLmlzQm9hcmRTZXQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJHQi5wbGFjZURpcmVjdGlvblkgPSBCb29sZWFuKGdldFJhbmRvbUludCgyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllckdCLnBsYWNlU2hpcChnZXRSYW5kb21JbnQoMTApLCBnZXRSYW5kb21JbnQoMTApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIEZvciBBSVxyXG4gICAgICAgIGF0dGVtcHRlZEF0dGFja3M6IFtdLFxyXG4gICAgICAgIHJhbmRvbWlzZWRNb3ZlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IG1vdmVBcnIgPSB0aGlzLm9wdGlvbnMuc3BsaWNlKGdldFJhbmRvbUludCh0aGlzLm9wdGlvbnMubGVuZ3RoKSwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtb3ZlQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG4vLyBsZXQgcCA9IFBsYXllcigpO1xyXG4vLyBwLnJhbmRvbWlzZVRhbmtzKClcclxuXHJcbmV4cG9ydCB7IFBsYXllciB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXIuanNcIlxyXG5cclxuZnVuY3Rpb24gY3JlYXRlR3JpZChwbGF5ZXIsIGxlbmd0aD0xMCkge1xyXG4gICAgbGV0IGdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbGVuZ3RoOyB5KyspIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYm94LmlkID0gYCR7cGxheWVyLm5hbWV9OiR7eH0sJHt5fWBcclxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXHJcbiAgICAgICAgICAgIGdyaWQuYXBwZW5kKGJveCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyLm5hbWUgPT09IFwiSHVtYW5cIikge1xyXG4gICAgICAgICAgICAgICAgYm94Lm9ubW91c2VvdmVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lU3RhcnRlZCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoaXBzID0gcGxheWVyLnBsYXllckdCLmlzU2hpcFBsYWNlVmFsaWQoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc2hpcEFycmF5IG9mIHNoaXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94SUQgPSBgSHVtYW46JHtzaGlwQXJyYXlbMF19LCR7c2hpcEFycmF5WzFdfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm94SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ3BvdGVudGlhbCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgOTksIDcxLCAxKSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYm94Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNoaXBzID0gcGxheWVyLnBsYXllckdCLnBsYWNlU2hpcCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBzaGlwQXJyYXkgb2Ygc2hpcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3hJRCA9IGBIdW1hbjoke3NoaXBBcnJheVswXX0sJHtzaGlwQXJyYXlbMV19YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib3hJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnc2hpcCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0R2FtZU1zZygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBib3gub25tb3VzZWxlYXZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3RlbnRpYWwnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5yZW1vdmUoJ3BvdGVudGlhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lU3RhcnRlZCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGxheWVyLm5hbWUgPT09IFwiQUlcIikge1xyXG4gICAgICAgICAgICAgICAgYm94Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdhbWVTdGFydGVkKCkgJiYgaXNIdW1hblR1cm4gJiYgIWlzR2FtZURvbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gUDIucGxheWVyR0IucmVjZWl2ZUF0dGFjayh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1dpbm5lcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0h1bWFuVHVybiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gJ2hpdCcpIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzdWx0ID09PSAnbWlzcycpIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tcHV0ZXJNb3ZlID0gUDIucmFuZG9taXNlZE1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGFja0h1bWFuKGNvbXB1dGVyTW92ZVswXSwgY29tcHV0ZXJNb3ZlWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrV2lubmVyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzSHVtYW5UdXJuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJylcclxuICAgIHJldHVybiBncmlkXHJcbn1cclxuXHJcbmxldCBpc0h1bWFuVHVybiA9IHRydWU7XHJcbmxldCBpc0dhbWVEb25lID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBnYW1lU3RhcnRlZCgpIHtcclxuICAgIHJldHVybiBQMS5wbGF5ZXJHQi5pc0JvYXJkU2V0KCkgJiYgUDIucGxheWVyR0IuaXNCb2FyZFNldCgpOyBcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNoZWNrV2lubmVyKCkge1xyXG4gICAgaWYgKFAxLnBsYXllckdCLmlzU2hpcHNTdW5rKCkpIHtcclxuICAgICAgICBpc0dhbWVEb25lID0gdHJ1ZTtcclxuICAgICAgICBzZXRHYW1lTXNnKFwiQUlcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChQMi5wbGF5ZXJHQi5pc1NoaXBzU3VuaygpKSB7XHJcbiAgICAgICAgaXNHYW1lRG9uZSA9IHRydWU7XHJcbiAgICAgICAgc2V0R2FtZU1zZyhcIkh1bWFuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhdHRhY2tIdW1hbih4LCB5KSB7XHJcbiAgICBsZXQgYm94SUQgPSBgSHVtYW46JHt4fSwke3l9YDtcclxuICAgIGxldCBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib3hJRClcclxuICAgIGxldCByZXN1bHQgPSBQMS5wbGF5ZXJHQi5yZWNlaXZlQXR0YWNrKHgsIHkpO1xyXG4gICAgaWYgKHJlc3VsdCA9PT0gJ2hpdCcpIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xyXG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSAnbWlzcycpIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmx1ZSc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEdhbWVNc2cod2lubmVyPW51bGwpIHtcclxuICAgIGlmICghZ2FtZVN0YXJ0ZWQoKSkgbWVzc2FnZURpdi50ZXh0Q29udGVudCA9IFwiUGxhY2UgVGFua3NcIjtcclxuICAgIGVsc2UgaWYgKGlzR2FtZURvbmUpIHtcclxuICAgICAgICBtZXNzYWdlRGl2LnRleHRDb250ZW50ID0gYCR7d2lubmVyfSBXaW5zIWA7XHJcbiAgICAgICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChwbGF5QWdhaW5CdG4pXHJcblxyXG4gICAgfSBlbHNlIG1lc3NhZ2VEaXYudGV4dENvbnRlbnQgPSBcIlBsYXkhXCI7XHJcblxyXG59XHJcblxyXG5sZXQgUDEgPSBQbGF5ZXIoJ0h1bWFuJyk7XHJcbmxldCBQMiA9IFBsYXllcignQUknKTtcclxuXHJcbmxldCBncmlkc0NvbnRhaW5lckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5sZXQgUDFHcmlkID0gY3JlYXRlR3JpZChQMSk7XHJcbmxldCBQMkdyaWQgPSBjcmVhdGVHcmlkKFAyKTtcclxubGV0IGNoYW5nZUF4aXNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxubGV0IG1lc3NhZ2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxubGV0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuXHJcbm1lc3NhZ2VEaXYudGV4dENvbnRlbnQgPSAnUGxhY2UgVGFua3MnO1xyXG5tZXNzYWdlRGl2LmlkID0gJ21lc3NhZ2UtZGl2JztcclxuXHJcbnBsYXlBZ2FpbkJ0bi50ZXh0Q29udGVudCA9ICdQbGF5IEFnYWluISdcclxucGxheUFnYWluQnRuLm9uY2xpY2sgPSAoKSA9PiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcblxyXG5jaGFuZ2VBeGlzQnRuLnRleHRDb250ZW50ID0gJ0NoYW5nZSBBeGlzJztcclxuY2hhbmdlQXhpc0J0bi5pZCA9ICdjaGFuZ2UtYXhpcy1idG4nO1xyXG5jaGFuZ2VBeGlzQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgUDEucGxheWVyR0IucGxhY2VEaXJlY3Rpb25ZID0gIVAxLnBsYXllckdCLnBsYWNlRGlyZWN0aW9uWTtcclxufSlcclxuXHJcbmZ1bmN0aW9uIGJ1aWxkTGF5b3V0KCkge1xyXG5cclxufVxyXG5cclxuZ3JpZHNDb250YWluZXJEaXYuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jb250YWluZXInKVxyXG5ncmlkc0NvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChQMUdyaWQpO1xyXG5ncmlkc0NvbnRhaW5lckRpdi5hcHBlbmRDaGlsZChQMkdyaWQpO1xyXG5cclxuUDIucmFuZG9taXNlVGFua3MoKVxyXG5cclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChncmlkc0NvbnRhaW5lckRpdik7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hhbmdlQXhpc0J0bilcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtZXNzYWdlRGl2KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=