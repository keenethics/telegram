import { Block, Store } from '../ui';

import LoginPage from '../pages/login';

const appStore = new Store({
  page: 'login',
});

const App = () => new Block({
  tag: 'main',
  className: 'main',
  role: 'main',
  children: [
    LoginPage(),
  ],
});

export default App;