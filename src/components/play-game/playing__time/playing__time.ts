import './playing__time.sass';
import { BaseComponent } from '../../base-component';

export class PlayingTime extends BaseComponent {
  constructor() {
    super('div', ['playing__timer_text']);

    this.element.innerHTML = '00';
  }
}
