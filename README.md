# JSBinaryUtils
https://www.npmjs.com/package/@jsprismarine/jsbinaryutils

## USE:
```
# Yarn
$ yarn add @jsprismarine/jsbinaryutils
# NPM
$ npm i @jsprismarine/jsbinaryutils
```

## Sample code
```js
const BinaryStream = require('jsbinaryutils')

let stream = new BinaryStream()

stream.writeByte(1)

console.log(stream.buffer)
```
