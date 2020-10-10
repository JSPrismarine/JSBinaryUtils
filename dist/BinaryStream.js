"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryStream {
    constructor(buffer = Buffer.alloc(0), offset = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }
}
exports.default = BinaryStream;
