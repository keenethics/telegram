import { Block, Store } from '../ui';

import LoginPage from '../pages/login';
import ChatPage from '../pages/chat';

const appStore = new Store({
  page: 'login',
});

class App {
  constructor () {
    this.element = null;

    this.render = this.render.bind(this);

    appStore.subscribe('page', this.render);
  }

  render () {
    const page = appStore.get('page');

    const element = new Block({
      tag: 'main',
      className: 'main',
      role: 'main',
      children: page === 'login' ? [
        LoginPage(),
      ] : [
        ChatPage(),
      ],
      events: {
        click: (e) => {
          appStore.set('page', 'chat');
        }
      }
    });

    if (!this.element) {
      this.element = element;

      return this.element;
    }

    this.element.innerHtml = page;
  }
}

const AppWrapper = new App();

export default AppWrapper;