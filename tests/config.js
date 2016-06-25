// tests/config.js
var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var config = require('../index').config;
process.env.CONFIG_PATH = "./tests/config";

describe('config', function() {
  it('getSubtotal() should return 0 if no items are passed in', function() {   
        var tt = new config(); 
        console.log(tt.appSettings);
        expect(tt.appSettings).to.not.equal(undefined);
  });
});