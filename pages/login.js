import { Block, Component } from '../ui';
import CountryDropdown from '../components/countryDropdown';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
              attributes: {
                src: 'assets/tg-icon.png'
              }
            }),
            new Block({
              tag: 'h1',
              children: [
                'Sign in to Telegram',
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
            new CountryDropdown({
              store,
              field: ['countryInput', 'countryExpanded']
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
                placeholder: 'Phone Number',
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
