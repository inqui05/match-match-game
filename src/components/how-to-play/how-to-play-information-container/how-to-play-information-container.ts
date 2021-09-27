import './how-to-play-information-container.sass';
import { BaseComponent } from '../../base-component';
import { HowToPlayNumber } from '../how-to-play-number/how-to-play-number';
import { HowToPlayInformation } from '../how-to-play-information/how-to-play-information';

export class HowToPlayInfoContainer extends BaseComponent {
  private readonly number: HowToPlayNumber;

  private readonly information: HowToPlayInformation;

  constructor(info: string, number: string) {
    super('div', ['how-to-play__information-container']);
    this.number = new HowToPlayNumber();
    this.information = new HowToPlayInformation();

    this.information.element.innerHTML = info;
    this.number.element.innerHTML = number;

    this.element.append(this.number.element);
    this.element.append(this.information.element);
  }
}
