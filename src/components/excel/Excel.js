import { $ } from "@core/dom";
import { Emitter } from "@core/Emitter";

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: new Emitter()
    };

    this.components = this.components.map(Component => {
      const componentParent = $.create('div', Component.className);

      const component = new Component(componentParent, componentOptions);
      componentParent.html(component.toHTML());

      $root.append(componentParent);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => {component.init();});
  }

  destroy() {
    this.components.forEach(component => component.destroy());
  }
}