import Element from './Element';

export default class Input extends Element {
  constructor(inputElement, attributes) {
    super();

    this.createInput(inputElement, attributes);
  }

  createInput = (inputElement, attributes) => {
    this.element = this.wrapTo('col-sm-10', this.createInputControl(inputElement, attributes));
    const validFeedBack = this.createElement('div', { classNames: ['valid-feedback'] });
    this.element.appendChild(validFeedBack);
  };

  createInputControl = (element, { name, placeholder, id, onBlur }) => {
    const input = this.createElement(element, {
      classNames: ['form-control'],
      attributes: {
        type: 'text',
        name,
        placeholder,
        id
      }
    });

    input.addEventListener('blur', onBlur);
    return input;
  };
}
