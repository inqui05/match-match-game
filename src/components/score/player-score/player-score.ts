import './player-score.sass';
import { BaseComponent } from '../../base-component';

export class PlayerScore extends BaseComponent {
  constructor() {
    super('span', ['player__score']);
  }
}
