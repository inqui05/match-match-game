import './how-to-play.sass';
import firstImage from '../../assets/registration-view.jpg';
import secondImage from '../../assets/settings-view.jpg';
import thirdImage from '../../assets/game-view.jpg';
import { BaseComponent } from '../base-component';
import { HowToPlayContainer } from './how-to-play-container/how-to-play-container';
import { HowToPlayTitle } from './how-to-play-title/how-to-play-title';
import { HowToPlayStep } from './how-to-play-step/how-to-play-step';
import { HowToPlayRegistration } from './how-to-play-registration/how-to-play-registration';
import { HowToPlayInfoContainer } from './how-to-play-information-container/how-to-play-information-container';
import { HowToPlayView } from './how-to-play-view/how-to-play-view';
import { HowToPlayConfiguration } from './how-to-play-configuration/how-to-play-configuration';
import { HowToPlayStart } from './how-to-play-start/how-to-play-start';

export class HowToPlay extends BaseComponent {
  private readonly container: HowToPlayContainer;

  private readonly title: HowToPlayTitle;

  private readonly firstStep: HowToPlayStep;

  private readonly secondStep: HowToPlayStep;

  private readonly thirdStep: HowToPlayStep;

  private readonly registration: HowToPlayRegistration;

  private readonly configuration: HowToPlayConfiguration;

  private readonly start: HowToPlayStart;

  private readonly infoContainer: HowToPlayInfoContainer;

  private readonly secondInfoContainer: HowToPlayInfoContainer;

  private readonly thirdInfoContainer: HowToPlayInfoContainer;

  private readonly firstStepImage: HowToPlayView;

  private readonly secondStepImage: HowToPlayView;

  private readonly thirdStepImage: HowToPlayView;

  constructor() {
    super('section', ['how-to-play']);
    this.container = new HowToPlayContainer();
    this.title = new HowToPlayTitle();
    this.firstStep = new HowToPlayStep();
    this.secondStep = new HowToPlayStep();
    this.thirdStep = new HowToPlayStep();
    this.registration = new HowToPlayRegistration();
    this.configuration = new HowToPlayConfiguration();
    this.start = new HowToPlayStart();
    this.infoContainer = new HowToPlayInfoContainer('Register new player in game', '1');
    this.secondInfoContainer = new HowToPlayInfoContainer('Configure your game settings', '2');
    this.thirdInfoContainer = new HowToPlayInfoContainer(`Start you new game! Remember card positions and
      match it before times up.`, '3');
    this.firstStepImage = new HowToPlayView(['how-to-play__view', 'how-to-play__view_register'],
      'registration form', `${firstImage}`);
    this.secondStepImage = new HowToPlayView(['how-to-play__view', 'how-to-play__view_settings'],
      'game settings', `${secondImage}`);
    this.thirdStepImage = new HowToPlayView(['how-to-play__view', 'how-to-play__view_game'],
      'game view', `${thirdImage}`);

    this.title.element.innerHTML = 'How to play?';

    this.registration.element.append(this.infoContainer.element);
    this.configuration.element.append(this.secondInfoContainer.element);
    this.start.element.append(this.thirdInfoContainer.element);
    this.firstStep.element.append(...[this.registration.element, this.firstStepImage.element]);
    this.secondStep.element.append(...[this.configuration.element, this.secondStepImage.element]);
    this.thirdStep.element.append(...[this.start.element, this.thirdStepImage.element]);
    this.container.element.append(...[this.title.element, this.firstStep.element,
      this.secondStep.element, this.thirdStep.element]);
    this.element.append(this.container.element);
  }
}
