const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', () => assert.isNumber(convertHandler.getNum('10L')));
  test('convertHandler should correctly read a decimal number input.', () => assert.isNumber(convertHandler.getNum('10.5mi')));
  test('convertHandler should correctly read a fractional input.', () => assert.isNumber(convertHandler.getNum('10/6km')));
  test('convertHandler should correctly read a fractional input with a decimal.', () => assert.isNumber(convertHandler.getNum('10.5/6gal')));


  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => assert.isNull(convertHandler.getNum('10.5/6/3lbs')));
    
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => assert.isNumber(convertHandler.getNum('kg')));

  const allowUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
  test('convertHandler should correctly read each valid input unit.', () => assert.include(allowUnits, convertHandler.getUnit('10L')));
  // test('convertHandler should correctly return an error for an invalid input unit.', () => );
  // test('convertHandler should return the correct return unit for each valid input unit.', () => );
  // test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => );
  // test('convertHandler should correctly convert gal to L.', () => );
  // test('convertHandler should correctly convert L to gal.', () => );
  // test('convertHandler should correctly convert mi to km.', () => );
  // test('convertHandler should correctly convert km to mi.', () => );
  // test('convertHandler should correctly convert lbs to kg.', () => );
  // test('convertHandler should correctly convert kg to lbs.', () => );
});

/* 

test('convertHandler should correctly read each valid input unit.', () => );
test('convertHandler should correctly return an error for an invalid input unit.', () => );
test('convertHandler should return the correct return unit for each valid input unit.', () => );
test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => );
test('convertHandler should correctly convert gal to L.', () => );
test('convertHandler should correctly convert L to gal.', () => );
test('convertHandler should correctly convert mi to km.', () => );
test('convertHandler should correctly convert km to mi.', () => );
test('convertHandler should correctly convert lbs to kg.', () => );
test('convertHandler should correctly convert kg to lbs.', () => );


convertHandler should correctly read each valid input unit.
convertHandler should correctly return an error for an invalid input unit.
convertHandler should return the correct return unit for each valid input unit.
convertHandler should correctly return the spelled-out string unit for each valid input unit.
convertHandler should correctly convert gal to L.
convertHandler should correctly convert L to gal.
convertHandler should correctly convert mi to km.
convertHandler should correctly convert km to mi.
convertHandler should correctly convert lbs to kg.
convertHandler should correctly convert kg to lbs.
 */