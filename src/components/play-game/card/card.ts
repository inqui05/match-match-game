import './card.sass';
import { BaseComponent } from '../../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container', FLIP_CLASS]);

    this.element.innerHTML = `
      <div class="card">
        <div class="card__side card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__side card__back"></div>
      </div>`;
  }

  flipToBack(): void {
    this.isFlipped = true;
    this.element.classList.remove(FLIP_CLASS);
  }

  flipToFront(): void {
    this.isFlipped = false;
    this.element.classList.add(FLIP_CLASS);
  }
}
