import { Block, Component } from '../ui';

import appStore from '../stores/app';
import loginStore from '../stores/login';

import LoginPage from '../pages/login';
import ChatPage from '../pages/chat';

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { store } = this.props;

    const page = store.get('page');

    return new Block({
      tag: 'main',
      className: 'main',
      role: 'main',
      children: page === 'login' ? [
        new LoginPage({
          store: loginStore,
        }),
      ] : [
        ChatPage(),
      ],
      events: {
        // click: () => {
        //   store.set('page', 'chat');
        // }
      }
    });
  }
}

const AppWrapper = new App({
  store: appStore,
});

export default AppWrapper;
