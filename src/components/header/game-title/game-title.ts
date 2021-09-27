import './game-title.sass';
import { BaseComponent } from '../../base-component';

export class GameTitle extends BaseComponent {
  constructor() {
    super('h1', ['game-title']);

    this.element.innerHTML = 'Match-match game';
  }
}
