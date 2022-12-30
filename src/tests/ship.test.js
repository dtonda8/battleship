import {describe, expect, test} from '@jest/globals';
import { Ship } from "../ship";


describe('Ship', () =>{
    let sampleShip;
    beforeEach(() => {
        sampleShip = Ship(4);
    });
    
    test('ship object hits increase when hit', () => {
        sampleShip.hit();
        sampleShip.hit();
        expect(sampleShip.hits).toBe(2);
      });
    
      
    test('ship object does not sink when hit an insufficient amount times', () => {
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        expect(sampleShip.isSunk()).toBe(false);
      });
    
    
    test('ship object does sink when hit a sufficient amount times', () => {
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        expect(sampleShip.isSunk()).toBe(true);
    });
    
    
    test('ship object is still sunk when hit more than enough times', () => {
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        sampleShip.hit();
        expect(sampleShip.isSunk()).toBe(true);
    });
});
