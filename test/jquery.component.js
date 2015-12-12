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

QUnit.test('$.component API model.data', function(assert) {
  var component = $.component();
  assert.equal(typeof component.model.data, 'object', 'Is object');
});

QUnit.test('$.component API model.get', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.model.get, 'function', 'Is function');
  var component2 = $.component({
    model: {
      msg: 'Hello World'
    }
  });
  assert.equal(component2.model.get('msg'), 'Hello World', 'Expect return value declared');
});

QUnit.test('$.component API model.set', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.model.set, 'function', 'Is function');
  var component2 = $.component({
    model: {
      msg: 'Hello World'
    }
  });
  component2.model.set({msg: 'Hello Everyone'});
  assert.equal(component2.model.data.msg, 'Hello Everyone', 'Expect set value in model.data');
});

QUnit.test('$.component API render', function(assert) {
  var component = $.component();
  assert.equal(typeof component.render, 'function', 'Is function');
});

QUnit.test('$.component API template', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.template, 'string', 'Is string');
  var component2 = $.component({
    template: $('body').html()
  });
  assert.equal(typeof component2.template, 'string', 'Expect return a string with a selector');
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
