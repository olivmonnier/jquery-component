require('./jquery.bindData');
require('./jquery.events');

QUnit.test('$.component', function(assert) {
  var component = $.component();
  assert.equal(typeof $.component, 'function', 'Is function ?');
  assert.equal(typeof component, 'object', 'No parameters');
});

QUnit.test('$.component API bindData', function(assert) {
  var component = $.component();
  assert.equal(component.bindData, null, 'Is null');
});

QUnit.test('$.component API children', function(assert) {
  var component = $.component();
  assert.equal(component.children, '', 'Is an empty string');

  var component2 = $.component({
    template: '<span></span>',
    children: function() {
      return document.createElement('span');
    }
  });
  component2.render();
  assert.equal(typeof component2.children, 'object', 'Is become an object after render running');

  var child = $.component({
    template: '<span>Foo</span>'
  });
  var component3 = $.component({
    template: '<div><div data-children></div></div>',
    children: child.render()
  });
  component3.render();
  assert.equal(component3.$el.children().length, 1, 'Is populating by children after render running');

  var component4 = $.component({
    template: '<div><div data-child="foo"></div></div>',
    children: {
      foo: child.render()
    }
  });
  component4.render();
  assert.equal(component4.$el.find('[data-child="foo"]').children().length, 1, 'Is populating by children object key');
});

QUnit.test('$.component API clone', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.clone, 'function', 'Is function');

  var component2 = component1.clone();
  assert.equal(typeof component2, 'object', 'Is an object');
  assert.equal(typeof component2.render, 'function', 'Is a deep clone');

  component1.render({foo: 'bar'});
  component2.render({foo: 'baz'});
  assert.equal(component1.model.data.foo, 'bar', 'Is data declare on render launch for component1');
  assert.equal(component2.model.data.foo, 'baz', 'Is data declare on render launch for component2');
});

QUnit.test('$.component API componentDidMount', function(assert) {
  var component1 = $.component();
  assert.equal(component1.componentDidMount, null, 'Is null');

  var count = 0;
  var component2 = $.component({
    componentDidMount: function() {
      count++;
    }
  });
  for (var i = 0; i < 2; i++) {
    component2.render();
  }
  assert.equal(count, 1, 'Expect run in first time on render');
});

QUnit.test('$.component API componentDidUpdate', function(assert) {
  var component1 = $.component();
  assert.equal(component1.componentDidUpdate, null, 'Is null');

  var count = 0;
  var component2 = $.component({
    componentDidUpdate: function() {
      count++;
    }
  });
  for (var i = 0; i < 3; i++) {
    component2.render();

    if (i === 0) {
      assert.equal(count, 0, 'Expect not run in first time on render');
    }
  }
  assert.equal(count, 2, 'Expect run each time render is called');
});

QUnit.test('$.component API componentWillMount', function(assert) {
  var component1 = $.component();
  assert.equal(component1.componentWillMount, null, 'Is null');

  var count = 0;
  var component2 = $.component({
    componentWillMount: function() {
      count++;
    }
  });
  for (var i = 0; i < 2; i++) {
    component2.render();
  }
  assert.equal(count, 1, 'Expect run in first time on render');
});

QUnit.test('$.component API componentWillUpdate', function(assert) {
  var component1 = $.component();
  assert.equal(component1.componentWillUpdate, null, 'Is null');

  var count = 0;
  var component2 = $.component({
    componentWillUpdate: function() {
      count++;
    }
  });
  for (var i = 0; i < 3; i++) {
    component2.render();
    if (i === 0) {
      assert.equal(count, 0, 'Expect not run in first time on render');
    }
  }
  assert.equal(count, 2, 'Expect run each time render is called');
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
  var component1 = $.component();
  assert.equal(typeof component1.render, 'function', 'Is function');
  assert.equal(component1.mounted, false, 'Is not declared as mounted before render running');

  component1.render({foo: 'bar'});
  assert.equal(component1.mounted, true, 'Is declared as mounted after render running');
  assert.equal(component1.model.data.foo, 'bar', 'Is updating the model');

  var template = '<h1>Hello World</h1>';
  var component2 = $.component({ template: template });
  assert.deepEqual(component2.render(), $(template), 'Expect return element defined in template');
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
  var component1 = $.component();
  assert.equal(typeof component1.setBindData, 'function', 'Is function');

  var component2 = $.component();
  var bindData = function(val) {
    return val + val;
  };
  component2.setBindData(bindData);
  assert.deepEqual(component2.bindData, bindData, 'Expect set attribute bindData in component');
});

QUnit.test('$.component API setChildren', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.setChildren, 'function', 'Is function');

  var component2 = $.component();
  var children = '<h1>Hello World !</h1>';
  component2.setChildren(children);
  assert.equal(component2.children, children, 'Expect set attribute children in component');
});

QUnit.test('$.component API setEvents', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.setEvents, 'function', 'Is function');

  var component2 = $.component();
  var events = {
    'click body': function() {
      console.log('Clicked !');
    }
  };
  component2.setEvents(events);
  assert.deepEqual(component2.events, events, 'Expect set attribute events in component');
});

QUnit.test('$.component API setModel', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.setModel, 'function', 'Is function');

  var component2 = $.component({
    model: {
      msg: 'Hello World'
    }
  });
  component2.setModel({
    msg: 'Hello Everyone'
  });
  assert.equal(component2.model.data.msg, 'Hello Everyone', 'Expect set value in model.data');
});

QUnit.test('$.component API setTemplate', function(assert) {
  var component1 = $.component();
  assert.equal(typeof component1.setTemplate, 'function', 'Is function');

  var component2 = $.component();
  var template = '<h1>Hello World !</h1>';
  component2.setTemplate(template);
  assert.equal(component2.template, template, 'Expect set attribute template in component');
});
