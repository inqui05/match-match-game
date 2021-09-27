import './index.html';
import { App } from './app';
import { DataBase } from './bd';

const IBD = new DataBase();
window.onload = () => {
  IBD.init('inqui05').then(() => {
    const appElement = document.querySelector('.app');
    if (!appElement) {
      throw new Error('The element not found!');
    }

    const app = new App(appElement);
    app.gameControl(IBD);

    window.onpopstate = () => {
      const location = window.location.hash;
      if (location) {
        app.render(location);
        if (location === '#/game/') app.start(IBD);
      }
    };
  });
};
