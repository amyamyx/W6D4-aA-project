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


  }





}

window.$l = $l;
