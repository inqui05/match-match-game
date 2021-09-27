import './registration-field.sass';
import { BaseComponent } from '../../base-component';
import { RegistrationFieldWrapper } from '../registration-field-wrapper/registration-field-wrapper';
import { RegistrationChecked } from '../registration-checked/registration-checked';
import { RegistrationInput } from '../registration-input/registration-input';
import { RegistrationLabel } from '../registration-label/registration-label';

const INPUT_TYPE = 'text';
const MAX_LENGTH = 30;

export class RegistrationField extends BaseComponent {
  private readonly field: RegistrationFieldWrapper;

  private readonly image: RegistrationChecked;

  private readonly label: RegistrationLabel;

  private readonly input: RegistrationInput;

  public valide: boolean;

  constructor(input: string, styles: string[] = [], text: string, stylesInput: string[] = [],
    type: string, id: string, placeholder: string) {
    super('div', ['registration__field']);
    this.field = new RegistrationFieldWrapper();
    this.image = new RegistrationChecked();
    this.label = new RegistrationLabel(input, styles);
    this.input = new RegistrationInput(stylesInput, type, id, placeholder);
    this.valide = false;

    this.input.element.addEventListener('input', () => this.verifyInput(type));
    this.label.element.innerHTML = text;

    this.field.element.append(this.label.element);
    this.field.element.append(this.input.element);
    this.element.append(this.field.element);
    this.element.append(this.image.element);
  }

  verifyInput(condition: string): void {
    const text = /^(\p{L})+([(\p{L}) [\d])*$/u;
    const emailPattern = /^[A-Z0-9._%+-~!@#$*=:;"'<>,?/^]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const type = condition === INPUT_TYPE ? text : emailPattern;
    const data = this.input.element.value;

    if (data.length <= MAX_LENGTH && type.test(data)) {
      this.valide = true;
      this.image.element.classList.remove('invisible');
    } else {
      this.valide = false;
      this.image.element.classList.add('invisible');
    }
  }

  getInput(): RegistrationInput {
    return this.input;
  }
}
