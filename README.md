# jQuery.component

Create a component with jQuery. Inspired by Backbone View model.

![release](https://img.shields.io/badge/release-1.2.5-blue.svg)
![coverage](https://img.shields.io/badge/coverage-70%25-green.svg)
[![license](https://img.shields.io/badge/license-MIT%20License-blue.svg)](https://opensource.org/licenses/MIT)
![requirement](https://img.shields.io/badge/jquery-required-lightgrey.svg)(https://www.npmjs.com/package/jquery)
![requirement](https://img.shields.io/badge/lodash-required-lightgrey.svg)(https://www.npmjs.com/package/lodash)

## Requirement
You must include in your html jQuery and lodash.

## How to install
```terminal
npm install --save jquery.component
```
Include in your .html this library after jQuery and lodash files.

## How it works
### Basically
jquery.component use template method of lodash so you can integrate a template in your .html. For example :
```html
<script type="text/template" id="title-template">
  <div>
    <h1><%= data.title %></h1>
    <p class="content"></p>
  </div>
</script>
```
Then in your js file, call your template and declare events in component method:
```javascript
var titleComponent = $.component({
  template: $('#title-template').html(),
  events: {
    'click h1': function() {
      $(this).parent().find('p').append('Hello everyone !');
    }
  }
});
```
After that you can use your component with some datas using the render method:
```javascript
$('body').append(titleComponent.render({
  title: 'Hello World'
}));
```
### Children
If you want include another component or element in your component. You can use `data-children` attribute in the parent container:
```html
<script type="text/template" id="parent-template">
  <div>
      <h1>Hello World</h1>
      <div data-children></div>
  </div>
</script>

<script type="text/template" id="children-template">
  <h2>Hello Everyone</h2>
</script>

<script>
  var children = $.component({
    template: $('#children-template').html()
  });

  var parent = $.component({
    template: $('#parent-template').html(),
    children: children.render()
  });
</script>
```
### Bind datas
You can also bind your datas by declare a `data-bind-id` attribute with a name and then apply a `data-bind` attribute on another element with the name target. Follow this example:
```html
<script type="text/template" id="name-template">
  <div>
    <h1>My name is <span data-bind="name"></span></h1>
    <input type="text" data-bind-id="name"/>
  </div>
</script>

<script type="text/javascript">
  var componentName = $.component({
    template: $('#name-template').html(),
  });

  $('body').append(componentName.render());
</script>
```
It's possible to pass a callback method in $.component:
```javascript
var componentName = $.component({
  template: $('#name-template').html(),
  bindData: function (val) {
    return val + val;
  }
});
```
### Lifecycle of component
- `componentWillMount` method option run before the render of component.
- `componentDidMount` method option run after the render of component.
- `componentWillUpdate` method option run each time the component re-render before. As argument you can use old datas declared.
- `componentDidUpdate` method option run each time the component re-render after. As argument you can use old datas declared.

## Contributing
1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## Licence
```
MIT
```
