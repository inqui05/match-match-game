import '../../../style.sass';
import './authorization__button.sass';

export class AuthorizationButton {
  readonly element: HTMLAnchorElement;

  constructor(styles: string[] = [], params: Record<string, string>) {
    this.element = document.createElement('a');
    this.element.classList.add(...styles);
    this.element.innerHTML = params.inner;
    if (params.href) this.element.href = params.href;
    if (params.data) this.element.dataset.href = params.data;
  }
}
