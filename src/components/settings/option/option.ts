import '../select/select.sass';
import { BaseComponent } from '../../base-component';

export class Option extends BaseComponent {
  constructor() {
    super('option', ['settings__options']);
  }
}
