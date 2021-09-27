import settingImage from '../../../assets/menu-settings.svg';
import starImage from '../../../assets/menu-star.svg';
import './menu-list.sass';
import { BaseComponent } from '../../base-component';
import { MenuItem } from '../menu-item/menu-item';
import { MenuLink } from '../menu-link/menu-link';

export class MenuList extends BaseComponent {
  private readonly about: MenuItem;

  private readonly score: MenuItem;

  private readonly setting: MenuItem;

  private readonly aboutLink: MenuLink;

  private readonly scoreLink: MenuLink;

  private readonly settingLink: MenuLink;

  constructor() {
    super('ul', ['menu__list']);
    this.about = new MenuItem();
    this.score = new MenuItem();
    this.setting = new MenuItem();
    this.aboutLink = new MenuLink(['menu__link'], '#/', '#/');
    this.scoreLink = new MenuLink(['menu__link'], '#/score/', '#/score/');
    this.settingLink = new MenuLink(['menu__link'], '#/settings/', '#/settings/');

    this.about.element.classList.add('menu__item_active');
    this.aboutLink.element.innerHTML = `
      <div class="menu__item-container">
        <div class="menu__question">?</div>
        <p class="menu__text">About Game</p>
      </div>`;
    this.scoreLink.element.innerHTML = `
      <div class="menu__item-container">
        <img
          src="${starImage}"
          alt="setting"
          class="menu__icon"
        />
        <p class="menu__text">Best Score</p>
      </div>`;
    this.settingLink.element.innerHTML = `
      <div class="menu__item-container">
        <img
          src="${settingImage}"
          alt="profile image"
          class="menu__icon"
        />
        <p class="menu__text">Game Settings</p>
      </div>`;

    this.about.element.append(this.aboutLink.element);
    this.score.element.append(this.scoreLink.element);
    this.setting.element.append(this.settingLink.element);
    this.element.append(...[this.about.element, this.score.element, this.setting.element]);
  }

  getMenuItems(): MenuItem[] {
    return [this.about, this.score, this.setting];
  }

  getLinkItems(): MenuLink[] {
    return [this.aboutLink, this.scoreLink, this.settingLink];
  }
}
