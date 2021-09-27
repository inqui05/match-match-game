import './registration.sass';
import { BaseComponent } from '../base-component';
import { RegistrationWindow } from './window/window';
import { RegistrationTitle } from './registration-title/registration-title';
import { RegistrationFormWrapper } from './registration-form-wrapper/registration-form-wrapper';
import { RegistrationButtons } from './registration-buttons/registration-buttons';
import { RegistrationForm } from './registration-form/registration-form';
import { RegistrationAvatar } from './registration-avatar/registration-avatar';
import { RegistrationField } from './registration-field/registration-field';
import { RegistrationInput } from './registration-input/registration-input';
import { RegistrationButton } from './registration-button/registration-button';

export class Registration extends BaseComponent {
  private readonly window: RegistrationWindow;

  private readonly title: RegistrationTitle;

  private readonly formWrapper: RegistrationFormWrapper;

  private readonly buttons: RegistrationButtons;

  private readonly form: RegistrationForm;

  private readonly avatar: RegistrationAvatar;

  private readonly firstField: RegistrationField;

  private readonly secondField: RegistrationField;

  private readonly thirdField: RegistrationField;

  private readonly firstButton: RegistrationButton;

  private readonly secondButton: RegistrationButton;

  constructor() {
    super('div', ['registration', 'hidden']);
    this.window = new RegistrationWindow();
    this.title = new RegistrationTitle();
    this.formWrapper = new RegistrationFormWrapper();
    this.buttons = new RegistrationButtons();
    this.form = new RegistrationForm();
    this.avatar = new RegistrationAvatar();
    this.firstButton = new RegistrationButton(['registration__button', 'registration__button_blue']);
    this.secondButton = new RegistrationButton(['registration__button', 'registration__button_white']);
    this.firstField = new RegistrationField('name', ['registration__label'],
      'First Name', ['registration__input'], 'text', 'name', 'your name');
    this.secondField = new RegistrationField('last-name', ['registration__label'],
      'Last Name', ['registration__input'], 'text', 'last-name', 'your surname');
    this.thirdField = new RegistrationField('email', ['registration__label'],
      'E-mail', ['registration__input'], 'email', 'email', 'your email');

    this.title.element.innerHTML = 'Register new Player';
    this.firstButton.element.innerHTML = 'add user';
    this.firstButton.element.disabled = true;
    this.secondButton.element.innerHTML = 'cancel';
    this.form.element.addEventListener('input', () => this.validate());

    this.buttons.element.append(...[this.firstButton.element, this.secondButton.element]);
    this.form.element.append(...[this.firstField.element, this.secondField.element, this.thirdField.element]);
    this.formWrapper.element.append(...[this.form.element, this.avatar.element]);
    this.window.element.append(...[this.title.element, this.formWrapper.element, this.buttons.element]);
    this.element.append(this.window.element);
  }

  validate(): void {
    if (this.firstField.valide && this.secondField.valide && this.thirdField.valide) {
      this.firstButton.element.disabled = false;
    } else this.firstButton.element.disabled = true;
  }

  getInputs(): RegistrationInput[] {
    return [this.firstField.getInput(), this.secondField.getInput(), this.thirdField.getInput()];
  }

  getAvatarImage(): string {
    return this.avatar.getImage();
  }

  setAvatarImage(src: string): void {
    this.avatar.setImage(src);
  }
}
