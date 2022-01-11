[![npm](https://img.shields.io/npm/v/@jsprismarine/jsbinaryutils?style=flat-square)](https://www.npmjs.com/package/@jsprismarine/jsbinaryutils)
[![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/@jsprismarine/jsbinaryutils?style=flat-square)](#)

# JSBinaryUtils
A TypeScript / JavaScript library for managing buffers in a NodeJS app.
This library has been created to solve the big overhead of resources usage when a project needs to write some new data very often in the same Buffer instance (Buffer.concat will create new Buffers, so it's really bad for the performance of real time applications, and that is why JSBinaryUtils was created).

:warning: This guide is incomplete, please help by contributing! thank you :)

- [JSBinaryUtils](#jsbinaryutils)
	- [Installation](#installation)
- [API](#api)
	- [Reading](#reading)
		- [read(len: number)](#read)
		- [readByte()](#readbyte)
		- [readSignedByte()](#readsbyte)
		- [readBoolean()](#readboolean)
		- [readShort()](#readshort)
		- [readShortLE()](#readshortle)
		- [readUnsignedShort()](#readushort)
		- [readUnsignedShortLE()](#readushortle)
		- [readTriad()](#readtriad)
	- [Writing](#writing)
		- [write(buffer: Uint8Array | Buffer)](#write)

## Installation

Install by `npm`

```sh
npm install @jsprismarine/jsbinaryutils
```

**or** install with `yarn`

```sh
yarn add @jsprismarine/jsbinaryutils
```

# Api

A BinaryStream instance can be used for reading or for writing but not both at the same time.

## Reading

### <a name="read"></a>read(length: number)

Reads a slice of bytes in the buffer on the stream instance and returns it in a Buffer.

### Usage

```typescript
import BinaryStream from "@jsprismarine/jsbinaryutils";

const stream = new BinaryStream(Buffer.from([255, 255, 200, 2]));
console.log(stream.read(4));  // Buffer < 0xFF 0xFF 0xFF 0xC8 0x02 >
```

### <a name="readbyte"></a>readByte()

Reads an unsigned byte from the buffer (0 to 255).

### Usage

```typescript
import BinaryStream from "@jsprismarine/jsbinaryutils";

const stream = new BinaryStream(Buffer.from([0xFF]));
console.log(stream.readByte());  // 255
```

### <a name="readsbyte"></a>readSignedByte()

Reads a signed byte from the buffer (-128 to 127).

### Usage

```typescript
import BinaryStream from "@jsprismarine/jsbinaryutils";

const stream = new BinaryStream(Buffer.from([0x7F]));
console.log(stream.readSignedByte());  // 127
```

### <a name="readboolean"></a>readBoolean()

Reads a boolean (1 byte, either true or false).
Everything that is not 0x00 is true.

### Usage

```typescript
import BinaryStream from "@jsprismarine/jsbinaryutils";

const stream = new BinaryStream(Buffer.from([0x01]));
console.log(stream.readBoolean());  // true
```

### <a name="readshort"></a>readShort()

Reads a signed big-endian short (2 bytes).

### <a name="readshortle"></a>readShortLE()

Reads a signed little-endian short (2 bytes).

### <a name="readushort"></a>readUnsignedShort()

Reads an unsigned big-endian short (2 bytes).

### <a name="readushortle"></a>readUnsignedShortLE()

Reads an unsigned little-endian short (2 bytes).

### <a name="readtriad"></a>readTriad()

Reads a big-endian triad (3 bytes).

### <a name="readtriadle"></a>readTriadLE()

Reads a little-endian triad (3 bytes).

### <a name="readutriad"></a>readUnsignedTriad()

Reads an unsigned big-endian triad (3 bytes).

### <a name="readutriadle"></a>readUnsignedTriadLE()

Reads an unsigned little-endian triad (3 bytes).

### <a name="readint"></a>readInt()

Reads a signed big-endian integer (1 byte, 0 to 255).

todo...

## Writing

### <a name="write"></a>write(buffer: Uint8Array | Buffer)

Concatenates the given buffer with the stream instance one.

### Usage

```typescript
import BinaryStream from "@jsprismarine/jsbinaryutils";

const stream = new BinaryStream();
stream.write(Buffer.from([255, 255, 200, 2]));
console.log(stream.getBuffer());  // Buffer < 0xFF 0xFF 0xFF 0xC8 0x02 >
```
