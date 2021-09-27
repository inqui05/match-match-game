import { BaseComponent } from '../../base-component';
import { PlayerEmail } from '../player-email/player-email';
import { PlayerName } from '../player-name/player-name';

export class PlayerAbout extends BaseComponent {
  private readonly name: PlayerName;

  private readonly email: PlayerEmail;

  constructor(name: string, email: string) {
    super('div', ['player__about']);
    this.name = new PlayerName();
    this.email = new PlayerEmail();

    this.name.element.innerHTML = name;
    this.email.element.innerHTML = email;

    this.element.append(this.name.element);
    this.element.append(this.email.element);
  }
}
