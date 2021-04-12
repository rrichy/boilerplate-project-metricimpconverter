const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input such as 10L: GET request to /api/convert.', (done) => {
    chai.request(server)
      .get('/api/convert?input=4gal')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"initNum":4,"initUnit":"gal","returnNum":15.14164,"returnUnit":"L","string":"4 gallons converts to 15.14164 liters"}');
        done();
      });
  });

  test('Convert an invalid input such as 32g: GET request to /api/convert.', (done) => {
    chai.request(server)
      .get('/api/convert?input=25.4mm')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', (done) => {
    chai.request(server)
      .get('/api/convert?input=10/2/4km')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', (done) => {
    chai.request(server)
      .get('/api/convert?input=10/2/4mm')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });

  test('Convert with no number such as kg: GET request to /api/convert.', (done) => {
    chai.request(server)
      .get('/api/convert?input=L')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"initNum":1,"initUnit":"L","returnNum":0.26417,"returnUnit":"gal","string":"1 liters converts to 0.26417 gallons"}');
        done();
      });
  });
});