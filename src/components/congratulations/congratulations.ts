import './congratulations.sass';
import { BaseComponent } from '../base-component';
import { CongratulationsWindow } from './window/window';
import { CongratulationsTitle } from './congratulations-title/congratulations-title';
import { CongratulationsButton } from './congratulations-button/congratulations-button';

export class Congratulations extends BaseComponent {
  private readonly window: CongratulationsWindow;

  private readonly title: CongratulationsTitle;

  private readonly continue: CongratulationsButton;

  constructor() {
    super('div', ['congratulations', 'hidden']);
    this.window = new CongratulationsWindow();
    this.title = new CongratulationsTitle();
    this.continue = new CongratulationsButton(['congratulations__button']);

    this.continue.element.innerHTML = 'ok';

    this.window.element.append(this.title.element);
    this.window.element.append(this.continue.element);
    this.element.append(this.window.element);
  }

  setTitle(string: string): void {
    this.title.element.innerHTML = string;
  }
}
