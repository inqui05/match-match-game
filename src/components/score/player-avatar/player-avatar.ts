import './player-avatar.sass';
import { BaseComponent } from '../../base-component';
import { PlayerAvatarImage } from '../player-avatar-image/player-avatar-image';

export class PlayerAvatar extends BaseComponent {
  private readonly image: PlayerAvatarImage;

  constructor(styles: string[] = [], alt: string, src: string) {
    super('div', ['player__avatar']);
    this.image = new PlayerAvatarImage(styles, alt, src);

    this.element.append(this.image.element);
  }
}
