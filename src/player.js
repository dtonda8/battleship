import { Gameboard } from "./gameboard.js";

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
        playerGB: Gameboard(),
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

export { Player }