'use strict';
var libjsonnet = require('./libjsonnet');

var Jsonnet = function() {
  var jsonnet_make = libjsonnet.cwrap('jsonnet_make', 'number', []);
  this.vm = jsonnet_make();
  this.jsonnet_realloc = libjsonnet.cwrap('jsonnet_realloc', 'number', ['number', 'number', 'number']);
  this.jsonnet_evaluate_snippet = libjsonnet.cwrap('jsonnet_evaluate_snippet', 'number', ['number', 'string', 'string', 'number']);
  this.jsonnet_destroy = libjsonnet.cwrap('jsonnet_destroy', 'number', ['number']);
};

module.exports.Jsonnet = Jsonnet;
module.exports.default = Jsonnet;
module.exports.FS = libjsonnet.FS;

Jsonnet.prototype.eval = function(code) {
  var error_ptr = libjsonnet._malloc(4);
  var output_ptr = this.jsonnet_evaluate_snippet(this.vm, "snippet", code, error_ptr);
  var error = libjsonnet.getValue(error_ptr, 'i32*');
  libjsonnet._free(error_ptr);
  var result = libjsonnet.Pointer_stringify(output_ptr);
  this.jsonnet_realloc(this.vm, output_ptr, 0);
  if (error) {
    throw new Error(result);
  }
  return JSON.parse(result);
};

Jsonnet.prototype.evalFile = function(filepath) {
  var code = libjsonnet.read(filepath);
  return this.eval(code);
};


Jsonnet.prototype.destroy = function() {
  this.jsonnet_destroy(this.vm);
};
