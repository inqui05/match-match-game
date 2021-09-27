import './settings.sass';
import { BaseComponent } from '../base-component';
import { Container } from './container/container';
import { Options } from './options/options';
import { Select } from './select/select';
import { SettingsTitle } from './settings-title/settings-title';
import { Information } from './information/information';

export class Settings extends BaseComponent {
  private readonly container: Container;

  private readonly optionsGame: Options;

  private readonly optionsLevel: Options;

  private readonly settingsCardTitle: SettingsTitle;

  private readonly settingsLevelTitle: SettingsTitle;

  private readonly selectCardType: Select;

  private readonly selectGameType: Select;

  private readonly information: Information;

  constructor() {
    super('section', ['settings']);
    this.container = new Container();
    this.optionsGame = new Options();
    this.optionsLevel = new Options();
    this.settingsCardTitle = new SettingsTitle();
    this.settingsLevelTitle = new SettingsTitle();
    this.selectCardType = new Select('select', ['settings__select'], 'card-type', 'type');
    this.selectGameType = new Select('select', ['settings__select'], 'game-type', 'difficulties');
    this.information = new Information();

    this.selectCardType.element.innerHTML = `
      <option value="null" class="settings__options">select game cards type</option>
      <option value="animal" class="settings__options">animals</option>
      <option value="people" class="settings__options">people</option>
    `;
    this.selectGameType.element.innerHTML = `
      <option value="null" class="settings__options" selected>select game type</option>
      <option value="easy" class="settings__options">4x4</option>
      <option value="medium" class="settings__options">4x5</option>
      <option value="hard" class="settings__options">4x6</option>
    `;
    this.information.element.innerHTML = `*If you don't choose anything the game will start
      with animal cards and the 4x4 field`;
    this.settingsCardTitle.element.innerHTML = 'Game cards';
    this.settingsLevelTitle.element.innerHTML = 'Difficulty';

    this.optionsGame.element.append(...[this.settingsCardTitle.element, this.selectCardType.element]);
    this.optionsLevel.element.append(...[this.settingsLevelTitle.element, this.selectGameType.element]);
    this.container.element.append(...[this.optionsGame.element, this.optionsLevel.element, this.information.element]);
    this.element.append(this.container.element);
  }

  getCardsType(): string {
    return this.selectCardType.element.value;
  }

  getGameType(): string {
    return this.selectGameType.element.value;
  }
}
