# JSBinaryUtils
https://www.npmjs.com/package/jsbinaryutils

## USE:
`npm i jsbinaryutils`

## Sample code
```js
const BinaryStream = require('jsbinaryutils')

let stream = new BinaryStream()

stream.writeByte(1)

console.log(stream.buffer)
```
