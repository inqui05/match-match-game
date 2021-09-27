import './header.sass';
import image from '../../assets/profile.svg';
import { BaseComponent } from '../base-component';
import { Logo } from './logo/logo';
import { GameTitle } from './game-title/game-title';
import { Menu } from './menu/menu';
import { Authorization } from './authorization/authorization';
import { AuthorizationButton } from './authorization__button/authorization__button';
import { MenuLink } from './menu-link/menu-link';
import { MenuItem } from './menu-item/menu-item';
import { ProfileImage } from './profile-image/profile-image';

export class Header extends BaseComponent {
  private readonly logo: Logo;

  private readonly gameTitle: GameTitle;

  private readonly menu: Menu;

  private readonly authorization: Authorization;

  private readonly authorizationButton: AuthorizationButton;

  private readonly startGameButton: AuthorizationButton;

  private readonly stopGameButton: AuthorizationButton;

  private readonly profileButton: AuthorizationButton;

  private readonly profileImage: ProfileImage;

  constructor() {
    super('header', ['header']);
    this.logo = new Logo();
    this.gameTitle = new GameTitle();
    this.menu = new Menu();
    this.authorization = new Authorization();
    this.authorizationButton = new AuthorizationButton(['authorization__button', 'register'],
      { inner: 'register new player' });
    this.startGameButton = new AuthorizationButton(['authorization__button', 'start', 'authorization__hidden'],
      { inner: 'Start game', href: '#/game/', data: '#/game/' });
    this.stopGameButton = new AuthorizationButton(['authorization__button', 'stop', 'authorization__hidden'],
      { inner: 'Stop game', href: '#/', data: '#/' });
    this.profileButton = new AuthorizationButton(['authorization__profile', 'authorization__hidden'], { inner: '' });
    this.profileImage = new ProfileImage(['authorization__profile-image'], 'profile image', image);

    this.profileButton.element.append(this.profileImage.element);
    this.authorization.element.append(...[this.authorizationButton.element, this.startGameButton.element,
      this.stopGameButton.element, this.profileButton.element]);
    this.element.append(...[this.logo.element, this.gameTitle.element, this.menu.element, this.authorization.element]);
  }

  getMenuLink(): MenuLink[] {
    return this.menu.getList().getLinkItems();
  }

  getMenuItem(): MenuItem[] {
    return this.menu.getList().getMenuItems();
  }

  getButtons(): AuthorizationButton[] {
    return [this.authorizationButton, this.startGameButton, this.stopGameButton, this.profileButton];
  }

  setAvatar(path: string): void {
    this.profileImage.element.src = path;
  }
}
