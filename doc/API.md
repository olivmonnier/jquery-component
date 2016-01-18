## API instance
### `model.data`
Object where all associate datas of component are stored.

### `model.get(key)`
Take as argument an attribute key of object `model.data` and return this value.

### `model.set(key, value)`
Pass in first argument the key name to declare or overwrite in `model.data` and then pass in second argument this value.
You can also pass in argument an object.

### `render(datas)`
Render the component with the template attribute declared and datas passed in argument (optional).
