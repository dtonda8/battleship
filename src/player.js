import { Gameboard } from "./gameboard.js";

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
        playerGB: Gameboard(),
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

export { Player }