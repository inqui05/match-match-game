export class MenuLink {
  readonly element: HTMLAnchorElement;

  constructor(styles: string[] = [], href: string, dataset: string) {
    this.element = document.createElement('a');
    this.element.classList.add(...styles);
    this.element.href = href;
    this.element.dataset.href = dataset;
  }
}
