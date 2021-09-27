import './congratulations-button.sass';

export class CongratulationsButton {
  readonly element: HTMLButtonElement;

  constructor(styles: string[] = []) {
    this.element = document.createElement('button');
    this.element.classList.add(...styles);
  }
}
