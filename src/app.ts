import './style.sass';
import avatar from './assets/profile.svg';
import { Game } from './components/play-game/game';
import { Header } from './components/header/header';
import { ImageCategoryModel } from './models/image-category-model';
import { Settings } from './components/settings/settings';
import { HowToPlay } from './components/how-to-play/how-to-play';
import { Score } from './components/score/score';
import { Registration } from './components/registration/registration';
import { DataBase } from './bd';
import { MenuItem } from './components/header/menu-item/menu-item';

const EASY_LEVEL_CARD_COUNT = 8;
const MIDDLE_LEVEL_CARD_COUNT = 10;
const HARD_LEVEL_CARD_COUNT = 12;

export class App {
  private readonly header: Header;

  private readonly game: Game;

  private readonly settings: Settings;

  private readonly howToPlay: HowToPlay;

  private readonly score: Score;

  private readonly registration: Registration;

  private readonly player: Record<string, string>;

  private BD: DataBase | null;

  constructor(private readonly rootElement: Element) {
    this.header = new Header();
    this.settings = new Settings();
    this.howToPlay = new HowToPlay();
    this.score = new Score();
    this.game = new Game();
    this.registration = new Registration();
    this.player = {};
    this.BD = null;

    this.rootElement.before(this.header.element);
    this.rootElement.append(this.howToPlay.element);
    this.rootElement.after(this.registration.element);
  }

  gameControl(BD: DataBase): void {
    this.BD = BD;

    this.header.element.addEventListener('click', (event) => this.controllHeaderButtons(event));
    this.registration.element.addEventListener('click', (event) => this.controllRegistrationWindow(event));
  }

  controllHeaderButtons(event: Event):void {
    if (event.target instanceof Element) {
      if (event.target.classList.contains('register')) {
        this.registration.element.classList.remove('hidden');
      } else if (event.target.classList.contains('stop')) {
        this.game.stopGame();
      }
    }
  }

  controllRegistrationWindow(event: Event):void {
    const [logIn, start, , profile] = this.header.getButtons();

    if (event.target instanceof Element) {
      if (!event.target.closest('.registration__window')) {
        this.registration.element.classList.add('hidden');
      } else if (event.target.classList.contains('registration__button_blue')) {
        this.header.setAvatar(this.registration.getAvatarImage());
        this.createPlayerData();
        logIn.element.classList.add('authorization__hidden');
        start.element.classList.remove('authorization__hidden');
        profile.element.classList.remove('authorization__hidden');
        this.registration.element.classList.add('hidden');
        this.clearInputs();
      } else if (event.target.classList.contains('registration__button_white')) {
        this.registration.element.classList.add('hidden');
        this.clearInputs();
      }
    }
  }

  async start(BD: DataBase): Promise<void> {
    this.BD = BD;
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const level = this.settings.getGameType();
    const cardsType = this.settings.getCardsType();
    const cat = cardsType === 'people' ? categories[1] : categories[0];
    let cardCount;

    if (level === 'null' || level === 'easy') {
      cardCount = EASY_LEVEL_CARD_COUNT;
      cat.images = cat.images.slice(0, cardCount);
    } else if (level === 'medium') {
      cardCount = MIDDLE_LEVEL_CARD_COUNT;
      cat.images = cat.images.slice(0, cardCount);
      this.game.getContainer().element.classList.add('playing-container_medium');
    } else {
      cardCount = HARD_LEVEL_CARD_COUNT;
      this.game.getContainer().element.classList.add('playing-container_hard');
    }

    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images, cardCount, this.player, this.BD);
  }

  render(location: string): void {
    const buttons = this.header.getButtons();
    const [aboutButton, scoreButton, settingButton] = this.header.getMenuItem();

    this.header.getMenuItem().forEach((elem) => {
      elem.element.classList.remove('menu__item_active');
    });

    switch (location) {
      case '#/':
        this.clearFieldAndAppendNewBlock(this.howToPlay.element, aboutButton);
        buttons.forEach((elem) => elem.element.classList.add('authorization__hidden'));
        buttons[0].element.classList.remove('authorization__hidden');
        break;
      case '#/score/':
        if (this.BD) {
          const promise = this.BD.readAll('Match-match-game');
          promise.then((resolve) => {
            this.score.setPlayers(resolve);
            this.clearFieldAndAppendNewBlock(this.score.element, scoreButton);
          });
        } else {
          this.clearFieldAndAppendNewBlock(this.score.element, scoreButton);
        }
        break;
      case '#/settings/':
        this.clearFieldAndAppendNewBlock(this.settings.element, settingButton);
        break;
      case '#/game/':
        this.clearFieldAndAppendNewBlock(this.game.element);
        buttons[1].element.classList.add('authorization__hidden');
        buttons[2].element.classList.remove('authorization__hidden');
        break;
      default:
        break;
    }
  }

  clearFieldAndAppendNewBlock(element: HTMLElement, button: MenuItem | null = null):void {
    this.rootElement.innerHTML = '';
    this.rootElement.append(element);
    if (button) button.element.classList.add('menu__item_active');
  }

  createPlayerData(): void {
    const data = this.registration.getInputs();
    this.player.photo = this.registration.getAvatarImage();
    this.player.name = `${data[0].element.value} ${data[1].element.value}`;
    this.player.email = `${data[2].element.value}`;
  }

  private clearInputs(): void {
    const inputs = this.registration.getInputs();
    this.registration.setAvatarImage(avatar);
    inputs.forEach((elem) => {
      elem.element.value = '';
    });
  }
}
