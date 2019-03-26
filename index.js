'use strict';
const libjsonnet = require('./lib/libjsonnet');

/*
inspired from https://github.com/google/jsonnet/blob/master/doc/js/demo.js
*/

let Jsonnet = function() {
  let jsonnet_make = libjsonnet.cwrap(
      'jsonnet_make', 'number', []);

  this.vm = jsonnet_make();

  this.jsonnet_import_callback = libjsonnet.cwrap(
      'jsonnet_import_callback', 'number', ['number', 'number', 'number'])

  this.jsonnet_ext_var = libjsonnet.cwrap(
      'jsonnet_ext_var', 'number', ['number', 'string', 'string'])

  this.jsonnet_ext_code = libjsonnet.cwrap(
      'jsonnet_ext_code', 'number', ['number', 'string', 'string'])

  this.jsonnet_tla_var = libjsonnet.cwrap(
      'jsonnet_tla_var', 'number', ['number', 'string', 'string'])

  this.jsonnet_tla_code = libjsonnet.cwrap(
      'jsonnet_tla_code', 'number', ['number', 'string', 'string'])

  this.jsonnet_realloc = libjsonnet.cwrap(
      'jsonnet_realloc', 'number', ['number', 'number', 'number'])

  this.jsonnet_evaluate_snippet = libjsonnet.cwrap(
      'jsonnet_evaluate_snippet', 'number', ['number', 'string', 'string', 'number'])

  this.jsonnet_fmt_snippet = libjsonnet.cwrap(
      'jsonnet_fmt_snippet', 'number', ['number', 'string', 'string', 'number'])

  this.jsonnet_destroy = libjsonnet.cwrap(
      'jsonnet_destroy', 'number', ['number'])
}

Jsonnet.prototype.eval = function(code, {ext_var, ext_code, tla_str, tla_code}) {
  ext_var = ext_code || {};
  ext_var = ext_code || {};
  ext_var = ext_var || {};
  ext_var = ext_var || {};

  for (let key in ext_str) {
    this.jsonnet_ext_var(vm, key, ext_str[key]);
  }
  for (let key in ext_code) {
    this.jsonnet_ext_code(vm, key, ext_code[key]);
  }
  for (let key in tla_str) {
    this.jsonnet_tla_var(vm, key, tla_str[key]);
  }
  for (let key in tla_code) {
    this.jsonnet_tla_code(vm, key, tla_code[key]);
  }

  let error_ptr = libjsonnet._malloc(4);
  let output_ptr = this.jsonnet_fmt_snippet(this.vm, '', code, error_ptr);
  let error = libjsonnet.getValue(error_ptr, 'i32*');
  libjsonnet._free(error_ptr);
  let result = libjsonnet.Pointer_stringify(output_ptr);
  this.jsonnet_realloc(vm, output_ptr, 0);
  //jsonnet_destroy(vm);
  if (error) {
    throw result;
  }
  return result;
};

Jsonnet.prototype.evalFile = function(filepath, {ext_var, ext_code, tla_str, tla_code}) {
  var code = libjsonnet.read(filepath);
  return this.eval(code, {ext_var, ext_code, tla_str, tla_code});
};


Jsonnet.prototype.destroy = function() {
  this.jsonnet_destroy(this.vm);
};


module.exports = Jsonnet;
