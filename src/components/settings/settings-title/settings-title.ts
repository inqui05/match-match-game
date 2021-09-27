import './settings-title.sass';
import { BaseComponent } from '../../base-component';

export class SettingsTitle extends BaseComponent {
  constructor() {
    super('h2', ['settings__title']);
  }
}
