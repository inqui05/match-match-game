import './player.sass';
import { BaseComponent } from '../../base-component';
import { PlayerInformation } from '../player-information/player-information';
import { PlayerResult } from '../player-result/player-result';

export class Player extends BaseComponent {
  private readonly information: PlayerInformation;

  private readonly result: PlayerResult;

  constructor(styles: string[] = [], alt: string, src: string, name: string, email: string, score: string) {
    super('div', ['player']);
    this.information = new PlayerInformation(styles, alt, src, name, email);
    this.result = new PlayerResult(score);

    this.element.append(...[this.information.element, this.result.element]);
  }
}
