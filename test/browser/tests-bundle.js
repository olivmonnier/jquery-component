(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
QUnit.test('$.component', function(assert) {
  var component = $.component();
  assert.equal(typeof $.component, 'function', 'Is function ?');
  assert.equal(typeof component, 'object', 'No parameters');
});
QUnit.test('$.component API bindData', function(assert) {
  var component = $.component();
  assert.equal(component.bindData, null, 'Is null');
});
QUnit.test('$.component API model', function(assert) {
  var component = $.component();
  assert.equal(typeof component.model, 'object', 'Is object');
});
QUnit.test('$.component API render', function(assert) {
  var component = $.component();
  assert.equal(typeof component.render, 'function', 'Is function ?');
});
QUnit.test('$.component API template', function(assert) {
  var component = $.component();
  assert.equal(typeof component.template, 'string', 'Is string');
});

},{}]},{},[1]);
