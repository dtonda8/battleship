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

export {Gameboard}