var Jsonnet = require("../lib/index");
var jsonnet = new Jsonnet();
var fs = require('fs');
var path = require('path');
var assert = require('power-assert');

describe('jsonnet', function(){
  describe('#eval() error', function(){
    it('should catch error and include foo string', function(){
      var filepath = path.join(__dirname, 'src' , 'error.jsonnet');
      var code = fs.readFileSync(filepath).toString();
      try {
        jsonnet.eval(code);
      } catch(e) {
        assert.ok(e);
        assert(/foo/.test(e));
      }
    })
  })
});
