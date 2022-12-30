import { Player } from "./player.js"

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


const P1 = Player('Human');
const P2 = Player('AI');

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