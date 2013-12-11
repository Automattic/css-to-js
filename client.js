var css = "{css}";
var called = false;
var load = require('load-styles');
module.exports = function loadStyles(doc) {
  if (called) return;
  called = true;
  return load(css, doc);
};
