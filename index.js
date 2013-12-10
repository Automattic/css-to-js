
/**
 * Module dependencies.
 */

var fs = require('fs');
var rework = require('rework');

/**
 * Module exports.
 */

module.exports = cssToJs;

/**
 * The client-side code CommonJS require code.
 */

var client = fs.readFileSync(__dirname + '/client.js', 'utf8');

/**
 * The `cssToJs()` function accepts a String of CSS code, and returns a String of
 * JavaScript code that is suitable for a CommonJS `require()` system like Node.js
 * or ComponentJS.
 *
 * @param {String} css
 * @param {Object} opts
 * @api public
 */

function cssToJs (css, opts) {
  var r = rework(css);
  if (opts.prefix) {
    r.use(rework.prefixSelectors(opts.prefix));
  }
  var out = r.toString();
  return client.replace('"{css}"', JSON.stringify(out));
}
