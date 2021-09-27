import './logo.sass';
import { BaseComponent } from '../../base-component';

export class Logo extends BaseComponent {
  constructor() {
    super('div', ['logo']);

    this.element.innerHTML = `
      <a href="#/" class="logo__half logo_white">match</a>
      <a href="#/" class="logo__half logo_blue">match</a>
      `;
  }
}
