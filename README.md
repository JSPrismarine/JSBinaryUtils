# JSBinaryUtils
https://www.npmjs.com/package/jsbinaryutils

## USE:
npm i jsbinaryutils

## sample code
const BinaryStream = require('jsbinaryutils')

let stream = new BinaryStream()

stream.writeByte(1)

console.log(stream.buffer)
