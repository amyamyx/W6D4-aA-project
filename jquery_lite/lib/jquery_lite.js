/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection{\n  constructor(array) {\n    this.array = array;\n  }\n\n  html(string) {\n    if (!string) {\n      return this.array[0].innerHTML;\n    } else {\n      this.array.forEach( item => item.innerHTML = string);\n    }\n  }\n\n  empty() {\n    this.array.forEach( item => item.innerHTML = '');\n  }\n\n  append() {\n    console.log('you made it');\n    this.array.forEach( item => {\n      const args = Array.from(arguments);\n      console.log(args);\n      args.forEach( (arg) => {\n        let node = new DOMNodeCollection([arg])[0];\n        item.innerHTML = node.outerHTML;\n      });\n      // arguments.forEach( kid => {\n      //   item.appendChild(kid.outerHTML);\n      // });\n    });\n  }\n\n  attr(selector, value) {\n    if (!value) {\n      return this.array[0].getAttribute(selector);\n    } else {\n      this.array[0].setAttribute(selector, value);\n    }\n  }\n\n  addClass(newClass) {\n    this.array[0].classList.add(newClass);\n  }\n\n  removeClass(className) {\n    this.array[0].classList.remove(className);\n  }\n\n  children() {\n\n    let results = [];\n    this.array.forEach( node => {\n      const kids = node.children;\n      results = results.concat(Array.from(kids));\n    });\n\n    return new DOMNodeCollection(results);\n  }\n\n  parent() {\n    let results = [];\n    this.array.forEach( node => {\n      const parent = node.parentElement;\n      results.push(parent);\n      // console.log(parent);\n    });\n    return new DOMNodeCollection(results);\n\n    // return new DOMNodeCollection(results);\n  }\n\n  find(selector) {\n    let results = [];\n    this.array.forEach( (node) => {\n      let things = node.querySelectorAll(selector);\n      let things_array = Array.from(things);\n      results = results.concat(things_array);\n    });\n    return new DOMNodeCollection(results);\n  }\n\n  remove() {\n    // parents.forEach( parent => {\n    //   const children = parent.children();\n    //     children.forEach( child => {\n    //       parent.removeChild(child);\n    //     });\n    // });\n\n    let tag_name = this.array[0].tagName;\n    const parents = this.parent();\n    parents.array.forEach(parent => {\n      const children = parent.querySelectorAll(tag_name);\n      children.forEach(child => {\n        parent.removeChild(child);\n      });\n    });\n  }\n\n  on(eventName, callback) {\n  this.each((node) => {\n    node.addEventListener(eventName, callback);\n    const eventKey = `jqliteEvents-${eventName}`;\n    if (typeof node[eventKey] === \"undefined\") {\n      node[eventKey] = [];\n    }\n    node[eventKey].push(callback);\n  });\n}\n\n  off(type) {\n    this.array.forEach( node => {\n      node.removeEventListener(type);\n    });\n  }\n\n\n\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\nconsole.log('webpack is working');\n\n  function $l(selector) {\n\n    if (typeof selector === 'string') {\n      var selectedEls= document.querySelectorAll(selector);\n      return new DOMNodeCollection( Array.from(selectedEls));\n\n    } else if (selector instanceof HTMLElement) {\n      var HTMLEls = document.getElementsByTagName(selector);\n      return new DOMNodeCollection( Array.from(HTMLEls));\n    } else {\n      selector();\n      let queue = [];\n      queue.push(selector);\n\n    }\n\n  }\n\nwindow.$l = $l;\n\ndocument.addEventListener(\"DOMContentloaded\", () => {\n  $l('h1').on('click', (e) => {\n    console.log('clicked');\n  });\n});\n\n  $l( () => alert('the document is ready'));\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });