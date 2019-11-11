import { Block, Component } from '../ui';

class LoginPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { store } = this.props;

    const phone = store.get('phoneNumber');

    console.log(phone);

    return new Block({
      className: 'page login-page',
      children: [
        new Block({
          className: 'login-page-header',
          children: [
            new Block({
              className: 'logo',
            }),
            new Block({
              tag: 'h1',
              children: [
                'Sign in to Telegram ',
                new Block({
                  tag: 'span',
                  children: [
                    'Please confirm your country and enter your phone number.'
                  ]
                }),
              ],
            })
          ]
        }),
        new Block({
          tag: 'input',
          className: 'textfield',
          placeholder: 'Phone number',
          value: phone,
          events: {
            input: function ({ target }) {
              store.set('phoneNumber', target.value);
            }
          }
        }),
      ],
    });
  }
}

export default LoginPage;
