## API instance
### `clone`
clone component instance. Useful for set new data.

### `model.data`
Object where all associate datas of component are stored.

### `model.get(key)`
Take as argument an attribute key of object `model.data` and return this value.

### `model.set(key, value)`
Pass in first argument the key name to declare or overwrite in `model.data` and then pass in second argument this value.
You can also pass in argument an object.

### `setBindData(callback)`
Set or replace the callback method called after a change on input, selector or textarea tag.

### `setChildren(children)`
Set or replace the children defined. Children argument must be in html.

### `setEvents(events)`
Set or replace events methods. Take as example Backbone events. ([doc](http://backbonejs.org/#View-events))

### `setModel(model)`
Set or replace object data used in your component.

### `setTemplate(newTemplate)`
Set or replace the template html of component.

### `render(datas, optionsTemplate)`
Render the component with the template attribute declared and datas passed in argument (optional). In second argument you can pass all options lodash template.
