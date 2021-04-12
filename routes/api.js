'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const { input } = req.query;

      let initNum = convertHandler.getNum(input),
        initUnit = convertHandler.getUnit(input);

      if(!initNum && !initUnit) res.send('invalid number and unit');
      else if(!initNum) res.send('invalid number');
      else if(!initUnit) res.send('invalid unit');
      else {
        let returnNum = convertHandler.convert(initNum, initUnit),
          returnUnit = convertHandler.getReturnUnit(initUnit);

        res.json({
          initNum, initUnit, returnNum, returnUnit,
          'string': convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
        });

        // console.log({input: input,
        //   initNum, initUnit, returnNum, returnUnit,
        //   'string': convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
        // });
      }
    });
};
