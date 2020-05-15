export default class Element {
  element;

  createElement = (tagName, options = {}) => {
    const { classNames, attributes } = options;
    const element = document.createElement(tagName);
    if(classNames) {
      element.classList.add(...classNames);
    }
    if (attributes) {
      Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    }
    return element;
  }

  wrapTo = (className, ...elements) => {
    const wrapper = this.createElement('div', { classNames: [className] });
    wrapper.append(...elements);

    return wrapper;
  };
}
