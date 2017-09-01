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

