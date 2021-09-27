import './select.sass';
import { BaseComponent } from '../../base-component';

export class Select extends BaseComponent {
  readonly element: HTMLSelectElement;

  constructor(tag: keyof HTMLElementTagNameMap, styles: string[] = [], name: string, id: string) {
    super();
    this.element = document.createElement('select');
    this.element.classList.add(...styles);
    this.element.setAttribute('name', name);
    this.element.id = id;
  }
}
