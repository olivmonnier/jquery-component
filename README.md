# jQuery.component

Create a component with jQuery. Inspired by Backbone View model.

[![license](https://img.shields.io/badge/license-MIT%20License-blue.svg)](https://opensource.org/licenses/MIT)

## How to install
```terminal
npm install --save jquery.component
```
Include in your .html this library after jQuery file.

## How it work
jquery.component use template method of lodash so you can integrate a template in your .html. For example :
```html
<script type="text/template" id="title-template">
  <div>
    <h1><%= data.msg %></h1>
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
  data: {
    msg: 'Hello World'
  }
}));
```
