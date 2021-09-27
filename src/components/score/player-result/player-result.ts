import './player-result.sass';
import { BaseComponent } from '../../base-component';
import { PlayerScore } from '../player-score/player-score';

export class PlayerResult extends BaseComponent {
  private readonly score: PlayerScore;

  constructor(score: string) {
    super('p', ['player__result']);
    this.score = new PlayerScore();
    this.score.element.innerHTML = `${score}`;
    this.element.innerHTML = 'Score: ';

    this.element.append(this.score.element);
  }
}
