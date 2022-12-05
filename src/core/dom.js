class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }

    return this.$el.textContent.trim();
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    console.log("this.$el", this.$el);

    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');

    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    }else {
      this.$el.appendChild(node);
    }
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback);
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback);
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}){
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
  }

  focus() {
    this.$el.focus();
    return this;
  }

  id(parsed) {
    if(parsed) {
      const id = this.id().split(':');
      return {
        rows: +id[0],
        cols: +id[1],
      }
    }
    return this.data.id
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  get data() {
    return this.$el.dataset;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);

  if (classes !== '') {
    el.classList.add(classes);
  }

  return $(el);
}