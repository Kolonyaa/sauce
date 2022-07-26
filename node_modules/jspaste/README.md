<a href="https://jspaste.ml">
<img src="https://jspaste.ml/logo.png" alt="JSPaste Logo" width="250" height="250" align="right"/>
</a>

# JSPaste

- [JSPaste](https://jspaste.ml) official API wrapper for **NodeJS**. Publish, get, and remove documents with ease.
- Lightweight module, **ES6** and **CommonJS** compatible.
- Package developed by `tnfAngel#6557`

## Docs

### Declare

- To declare JSPaste in your code you can do it with...

```js
// ES6
import JSP from 'jspaste';


// CommonJS (default)
const JSP = require('jspaste');
```

### Methods

##### Publish | `.publish(body: string)` -> Object(ResponseData)

Publish a document to JSPaste ...

```js
await JSP.publish('Hello world!').catch(console.error).then(r => {

    console.info(r);

    /**
     * {
     *     url: 'https://jspaste.ml/foobar',
     *     key: 'foobar',
     *     secret: 'x5pz.22gu.r5qa.tobw'
     * }
     */

    // ... Other code ... //

});

// OR

const data = await JSP.publish('Hello world!');
console.info(data.url); // https://jspaste.ml/foobar
```

##### Get | `.get(key: string)` -> String(JSPasteDocument)

Gets a JSPaste document using the key ...

```js
await JSP.get('foobar').catch(console.error).then(r => {

    console.info(r); // Hello world!

    // ... Other code ... //

});

// OR

const data = await JSP.get('foobar');
console.info(data); // Hello world!
```

##### Check | `.check(key: string)` -> Boolean(JSPasteDocument)

Validate if any JSPaste document exists using that key ...

```js
await JSP.check('foobar').catch(console.error).then(r => {

    console.info(r); // true

    // ... Other code ... //

});

// OR

const exists = await JSP.check('foobar');
console.info(exists); // true
```

##### Remove | `.remove(key: string, secret: string)` -> Boolean(DeleteState)

Delete a JSPaste document using the key and secret ...

```js
await JSP.remove('foobar', 'x5pz.22gu.r5qa.tobw').catch(console.error).then(r => {

    console.info(r); // true

    // ... Other code ... //

});

// OR

const deleted = await JSP.remove('foobar', 'x5pz.22gu.r5qa.tobw');
console.info(deleted); // true
```

## Example

```js
// ES6
import JSP from 'jspaste';

const response = await JSP.publish('Hello world!');
console.info(response);

console.info(await JSP.get(response.key));

console.info(`${JSP.info.name} ${JSP.info.version} by ${JSP.info.author}`);
```

```js
// CommonJS (default)
const JSP = require('jspaste');

const response = await JSP.publish('Hello world!');
console.info(response);

console.info(await JSP.get(response.key));

console.info(`${JSP.info.name} ${JSP.info.version} by ${JSP.info.author}`);
```

_If you have any issues or want to make any suggestions, don't forget to join our [Discord server](https://discord.gg/8RNAdpK)_
