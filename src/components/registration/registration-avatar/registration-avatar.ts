import './registration-avatar.sass';
import avatar from '../../../assets/profile.svg';
import wrapper from '../../../assets/add-photo.svg';
import { BaseComponent } from '../../base-component';
import { RegistrationContainer } from '../registration-container/registration-container';
import { RegistrationImage } from '../registration-image/registration-image';
import { RegistrationAvatarInput } from '../registration-avatar-input/registration-avatar-input';

export class RegistrationAvatar extends BaseComponent {
  private readonly container: RegistrationContainer;

  private readonly avatar: RegistrationImage;

  private readonly addAvatar: RegistrationImage;

  private readonly input: RegistrationAvatarInput;

  constructor() {
    super('div', ['registration__avatar']);
    this.container = new RegistrationContainer();
    this.avatar = new RegistrationImage(['registration__avatar-image', 'registration__avatar-image_hover'],
      'your avatar', avatar);
    this.addAvatar = new RegistrationImage(['registration__avatar-add'], 'add avatar', wrapper);
    this.input = new RegistrationAvatarInput();
    this.input.element.addEventListener('input', () => this.loadImage());

    this.container.element.append(this.avatar.element);
    this.container.element.append(this.addAvatar.element);
    this.container.element.append(this.input.element);
    this.element.append(this.container.element);
  }

  private loadImage(): void {
    if (this.input.element.files) {
      const file = this.input.element.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') this.avatar.element.src = reader.result;
      };
      reader.readAsDataURL(file);

      this.input.element.value = '';
    }
  }

  getImage(): string {
    return this.avatar.element.src;
  }

  setImage(src: string): void {
    this.avatar.element.src = src;
  }
}
