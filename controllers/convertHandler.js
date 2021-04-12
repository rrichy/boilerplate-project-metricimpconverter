function ConvertHandler() {
  this.getNum = function(input = '') {
    if(/\//.test(input) && input.match(/\//g).length > 1) return null;
    
    let match = input.match(/(\d+[\/\d. ]*|\d)?/)[0] || 1;
    if(match == 0) return null;
    
    return Number(eval(match));
  };
  
  this.getUnit = function(input) {
    if(/(gal|mi|km|lbs|l|kg)$/i.test(input)){
      if(input.match(/gal|mi|km|lbs|l|kg/gi).length > 1) return null;
      let match = input.match(/gal|mi|km|lbs|l|kg/gi)[0].toLowerCase();
      return match === 'l' ? 'L' : match;
    }
    else return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnit = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return returnUnit[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitSpell = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitSpell[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const converter = {
      'gal': (num) => Math.round(num * galToL * 100000) / 100000,
      'l': (num) => Math.round(num / galToL * 100000) / 100000,
      'mi': (num) => Math.round(num * miToKm * 100000) / 100000,
      'km': (num) => Math.round(num / miToKm * 100000) / 100000,
      'lbs': (num) => Math.round(num * lbsToKg * 100000) / 100000,
      'kg': (num) => Math.round(num / lbsToKg * 100000) / 100000,
    }
    
    return converter[initUnit.toLowerCase()](initNum);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
