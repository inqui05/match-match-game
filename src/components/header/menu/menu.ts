import './menu.sass';
import { BaseComponent } from '../../base-component';
import { MenuList } from '../menu-list/menu-list';

export class Menu extends BaseComponent {
  private readonly list: MenuList;

  constructor() {
    super('nav', ['menu', 'menu_position']);
    this.list = new MenuList();

    this.element.append(this.list.element);
  }

  getList(): MenuList {
    return this.list;
  }
}
