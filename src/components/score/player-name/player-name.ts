import './player-name.sass';
import { BaseComponent } from '../../base-component';

export class PlayerName extends BaseComponent {
  constructor() {
    super('p', ['player__name']);
  }
}
