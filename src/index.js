import { Player } from "./player.js"

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

let P1 = Player('Human');
let P2 = Player('AI');

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
