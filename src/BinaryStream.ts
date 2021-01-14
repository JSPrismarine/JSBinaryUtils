import { listenerCount, off } from 'process';

export default class BinaryStream {
    private buffer: Buffer;
    private offset: number;

    constructor(buffer: Buffer = Buffer.alloc(0), offset: number = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }

    /**
     * Appends a buffer to the binary one.
     *
     * @param buffer
     */
    public append(buffer: Buffer): void {
        this.buffer = Buffer.concat([this.buffer, buffer]);
        this.addOffset(Buffer.byteLength(buffer));
    }

    /**
     * Reads a slice of buffer by the given length.
     *
     * @param length
     */
    public read(length: number) {
        return this.buffer.slice(this.offset, this.addOffset(length, true));
    }

    /**
     * Reads an unsigned byte (0 - 255).
     */
    public readByte(): number {
        return this.buffer.readUInt8(this.addOffset(1));
    }

    /**
     * Reads a signed byte (-128 - 127).
     */
    public readSignedByte(): number {
        return this.buffer.readInt8(this.addOffset(1));
    }

    /**
     * Writes an unsigned / signed byte.
     *
     * @param v
     */
    public writeByte(v: number): void {
        this.append(Buffer.from([v & 0xff]));
    }

    /**
     * Reads a boolean byte.
     */
    public readBool(): boolean {
        return this.readByte() !== 0;
    }

    /**
     * Writes a boolean byte.
     *
     * @param v
     */
    public writeBool(v: boolean): void {
        this.writeByte(v ? 1 : 0);
    }

    /**
     * Reads a 16 bit unsigned big-endian number.
     */
    public readShort(): number {
        return this.buffer.readUInt16BE(this.addOffset(2));
    }

    /**
     * Reads a 16 bit signed big-endian number.
     */
    public readSignedShort(): number {
        return this.buffer.readInt16BE(this.addOffset(2));
    }

    /**
     * Writes a 16 bit signed/unsigned big-endian number.
     *
     * @param v
     */
    public writeShort(v: number): void {
        let buf = Buffer.alloc(2);
        try {
            buf.writeUInt16BE(v);
        } catch {
            buf.writeInt16BE(v);
        }
        this.append(buf);
    }

    /**
     * Reads a 16 bit unsigned little-endian number.
     */
    public readLShort(): number {
        return this.buffer.readUInt16LE(this.addOffset(2));
    }

    /**
     * Reads a 16 bit signed little-endian number.
     */
    public readSignedLShort(): number {
        return this.buffer.readInt16LE(this.addOffset(2));
    }

    /**
     * Writes a 16 bit signed/unsigned little-endian number.
     *
     * @param v
     */
    public writeLShort(v: number): void {
        let buf = Buffer.alloc(2);
        try {
            buf.writeUInt16LE(v);
        } catch {
            buf.writeInt16LE(v);
        }
        this.append(buf);
    }

    /**
     * Reads a 3 bytes unsigned big-endian number.
     */
    public readTriad(): number {
        return this.buffer.readUIntBE(this.addOffset(3), 3);
    }

    /**
     * Writes a 3 bytes big-endian number.
     *
     * @param v
     */
    public writeTriad(v: number): void {
        let buf = Buffer.alloc(3);
        try {
            buf.writeUIntBE(v, 0, 3);
        } catch {
            buf.writeIntBE(v, 0, 3);
        }
        this.append(buf);
    }

    /**
     * Reads a 3 bytes little-endian number.
     */
    public readLTriad(): number {
        return this.buffer.readUIntLE(this.addOffset(3), 3);
    }

    /**
     * Writes a 3 bytes little-endian number.
     *
     * @param v
     */
    public writeLTriad(v: number): void {
        let buf = Buffer.alloc(3);
        try {
            buf.writeUIntLE(v, 0, 3);
        } catch {
            buf.writeIntLE(v, 0, 3);
        }
        this.append(buf);
    }

    /**
     * Reads a 4 bytes signed big-endian number.
     */
    public readInt(): number {
        return this.buffer.readInt32BE(this.addOffset(4));
    }

    /**
     * Writes a 4 bytes number.
     *
     * @param v
     */
    public writeInt(v: number): void {
        let buf = Buffer.alloc(4);
        try {
            buf.writeUInt32BE(v);
        } catch {
            buf.writeInt32BE(v);
        }
        this.append(buf);
    }

    /**
     * Reads a 4 bytes signed little-endian number.
     */
    public readLInt(): number {
        return this.buffer.readIntLE(this.addOffset(4), 4);
    }

    /**
     * Writes a 4 bytes signed little-endian number.
     *
     * @param v
     */
    public writeLInt(v: number): void {
        let buf = Buffer.alloc(4);
        buf.writeInt32LE(v);
        this.append(buf);
    }

    /**
     * Reads a 4 bytes floating-point number.
     */
    public readFloat(): number {
        return this.buffer.readFloatBE(this.addOffset(4));
    }

    /**
     * Writes a 4 bytes floating-point number.
     *
     * @param v
     */
    public writeFloat(v: number): void {
        let buf = Buffer.alloc(4);
        buf.writeFloatBE(v);
        this.append(buf);
    }

    /**
     * Reads a 4 bytes little-endian floating-point number.
     */
    public readLFloat(): number {
        return this.buffer.readFloatLE(this.addOffset(4));
    }

    /**
     * Writes a 4 bytes little-endian floating-point number.
     *
     * @param v
     */
    public writeLFloat(v: number): void {
        let buf = Buffer.alloc(4);
        buf.writeFloatLE(v);
        this.append(buf);
    }

    /**
     * Reads a 8 bytes floating-point number.
     */
    public readDouble(): number {
        return this.buffer.readDoubleBE(this.addOffset(8));
    }

    /**
     * Writes a 8 bytes floating-point number.
     *
     * @param v
     */
    public writeDouble(v: number): void {
        let buf = Buffer.alloc(8);
        buf.writeDoubleBE(v);
        this.append(buf);
    }

    /**
     * Reads a 8 bytes little-endian floating-point number.
     */
    public readLDouble(): number {
        return this.buffer.readDoubleLE(this.addOffset(8));
    }

    /**
     * Reads a 8 bytes little-endian floating-point number.
     *
     * @param v
     */
    public writeLDouble(v: number): void {
        let buf = Buffer.alloc(8);
        buf.writeDoubleLE(v);
        this.append(buf);
    }

    /**
     * Reads a 8 byte number.
     */
    public readLong(): bigint {
        return this.buffer.readBigInt64BE(this.addOffset(8));
    }

    /**
     * Writes a 8 bytes number.
     *
     * @param v
     */
    public writeLong(v: bigint): void {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64BE(v);
        this.append(buf);
    }

    /**
     * Reads a 8 bytes little-endian number.
     */
    public readLLong(): bigint {
        return this.buffer.readBigInt64LE(this.addOffset(8));
    }

    /**
     * Writes a 8 bytes little-endian number.
     *
     * @param v
     */
    public writeLLong(v: bigint): void {
        let buf = Buffer.alloc(8);
        buf.writeBigInt64LE(v);
        this.append(buf);
    }

    /**
     * Reads a 32 bit zigzag-encoded number.
     */
    public readVarInt(): number {
        let raw = this.readUnsignedVarInt();
        let temp = (((raw << 63) >> 63) ^ raw) >> 1;
        return temp ^ (raw & (1 << 63));
    }

    /**
     * Reads a 32 bit unsigned number.
     */
    public readUnsignedVarInt(): number {
        let value = 0;
        for (let i = 0; i <= 28; i += 7) {
            if (typeof this.buffer[this.offset] === 'undefined') {
                throw new Error('No bytes left in buffer');
            }
            let b = this.readByte();
            value |= (b & 0x7f) << i;

            if ((b & 0x80) === 0) {
                return value;
            }
        }

        throw new Error('VarInt did not terminate after 5 bytes!');
    }

    /**
     * Writes a 32 bit zigzag-encoded number.
     *
     * @param v
     */
    public writeVarInt(v: number): void {
        v = (v << 32) >> 32;
        return this.writeUnsignedVarInt((v << 1) ^ (v >> 31));
    }

    /**
     * Writes a 32 bit unsigned number with variable-length.
     *
     * @param v
     */
    public writeUnsignedVarInt(v: number): void {
        let str = new BinaryStream();
        v &= 0xffffffff;

        for (let i = 0; i < 5; i++) {
            if (v >> 7 !== 0) {
                str.writeByte(v | 0x80);
            } else {
                str.writeByte(v & 0x7f);
                this.append(str.getBuffer());
                return;
            }
            v >>= 7;
        }

        this.append(str.getBuffer());
    }

    /**
     * Reads a 64 bit zigzag-encoded variable-length number.
     */
    public readVarLong(): bigint {
        let raw = this.readUnsignedVarLong();
        let tmp = (((raw << 63n) >> 63n) ^ raw) >> 1n;
        return tmp ^ (raw & (1n << 63n));
    }

    /**
     * Reads a 64 bit unsigned variable-length number.
     */
    public readUnsignedVarLong(): bigint {
        let value = 0;
        for (let i = 0; i <= 63; i += 7) {
            if (typeof this.buffer[this.offset] === 'undefined') {
                throw new Error('No bytes left in buffer');
            }
            let b = this.readByte();
            value |= (b & 0x7f) << i;

            if ((b & 0x80) === 0) {
                return BigInt(value);
            }
        }

        throw new Error('VarLong did not terminate after 10 bytes!');
    }

    /**
     * Writes a 64 bit unsigned zigzag-encoded number.
     *
     * @param v
     */
    public writeVarLong(v: bigint) {
        v = typeof v !== 'bigint' ? (v = BigInt(v)) : v;
        return this.writeUnsignedVarLong((v << 1n) ^ (v >> 63n));
    }

    /**
     * Writes a 64 bit unsigned variable-length number.
     *
     * @param v
     */
    public writeUnsignedVarLong(v: bigint) {
        v = typeof v !== 'bigint' ? (v = BigInt(v)) : v;
        for (let i = 0; i < 10; i++) {
            if (v >> 7n !== 0n) {
                this.writeByte(Number(v | 0x80n));
            } else {
                this.writeByte(Number(v & 0x7fn));
                break;
            }
            v >>= 7n;
        }
    }

    /**
     * Increases the offset by the given length,
     * retval is used to skip bytes directly.
     *
     * @param length
     * @param retval
     */
    public addOffset(length: number, retval: boolean = false): number {
        return retval
            ? (this.offset += length)
            : (this.offset += length) - length;
    }

    /**
     * Returns whatever or not the offset is at end of line.
     */
    public feof(): boolean {
        return typeof this.buffer[this.offset] === 'undefined';
    }

    /**
     * Reads the remaining bytes and returns the buffer slice.
     */
    public readRemaining(): Buffer {
        let buf = this.buffer.slice(this.offset);
        this.offset = this.buffer.length;
        return buf;
    }

    /**
     * Resets the buffer.
     */
    public reset(): void {
        this.buffer = Buffer.alloc(0);
        this.offset = 0;
    }

    public getBuffer(): Buffer {
        return this.buffer;
    }

    public getOffset(): number {
        return this.offset;
    }

    public setOffset(offset: number) {
        this.offset = offset;
    }

    public log(): void {
        let length = this.buffer.length;
        let offset = this.offset;

        // https://github.com/bma73/hexdump-nodejs/blob/master/index.js
        let fillup = (val: string, count: number, fillWith: string) => {
                let l = count - val.length;
                let ret = '';
                while (--l > -1) {
                    ret += fillWith;
                }
                return ret + val;
            },
            hexdump = () => {
                let out =
                    fillup('Offset', 8, ' ') +
                    '  00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n';
                let row = '';
                for (let i = 0; i < length; i += 16) {
                    row +=
                        fillup(offset.toString(16).toUpperCase(), 8, '0') +
                        '  ';
                    let n = Math.min(16, length - offset);
                    let string = '';
                    for (let j = 0; j < 16; j++) {
                        if (j < n) {
                            let value = this.buffer.readUInt8(offset);
                            string +=
                                value >= 32 ? String.fromCharCode(value) : '.';
                            row +=
                                fillup(
                                    value.toString(16).toUpperCase(),
                                    2,
                                    '0'
                                ) + ' ';
                            offset++;
                        } else {
                            row += '  ';
                            string += ' ';
                        }
                    }
                    row += ' ' + string + '\n';
                }
                out += row;
                return out;
            };

        return console.log(hexdump());
    }
}
