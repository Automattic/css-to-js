var css = "{css}";

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
  style.innerHTML = css;
  head.appendChild(style);
}
