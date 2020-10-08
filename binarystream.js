'use strict'

// Class used to manage binary data
// a BinaryStream instance is just read or just write
// because they share the same offset
class BinaryStream {

    #buffer 
    #offset

    constructor(buffer = Buffer.alloc(0), offset = 0) {
        this.#buffer = buffer
        this.#offset = offset
    }

    /**
     * Appends a buffer to the binary one.
     * 
     * @param {Buffer} buffer 
     */
    append(buffer) {
        this.#buffer = Buffer.concat([this.#buffer, buffer])
        this.addOffset(Buffer.byteLength(buffer))
    }

    // Reads a buffer slice with the given length
    // from the actual offset to the offset + len
    read(len) {
        return this.#buffer.slice(this.#offset, this.addOffset(len, true))
    }

    // Reads an unsigned byte (0 - 255)
    readByte() {
        return this.#buffer.readUInt8(this.addOffset(1))
    }

    // Reads a signed byte (-128 - 127)
    readSignedByte() {
        return this.#buffer.readInt8(this.addOffset(1))
    }

    // Writes an unsigned / signed byte 
    writeByte(v) {
        this.append(Buffer.from([v & 0xff]))
    }

    // Reads a boolean byte
    readBool() {
        return this.readByte() !== 0
    }

    // Writes a boolean byte
    writeBool(v) {
        this.writeByte(v ? 1 : 0)
    }

    // Reads a 16 bit unsigned big endian number
    readShort() {
        return this.#buffer.readUInt16BE(this.addOffset(2))
    }

    // Reads a 16 bit signed big endian number
    readSignedShort() {
        return this.#buffer.readInt16BE(this.addOffset(2))
    }

    // Writes a 16 bit signed / unsigned big endian number
    writeShort(v) {
    	let buf = Buffer.alloc(2)
        buf.writeUInt16BE(v)
        this.append(buf)
    }

    // Reads an unsigned 16 bit little endian number
    readLShort() {
        return this.#buffer.readUInt16LE(this.addOffset(2))
    }

    // Reads a signed 16 bit little endian number
    readSignedLShort() {
        return this.#buffer.readInt16LE(this.addOffset(2))
    }

    // Writes a 16 bit signed / unsigned little endian number
    writeLShort(v) {
        this.writeByte(v & 0xff) 
        this.writeByte((v >> 8) & 0xff)
    }

    // Reads a 3 byte signed big endian number
    readTriad() {
        return this.#buffer.readIntBE(this.addOffset(3), 3)
    }

    // Writes a 3 byte unsigned big endian number
    writeTriad(v) {
        let buffer = Buffer.alloc(3)
        buffer.writeIntBE(v, 0, 3)
        this.append(buffer)
    }

    // Reads a 3 byte signed little endian number
    readLTriad() {
        return this.#buffer.readUIntLE(this.addOffset(3), 3)
    }

    // Reads a 3 byte unsigned little endian number
    writeLTriad(v) {
        let buf = Buffer.alloc(3)
        buf.writeUIntLE(v, 0, 3)
        this.append(buf)
    }

    // Reads a 4 byte signed integer
    readInt() {
        return this.#buffer.readInt32BE(this.addOffset(4))
    }

    // Writes a 4 byte signed integer
    writeInt(v) {
        let buffer = Buffer.alloc(4)
        buffer.writeInt32BE(v)
        this.append(buffer)
    }

    // Reads a 4 byte signed little endian integer
    readLInt() {
        return this.#buffer.readInt32LE(this.addOffset(4))
    }

    // Writes a 32 bit signed little endian integer
    writeLInt(v) {
        let buffer = Buffer.alloc(4)
        buffer.writeInt32LE(v)
        this.append(buffer)
    }

    // Reads a 4 byte floating-point number
    readFloat() {
        return this.#buffer.readFloatBE(this.addOffset(4))
    }

    // Reads a 4 byte floating-point number, rounded to the specified precision
    readRoundedFloat(precision) {
        return Math.fround(this.readFloat()).toPrecision(precision)
    }

    // Writes a 4 byte floating-point number
    writeFloat(v) {
        let buffer = Buffer.alloc(4)
        buffer.writeFloatBE(v)
        this.append(buffer)
    }

    // Reads a 4 byte little endian floating-point number
    readLFloat() {
        return this.#buffer.readFloatLE(this.addOffset(4))
    }

    // Reads a 4 byte little endian floating-point number, rounded to the specified precision
    readRoundedLFloat(precision) {
        return Math.fround(this.readLFloat()).toPrecision(precision)
    }

    // Writes a 4 byte little endian floating-point number
    writeLFloat(v) {
        let buffer = Buffer.alloc(4)
        buffer.writeFloatLE(v)
        this.append(buffer)
    }

    // Reads an 8 byte floating-point number
    readDouble() {
        return this.#buffer.readDoubleBE(this.addOffset(8))
    }

    // Writes an 8 byte floating-point number
    writeDouble(v) {
        let buffer = Buffer.alloc(8)
        buffer.writeDoubleBE(v)
        this.append(buffer)
    }

    // Reads an 8 byte little endian floating-point number
    readLDouble() {
        return this.#buffer.readDoubleLE(this.addOffset(8))
    }

    // Writes an 8 byte little endian floating-poinr number
    writeLDouble(v) {
        let buffer = Buffer.alloc(8)
        buffer.writeDoubleLE(v)
        this.append(v)
    }

    // Reads an 8 byte integer
    readLong() {
        return this.#buffer.readBigInt64BE(this.addOffset(8))
    }

    // Writes an 8 byte integer
    writeLong(v) {
        let buffer = Buffer.alloc(8)
        buffer.writeBigInt64BE(v)
        this.append(buffer)
    }

    // Reads an 8 byte little endian integer
    readLLong() {
        return this.#buffer.readBigInt64LE(this.addOffset(8))
    }

    // Writes an 8 byte little endian integer
    writeLLong(v) {
        let buffer = Buffer.alloc(8)
        buffer.writeBigInt64LE(v)
        this.append(buffer)
    }

    // Reads a 32 bit zigzag-encoded integer
    readVarInt() {
        let raw = this.readUnsignedVarInt() 
        let temp = (((raw << 63) >> 63) ^ raw) >> 1
        return temp ^ (raw & (1 << 63))
    }

    // Reads a 32 bit unsigned integer
    readUnsignedVarInt() {
        let value = 0
        for (let i = 0; i <= 28; i += 7) {
            if (typeof this.#buffer[this.#offset] === 'undefined') {
                throw new Error('No bytes left in buffer')
            }
            let b = this.readByte()
            value |= ((b & 0x7f) << i)

            if ((b & 0x80) === 0) {
                return value
            }
        }

        throw new Error('VarInt did not terminate after 5 bytes!')
    }

    // Writes a 32 bit integer as a zig-zag encoded integer
    writeVarInt(v) {
        v = (v << 32 >> 32)
        return this.writeUnsignedVarInt((v << 1) ^ (v >> 31))
    }

    // Writes a 32 bit unsigned integer 
    writeUnsignedVarInt(v) {
        let stream = new BinaryStream()
        v &= 0xffffffff

        for (let i = 0; i < 5; i++) {
            if ((v >> 7) !== 0) {
                stream.writeByte(v | 0x80)
            } else {
                stream.writeByte(v & 0x7f)
                this.append(stream.buffer)
                return
            }
            v >>= 7
        }

        this.append(stream.buffer)
    }

    // Reads a 64 bit zigzag-encoded long
    readVarLong() {
        let raw = this.readUnsignedVarLong()
        let tmp = (((raw << 63) >> 63) ^ raw) >> 1
        return tmp ^ (raw & (1 << 63))
    }

    // Reads a 64 bit unsigned long
    readUnsignedVarLong() {
        let value = 0
        for (let i = 0; i <= 63; i += 7) {
            if (typeof this.#buffer[this.#offset] === 'undefined') {
                throw new Error('No bytes left in buffer')
            }
            let b = this.readByte()
            value |= ((b & 0x7f) << i)

            if ((b & 0x80) === 0) {
                return value
            }
        }
        
        throw new Error('VarInt did not terminate after 10 bytes!')
    }

    // Writes a 64 bit integer as zigzag-encoded long
    writeVarLong(v) {
        let bi = BigInt(v)
        return this.writeUnsignedVarLong((bi << 1n) ^ (bi >> 63n))
    }

    // Writes a 64 bit unsigned integer long
    writeUnsignedVarLong(v) {
        let bi = BigInt(v)
        for (let i = 0; i < 10; i++) {
            if ((bi >> 7n) !== 0n) {
                this.writeByte(Number((bi | 0x80n)))
            } else {
                this.writeByte(Number((bi & 0x7fn)))
                break
            }
            bi >>= 7n
        }
    }

    /**
     * Increase offset value by the given bytes.
     * 
     * @param {number} v 
     * @param {boolean} r 
     */
    addOffset(v, r = false) {
        if (r) return this.#offset += v
        return (this.#offset += v) - v
    }

    feof() {
        return typeof this.#buffer[this.#offset] === 'undefined'
    }

    readRemaining() {
        let buffer = this.#buffer.slice(this.offset)
        this.offset = this.#buffer.length
        return buffer
    }

    reset() {
        this.#buffer = Buffer.alloc(0)
        this.#offset = 0
    }

    get offset() {
        return this.#offset
    }

    set offset(offset) {
        this.#offset = offset
    }

    get buffer() {
        return this.#buffer
    }

    set buffer(buffer) {
        this.#buffer = buffer
    }
}
module.exports = BinaryStream
