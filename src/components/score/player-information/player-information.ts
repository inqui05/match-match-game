import './player-information.sass';
import { BaseComponent } from '../../base-component';
import { PlayerAvatar } from '../player-avatar/player-avatar';
import { PlayerAbout } from '../player-about/player-about';

export class PlayerInformation extends BaseComponent {
  private readonly avatar: PlayerAvatar;

  private readonly information: PlayerAbout;

  constructor(styles: string[] = [], alt: string, src: string, name: string, email: string) {
    super('div', ['player__information']);
    this.avatar = new PlayerAvatar(styles, alt, src);
    this.information = new PlayerAbout(name, email);

    this.element.append(...[this.avatar.element, this.information.element]);
  }
}
