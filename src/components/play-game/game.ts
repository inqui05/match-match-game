import './game.sass';
import { BaseComponent } from '../base-component';
import { PlayingContainer } from './playing-container/playing-container';
import { delay } from '../../shared/delay';
import { Card } from './card/card';
import { GameField } from './game-field/game-field';
import { PlayingTimer } from './playing__timer/playing__timer';
import { PlayingTime } from './playing__time/playing__time';
import { Congratulations } from '../congratulations/congratulations';
import { MyRecord } from '../../myRecord';
import { DataBase } from '../../bd';

const FLIP_DELAY = 1000;
const SECONDS_PER_MINUTE = 60;
const TWO_DIGIT_NUMBER = 10;
const TIME_TO_REMEMBER_CARDS = 5000;
const ONE_SECOND = 1000;
const OPEN_CARD_TIME = 500;
const SPEND_SECOND_COEFFICIENT = 10;
const MATCH_COEFFICIENT = 100;
let timer: ReturnType<typeof setInterval>;
let timeOut: ReturnType<typeof setTimeout>;
let matches = 0;

export class Game extends BaseComponent {
  private readonly playingContainer: PlayingContainer;

  private readonly gameField: GameField;

  private readonly playingTimer: PlayingTimer;

  private playingMinutes: PlayingTime;

  private playingSeconds: PlayingTime;

  private readonly congratulations: Congratulations;

  private activeCard?: Card;

  private isAnimation = false;

  private matches = 0;

  private player: Record<string, string>;

  private BD: DataBase | null;

  constructor() {
    super('section', ['game']);
    this.gameField = new GameField();
    this.playingContainer = new PlayingContainer();
    this.playingTimer = new PlayingTimer();
    this.playingSeconds = new PlayingTime();
    this.playingMinutes = new PlayingTime();
    this.congratulations = new Congratulations();
    this.player = {};
    this.BD = null;

    this.congratulations.element.addEventListener('click', (event) => this.closeCongratulation(event));
    this.playingSeconds.element.classList.add('playing__seconds');
    this.playingMinutes.element.classList.add('playing__minutes');

    this.playingTimer.element.prepend(this.playingMinutes.element);
    this.playingTimer.element.append(this.playingSeconds.element);
    this.playingContainer.element.append(...[this.playingTimer.element, this.gameField.element]);
    this.element.append(...[this.playingContainer.element, this.congratulations.element]);
  }

  newGame(images: string[], count: number, player: Record<string, string>, BD: DataBase): void {
    this.BD = BD;
    this.player = player;
    this.matches = count;
    this.gameField.clear();

    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.gameField.addCards(cards);
    this.timer();
  }

  stopGame(): void {
    clearInterval(timeOut);
    clearInterval(timer);
    this.gameField.clear();
  }

  finish(): void {
    this.countPoints();
    const record: MyRecord = {
      id: 0,
      photo: this.player.photo,
      name: this.player.name,
      email: this.player.email,
      result: this.player.result,
    };

    if (this.BD) this.BD.write('Match-match-game', record);
    matches = 0;
    clearInterval(timeOut);
    clearInterval(timer);

    const minutes = +this.playingMinutes.element.innerHTML;
    const seconds = +this.playingSeconds.element.innerHTML;
    const time = `${minutes}.${seconds}`;

    this.showCongratulation(time);
  }

  showCongratulation(time: string):void {
    this.congratulations.setTitle(`Congratulations! You successfully found all matches on ${time} minutes.`);
    this.congratulations.element.classList.remove('hidden');
  }

  closeCongratulation(event: Event):void {
    if (event.target instanceof Element && event.target.classList.contains('congratulations__button')) {
      this.congratulations.element.classList.add('hidden');
      window.location.hash = '#/';
      this.gameField.clear();
    }
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;

    this.isAnimation = true;

    card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      setTimeout(() => {
        this.checked(card, 'red');
      }, OPEN_CARD_TIME);
      await delay(FLIP_DELAY);
      this.checked(card, 'red');
      try {
        await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      } catch {
        card.flipToBack();
      }
      this.activeCard = undefined;
      this.isAnimation = false;
    } else if (this.activeCard.image === card.image) {
      matches++;
      setTimeout(() => {
        this.checked(card, 'green');
        this.activeCard = undefined;
        this.isAnimation = false;
      }, OPEN_CARD_TIME);
    }

    if (matches === this.matches) this.finish();
  }

  private checked(card: Card, style: string): void {
    if (this.activeCard) this.activeCard.element.classList.toggle(style);
    card.element.classList.toggle(style);
  }

  private timer(): void {
    let seconds = 0;
    let minutes = 0;

    this.setSeconds(0);
    this.setMinutes(0);

    timeOut = setTimeout(() => {
      timer = setInterval(() => {
        seconds++;

        if (seconds >= SECONDS_PER_MINUTE) {
          seconds -= SECONDS_PER_MINUTE;
          minutes++;
        }

        this.setSeconds(seconds);
        this.setMinutes(minutes);
      }, ONE_SECOND);
    }, TIME_TO_REMEMBER_CARDS);
  }

  countPoints(): number {
    const elapsedTime = +this.playingMinutes.element.innerHTML * SECONDS_PER_MINUTE
      + +this.playingSeconds.element.innerHTML;
    const points = matches * MATCH_COEFFICIENT - elapsedTime * SPEND_SECOND_COEFFICIENT;
    this.player.result = String(points);
    return points > 0 ? points : 0;
  }

  setMinutes(number: number): void {
    if (number < TWO_DIGIT_NUMBER) {
      this.playingMinutes.element.innerHTML = `0${String(number)}`;
    } else {
      this.playingMinutes.element.innerHTML = String(number);
    }
  }

  setSeconds(number: number): void {
    if (number < TWO_DIGIT_NUMBER) {
      this.playingSeconds.element.innerHTML = `0${String(number)}`;
    } else {
      this.playingSeconds.element.innerHTML = String(number);
    }
  }

  getContainer(): PlayingContainer {
    return this.playingContainer;
  }
}
