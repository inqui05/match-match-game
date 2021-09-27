import './container.sass';
import { BaseComponent } from '../../base-component';

export class Container extends BaseComponent {
  constructor() {
    super('div', ['settings__container']);
  }
}
