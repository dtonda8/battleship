import {describe, expect, test} from '@jest/globals';
import { Gameboard } from "../gameboard";


describe('Gameboard', () => {
    let gb;

    beforeEach(() => {
        gb = Gameboard()
        gb.placeShip(0, 0);
    })

    test('Place ship at coordinate return array of coordinates of ship (vertical)', () => {
        expect(gb.placeShip(0, 6)).toStrictEqual([[0, 6], [0, 7], [0, 8], [0, 9]])
    })

    test('Place ship at coordinate return array of coordinates of ship (horizontal)', () => {
        gb.placeDirectionY = false;
        expect(gb.placeShip(6, 0)).toStrictEqual([[6, 0], [7, 0], [8, 0], [9, 0]])
    })

    test('Prevent user from placing ship outside map vertically', () => {
        expect(gb.placeShip(0, 7)).toBe(false)
    })

    test('Prevent user from placing ship outside map horizontally', () => {
        gb.placeDirectionY = false;
        expect(gb.placeShip(7, 0)).toBe(false)
    })

    test('Gameboard records shots', () => {
        gb.receiveAttack(7,7);
        expect(gb.isShotReceived[7][7]).toBe(true)
    })

    test('Gameboard recognises miss', () => {
        expect(gb.receiveAttack(7,7)).toBe("miss")
    })

    test('Gameboard recognises hit', () => {
        expect(gb.receiveAttack(0, 2)).toBe("hit")
    })

    test("Gameboard report if ships are sunk", () => {
        gb.receiveAttack(0, 0);
        gb.receiveAttack(0, 1);
        gb.receiveAttack(0, 2);
        gb.receiveAttack(0, 3);
        gb.receiveAttack(0, 4);

        expect(gb.isShipsSunk()).toBe(true)
    })

    test("Gameboard report if ships are not sunk", () => { 
        gb.receiveAttack(0, 0);
        gb.receiveAttack(0, 1);
        gb.receiveAttack(0, 2);
        gb.receiveAttack(0, 3);
        gb.receiveAttack(0, 5);

        expect(gb.isShipsSunk()).toBe(false)
    })

    test("Gameboard returns false when user tries to place ship in another ship", () => { 
        gb.placeShip(0, 2);
        expect(gb.placeShip(0, 2)).toBe(false)
    })

    test("Gameboard returns false when user tries to attack same position twice", () => { 
        gb.receiveAttack(0, 2);
        expect(gb.receiveAttack(0, 2)).toBe(false)
    })

    test("Board is set when all ships are placed", () => { 
        gb.placeShip(1, 0);
        gb.placeShip(2, 0);
        gb.placeShip(3, 0);
        gb.placeShip(4, 0);
        gb.placeShip(5, 0);
        expect(gb.isBoardSet()).toBe(true);
    })

    test("Board is not set when only some ships are placed", () => { 
        gb.placeShip(1, 0);
        gb.placeShip(2, 0);
        gb.placeShip(3, 0);
        gb.placeShip(4, 0);
        expect(gb.isBoardSet()).toBe(false);

    })


})