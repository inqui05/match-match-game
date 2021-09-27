import './registration-avatar-input.sass';

export class RegistrationAvatarInput {
  readonly element: HTMLInputElement;

  constructor() {
    this.element = document.createElement('input');
    this.element.classList.add('registration__avatar-input');
    this.element.type = 'file';
    this.element.name = 'upload';
    this.element.id = 'btnInput';
  }
}
