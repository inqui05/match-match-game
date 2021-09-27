import './registration-checked.sass';
import image from '../../../assets/checked.svg';
import { BaseComponent } from '../../base-component';

export class RegistrationChecked extends BaseComponent {
  constructor() {
    super('div', ['registration__checked', 'invisible']);

    this.element.innerHTML = `<img src = ${image} alt = "field was checked"
      class="registration__checked-image"/>`;
  }
}
