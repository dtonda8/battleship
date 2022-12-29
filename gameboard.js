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
        placeShip: function(x, y) {
            let ship = [];
            let shipLength = this.shipLengthsToAdd[0];

            if(this.placeDirectionY){
                for (let i = 0; i < shipLength; i++){
                    if (y + i <= 9 && !this.board[x][y + i]){
                        ship.push([x, y + i]);
                        this.board[x][y + i] = true;
                    } else return false;
                }

            } else {
                for (let i = 0; i < shipLength; i++){
                    if (x + i <= 9 && !this.board[x + i][y]){
                        ship.push([x + i, y]);
                        this.board[x + i][y] = true;
                    } else return false;
                }
            }

            this.hitsRemaining += this.shipLengthsToAdd.shift();
            return ship;
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
        }   
    }
}

export {Gameboard}