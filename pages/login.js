import { Block, Component } from '../ui';

class LoginPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { store } = this.props;

    const phoneNumber = store.get('phoneNumber');

    return new Block({
      className: 'page login-page',
      children: [
        new Block({
          className: 'login-page-form',
          children: [
            new Block({
              tag: 'img',
              className: 'logo',
            }),
            new Block({
              tag: 'h1',
              children: [
                'Sign in to Telegram ',
              ],
            }),
            new Block({
              tag: 'span',
              children: [
                'Please confirm your country and',
                new Block({ tag: 'br' }),
                'enter your phone number.'
              ]
            }),
            new Block({
              tag: 'input',
              className: 'input',
              id: 'elem-phonenumber',
              events: {
                input: function ({ target }) {
                  store.set('phoneNumber', target.value);
                },
              },
              attributes: {
                placeholder: 'Phone number',
                value: phoneNumber,
              },
            }),
          ]
        }),
      ],
    });
  }
}

export default LoginPage;
