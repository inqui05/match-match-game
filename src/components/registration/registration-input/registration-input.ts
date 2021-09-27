import './registration-input.sass';

export class RegistrationInput {
  readonly element: HTMLInputElement;

  constructor(styles: string[] = [], type: string, id: string, placeholder: string) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.type = type;
    this.element.placeholder = placeholder;
    this.element.required = true;
    this.element.id = id;
  }
}
