import { Block, Component } from '../ui';
import { Link } from '../ui/router';

class LoginPage extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { store } = this.props;

    const login = store.get();

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
          placeholder: 'Phone number',
          events: {
            input: function () {
            }
          }
        }),
        Link({
          to: '/about',
          children: ['Link to Test     ...    ']
        }),
        Link({
          to: '/',
          children: ['\nLink to / ']
        }),
      ],
    });
  }
}

export default LoginPage;
