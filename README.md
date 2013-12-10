css-to-js
=========
### Compiles CSS files into require-able JS files



Installation
------------

Install with `npm`:

``` bash
$ npm install -g css-to-js
```


Example
-------

Given the CSS file `styles.css`:

``` css
.foo {
  color: red;
}
```

With `css-to-js` you can compile this into a `.js` file, with a CSS prefix of
`.my-class-name`, like so:

``` bash
$ css-to-js --prefix ".my-class-name"
```

Will output `.js` code similar to:

``` js
var css = ".my-class-name .foo {\n  color: red;\n}";

/**
 * Module exports.
 */

module.exports = setup;

/**
 * Injects the CSS into the <head> DOM node.
 */

function setup (doc) {
  // only run once per CSS file...
  if (setup.called) return;
  setup.called = true;

  // default to the global `document` object
  if (!doc) doc = document;

  var head = doc.head || doc.getElementsByTagName('head')[0];
  if (!head) throw new Error('could not find <head> DOM node');
  var style = doc.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {  // IE
    style.styleSheet.cssText = css;
  } else {                 // the world
    style.appendChild(doc.createTextNode(css));
  }
  head.appendChild(style);
}
```

Now you can `require()` this file at will via Node.js, ComponentJS, Browserify, or
any other require build system.


License
-------

(The MIT License)

Copyright (c) 2013 Automattic, Inc.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
