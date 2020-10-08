import { getMaxListeners, off } from "process";

export default class BinaryStream {
    private buffer: Buffer;
    private offset: number;

    constructor(buffer: Buffer = Buffer.alloc(0), offset: number = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }
}