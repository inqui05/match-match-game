import './registration-label.sass';

export class RegistrationLabel {
  readonly element: HTMLLabelElement;

  constructor(input: string, styles: string[] = []) {
    this.element = document.createElement('label');
    this.element.classList.add(...styles);
    this.element.htmlFor = input;
  }
}
