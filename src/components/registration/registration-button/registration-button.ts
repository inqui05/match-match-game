import './registration-button.sass';

export class RegistrationButton {
  readonly element: HTMLButtonElement;

  constructor(styles: string[] = []) {
    this.element = document.createElement('button');
    this.element.classList.add(...styles);
  }
}
