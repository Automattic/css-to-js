css-to-js
=========
### Compiles CSS files into require-able JS files

The `css-to-js(1)` program accepts a CSS file via `stdin` and outputs a
CommonJS `require()` file, which when required on the client-side, will
inject the styles into the `<head>` of the document via a `<style>` tag.

The output file depends on the [`component/load-styles`][load-styles] component,
so be sure to add that to the `dependencies` array of your component (not
inlining the `load-styles` logic into the output files keeps it [DRY][] and
reduces file size).


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
var css = ".my-class-name .wat {\n  color: red;\n}\n\n.my-class-name div i {\n  color: blue;\n}";
var called = false;
var load = require('load-styles');
module.exports = function loadStyles(doc) {
  if (called) return;
  called = true;
  return load(css, doc);
};
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

[DRY]: http://en.wikipedia.org/wiki/Don't_repeat_yourself
[load-styles]: https://github.com/component/load-styles
