import './score-title.sass';
import { BaseComponent } from '../../base-component';

export class ScoreTitle extends BaseComponent {
  constructor() {
    super('h2', ['score__title']);
  }
}
