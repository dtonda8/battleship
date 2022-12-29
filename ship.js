function Ship(length){
    return {
        length,
        hits: 0,
        hit(){
            this.hits++;
        },
        isSunk(){
            return this.length - this.hits <= 0;
        }
    }
}

// let sampleShip = ship(4);
// console.log(sampleShip.isSunk());

export {Ship}