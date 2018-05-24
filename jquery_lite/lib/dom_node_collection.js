class DOMNodeCollection{
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (!string) {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach( item => item.innerHTML = string);
    }
  }

  empty() {
    this.array.forEach( item => item.innerHTML = '');
  }

  append() {
    console.log('you made it');
    this.array.forEach( item => {
      const args = Array.from(arguments);
      console.log(args);
      args.forEach( (arg) => {
        let node = new DOMNodeCollection([arg])[0];
        item.innerHTML = node.outerHTML;
      });
      // arguments.forEach( kid => {
      //   item.appendChild(kid.outerHTML);
      // });
    });
  }

  attr(selector, value) {
    if (!value) {
      return this.array[0].getAttribute(selector);
    } else {
      this.array[0].setAttribute(selector, value);
    }
  }

  addClass(newClass) {
    this.array[0].classList.add(newClass);
  }

  removeClass(className) {
    this.array[0].classList.remove(className);
  }

  children() {

    let results = [];
    this.array.forEach( node => {
      const kids = node.children;
      results = results.concat(Array.from(kids));
    });

    return new DOMNodeCollection(results);
  }

  parent() {
    let results = [];
    this.array.forEach( node => {
      const parent = node.parentElement;
      results.push(parent);
      // console.log(parent);
    });
    return new DOMNodeCollection(results);

    // return new DOMNodeCollection(results);
  }

  find(selector) {
    let results = [];
    this.array.forEach( (node) => {
      let things = node.querySelectorAll(selector);
      let things_array = Array.from(things);
      results = results.concat(things_array);
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    // parents.forEach( parent => {
    //   const children = parent.children();
    //     children.forEach( child => {
    //       parent.removeChild(child);
    //     });
    // });

    let tag_name = this.array[0].tagName;
    const parents = this.parent();
    parents.array.forEach(parent => {
      const children = parent.querySelectorAll(tag_name);
      children.forEach(child => {
        parent.removeChild(child);
      });
    });
  }
}

module.exports = DOMNodeCollection;
