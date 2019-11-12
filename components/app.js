import { Block, Component } from '../ui';

import appStore from '../stores/app';
import loginStore from '../stores/login';

// import Header from '../components/header';

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
      children: [
        // Header(),
        page === '/' ? new LoginPage({ store: loginStore, field: 'phoneNumber' }) : ChatPage(),
      ],
    });
  }
}

const AppWrapper = new App({
  store: appStore,
  field: 'page',
});

export default AppWrapper;
