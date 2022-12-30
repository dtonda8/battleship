import {describe, expect, test} from '@jest/globals';
import { Player } from '../player';

describe("Player", () => {

    let p;
    beforeEach(() => {
        p = Player();
    });

    test("Player object returns a value", () => {
        expect(p.playerGB).toBeTruthy();
    });
});