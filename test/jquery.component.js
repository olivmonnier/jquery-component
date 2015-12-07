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
  assert.equal(typeof component.render, 'function', 'Is function');
});
QUnit.test('$.component API template', function(assert) {
  var component = $.component();
  assert.equal(typeof component.template, 'string', 'Is string');
});
QUnit.test('$.component API setBindData', function(assert) {
  var component = $.component();
  assert.equal(typeof component.setBindData, 'function', 'Is function');
});
QUnit.test('$.component API setEvents', function(assert) {
  var component = $.component();
  assert.equal(typeof component.setEvents, 'function', 'Is function');
});
QUnit.test('$.component API setModel', function(assert) {
  var component = $.component();
  assert.equal(typeof component.setModel, 'function', 'Is function');
});
QUnit.test('$.component API setTemplate', function(assert) {
  var component = $.component();
  assert.equal(typeof component.setTemplate, 'function', 'Is function');
});
