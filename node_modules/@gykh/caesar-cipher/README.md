# GYKH - caesar-cipher

> One of the simplest forms of encryption

## Install

```
$ npm install --save @gykh/caesar-cipher
```
### or


```
$ npm i -S @gykh/caesar-cipher
```

## Usage

Encrypt and decrypt string

```js
const { encryptString, decryptString } = require("@gykh/caesar-cipher");

...

const encrypted = encryptString(str, 3);

const decrypted = decryptString(encrypted, 3);

console.log(str === decrypted); // true
```

Encrypt and decrypt buffer

```js
const { encrypt, decrypt } = require("@gykh/caesar-cipher");
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

...

const encrypted = encrypt(await readFile(inputFile), 3);

const decrypted = decrypt(encrypted, 3);

console.log(buffer == decrypted); // true
```

Encrypt and decrypt streams (Use this in case of input being large data / file)

```js
const { EncryptTransform, DecryptTransform } = require("@gykh/caesar-cipher");
const fs = require('fs'); 

...

const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

const encryptTransform = new EncryptTransform(3);
const decryptTransform = new DecryptTransform(3);

const stream = readStream
    .pipe(encryptTransform)
    .pipe(decryptTransform)
    .pipe(writeStream)

stream.on("error", () => /* do something */);
stream.on("finish", () => /* do something */);
```

## API

### caesar-cipher

### .encryptString(input, key)

#### input

Type: `string`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

### .decryptString(input, key)

#### input

Type: `string`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

### .encrypt(input, key)

#### input

Type: `Buffer`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

### .decrypt(input, key)

#### input

Type: `Buffer`<br/>
Required

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

### new EncryptTransform(key)

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

### new DecryptTransform(key)

#### key

Type: `number`<br/>
Required

key should be a number between 0-25

## Understand Caesar Cipher

> The Caesar cipher, also known as a shift cipher, is one of the simplest forms of encryption. It is a substitution cipher where each letter in the original message (called the plaintext) is replaced with a letter corresponding to a certain number of letters up or down in the alphabet. [Learn more](https://learncryptography.com/classical-encryption/caesar-cipher)

## Developer

- [Sylvester Das](https://www.sylvesterdas.com) 

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/sylvester.das)

## License

MIT © 2021 [get-your-knowledge-here](./LICENSE)
