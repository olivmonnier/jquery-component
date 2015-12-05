QUnit.test('$.component', function(assert) {
  var component = $.component();
  assert.equal(typeof $.component, 'function', 'Is function ?');
  assert.equal(typeof component, 'object', 'No parameters');
});

QUnit.test('$.component API render', function(assert) {
  var component = $.component();
  assert.equal(typeof component.render, 'function', 'Is function ?');
});
