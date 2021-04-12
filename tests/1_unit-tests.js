const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('convertHandler should correctly read a whole number input.', () => {
    assert.isNumber(convertHandler.getNum('10L'));
  });
  
  test('convertHandler should correctly read a decimal number input.', () => {
    assert.isNumber(convertHandler.getNum('10.5mi'));
  });

  test('convertHandler should correctly read a fractional input.', () => {
    assert.isNumber(convertHandler.getNum('10/6km'));
  });

  test('convertHandler should correctly read a fractional input with a decimal.', () => {
    assert.isNumber(convertHandler.getNum('10.5/6gal'));
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', () => {
    assert.isNull(convertHandler.getNum('10.5/6/3lbs'));
  });
    
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', () => {
    assert.isNumber(convertHandler.getNum('kg'));
  });

  const allowUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
  test('convertHandler should correctly read each valid input unit.', () => {
    assert.include(allowUnits, convertHandler.getUnit('10L'));
  });

  test('convertHandler should correctly return an error for an invalid input unit.', () => {
    assert.isNull(convertHandler.getUnit('10pa'));
  });

  test('convertHandler should return the correct return unit for each valid input unit.', () => {
    assert.include(allowUnits, convertHandler.getReturnUnit('kg'));
    assert.include(allowUnits, convertHandler.getReturnUnit('lbs'));
    assert.include(allowUnits, convertHandler.getReturnUnit('mi'));
    assert.include(allowUnits, convertHandler.getReturnUnit('km'));
    assert.include(allowUnits, convertHandler.getReturnUnit('L'));
    assert.include(allowUnits, convertHandler.getReturnUnit('gal'));
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', () => {
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
  });

  test('convertHandler should correctly convert gal to L.', () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('convertHandler should correctly convert L to gal.', () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
  });

  test('convertHandler should correctly convert mi to km.', () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('convertHandler should correctly convert km to mi.', () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137);
  });
  test('convertHandler should correctly convert lbs to kg.', () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });
  test('convertHandler should correctly convert kg to lbs.', () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
  });
});