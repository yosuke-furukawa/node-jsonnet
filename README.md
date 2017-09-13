# node-jsonnet

This is an updated fork of the [NPM jsonnet package](https://www.npmjs.com/package/jsonnet).

[jsonnet](http:jsonnet.org) is a DSL for JSON. Jsonnet is created by Google.

This module is a Jsonnet wrapper for Node.js created with [Emscripten](http://kripken.github.io/emscripten-site/).

## Install

```console
$ npm install @unboundedsystems/jsonnet
```

A Typescript definition file is included, so no need to install anything
from @types


## Usage

```js
const jsonnet = require('@unboundedsystems/jsonnet');

const myTemplate = `
{
    person1: {
        name: "Alice",
        welcome: "Hello " + self.name + "!",
    },
    person2: self.person1 { name: "Bob" },
}`;

// You only need to create one Jsonnet object and can then call eval()
// repeatedly.
const jsonnetVm = new jsonnet.Jsonnet();
const output = jsonnetVm.eval(myTemplate);

console.log(JSON.stringify(output, null, 2));

// The jsonnetVm object needs to be destroyed manually.
jsonnetVm.destroy();
```

### Output:

```json
{
   "person1": {
      "name": "Alice",
      "welcome": "Hello Alice!"
   },
   "person2": {
      "name": "Bob",
      "welcome": "Hello Bob!"
   }
}
```

## References

* [Jsonnet specification](http://jsonnet.org/language/spec.html)

## Building & Publishing

### Ensure you have the following tools installed:
  * GNU make
  * Docker

### Build

```console
host$ make
```
### Publish
NOTE: This part needs better automation. Feel free to fix. :)
1. Run bash in the node container. Note the leading "./" and also note
    that your prompt in the container will have a different randomly
    generated hostname.

    ```console
    host$ ./bin/bash
    root@55382dc5d87f:/src#
    ```
2. Enter your npmjs.com credentials

    ```console
    root@55382dc5d87f:/src# npm login
    Username: someuser
    Password: 
    Email: (this IS public) someuser@example.com
    Logged in as someuser on https://registry.npmjs.org/.
    ```
3. Actually publish

    ```console
    root@55382dc5d87f:/src# make publish
    npm publish --access=public
    + @unboundedsystems/jsonnet@0.9.4-rc5
    ```

