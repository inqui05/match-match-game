import './menu-item.sass';
import { BaseComponent } from '../../base-component';

export class MenuItem extends BaseComponent {
  constructor() {
    super('li', ['menu__item']);
  }
}
