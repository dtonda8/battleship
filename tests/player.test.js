import {describe, expect, test} from '@jest/globals';
import { Player } from '../player';

describe("Player", () => {

    let p;
    beforeEach(() => {
        p = Player;
    });

    test("Check", () => {
        p.placeShip()
        expect(p.isBoardSet()).toBe(true);
    });
});