import Element from './Element';

export default class Loader extends Element {
  constructor() {
    super();

    this.createLoader();
  }

  createLoader = () => {
    this.element = this.createElement('div', { classNames: [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'h-100vh'
    ]});
    const loader = this.createElement('div', { classNames: ['spinner-border'] });
    this.element.appendChild(loader);
  }
}
