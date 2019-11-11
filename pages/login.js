import { Block, Component } from '../ui';
import Button from '../components/common/button';

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
          className: 'textarea',
          id: 'elem-phonenumber',
          events: {
            input: function (event) {
              store.set('phoneNumber', event.target.value);
            }
          },
          attributes: {
            placeholder: 'Phone number',
            value: phoneNumber,
          },
        }),
        Button({
          events: { click: () => {

          } },
          children: ['log in']
        }),
      ],
    });
  }
}

export default LoginPage;
