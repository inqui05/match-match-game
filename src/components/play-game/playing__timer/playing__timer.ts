import './playing__timer.sass';
import { BaseComponent } from '../../base-component';

export class PlayingTimer extends BaseComponent {
  constructor() {
    super('div', ['playing__timer']);

    this.element.innerHTML = '<p class="playing__timer_text">:</p>';
  }
}
