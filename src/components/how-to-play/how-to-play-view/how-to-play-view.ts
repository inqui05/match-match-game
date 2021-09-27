import './how-to-play-view.sass';

export class HowToPlayView {
  readonly element: HTMLImageElement;

  constructor(styles: string[] = [], alt: string, src: string) {
    this.element = new Image();
    this.element.classList.add(...styles);
    this.element.alt = alt;
    this.element.src = src;
  }
}
