import './registration-title.sass';
import { BaseComponent } from '../../base-component';

export class RegistrationTitle extends BaseComponent {
  constructor() {
    super('h3', ['registration__title']);
  }
}
