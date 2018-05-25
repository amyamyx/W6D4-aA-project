const DOMNodeCollection = require('./dom_node_collection.js');
console.log('webpack is working');

  function $l(selector) {

    if (typeof selector === 'string') {
      var selectedEls= document.querySelectorAll(selector);
      return new DOMNodeCollection( Array.from(selectedEls));

    } else if (selector instanceof HTMLElement) {
      var HTMLEls = document.getElementsByTagName(selector);
      return new DOMNodeCollection( Array.from(HTMLEls));
    } else {
      selector();
      let queue = [];
      queue.push(selector);

    }

  }

window.$l = $l;

document.addEventListener("DOMContentloaded", () => {
  $l('h1').on('click', (e) => {
    console.log('clicked');
  });
});

  $l( () => alert('the document is ready'));
