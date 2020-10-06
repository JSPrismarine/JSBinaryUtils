const BinaryStream = require('./binarystream')

describe('binarystream', () => {
    it.skip('stream should write bool correctly', () => {
        const stream = new BinaryStream(Buffer.alloc(1), 0)
        stream.writeBool(true)
        expect(stream.readBool()).toBe(true)
    })
})
