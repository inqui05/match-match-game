import './score.sass';
import { BaseComponent } from '../base-component';
import { ScoreTitle } from './score-title/score-title';
import { ScoreContainer } from './score-container/score-container';
import { Player } from './player/player';
import { MyRecord } from '../../myRecord';

const MAX_PLAYERS_IN_PAGE = 10;

export class Score extends BaseComponent {
  private readonly container: ScoreContainer;

  private readonly title: ScoreTitle;

  constructor() {
    super('section', ['score']);
    this.container = new ScoreContainer();
    this.title = new ScoreTitle();
    this.title.element.innerHTML = 'Best players';

    this.element.append(this.container.element);
  }

  setPlayers(players: Array<MyRecord>): void {
    this.container.element.innerHTML = '';
    this.container.element.append(this.title.element);
    const arr: Array<number> = [];
    players.forEach((elem) => arr.push(+elem.result));
    arr.sort((a, b) => a - b).reverse();
    const number = arr.length > MAX_PLAYERS_IN_PAGE ? MAX_PLAYERS_IN_PAGE : arr.length;

    for (let i = 0; i < number; i++) {
      players.forEach((elem) => {
        if (arr[i] === +elem.result) {
          const player = new Player(['player__avatar-image'], 'avatar of the player', elem.photo,
            elem.name, elem.email, elem.result);
          this.container.element.append(player.element);
        }
      });
    }
  }
}
