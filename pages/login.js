import {
  Block
} from '../ui';
import { Link } from '../ui/router/index';

const LoginPage = () => new Block({
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
              'Sign in to Telegram',
              new Block({
                tag: 'span',
                children: [
                  'Please confirm your country and enter your phone number.'
                ]
              }),
            ],
          }),
          Link({
            to: '/about',
            children: ['Link to Test     ...    ']
          }),
          Link({
            to: '/',
            children: ['\nLink to / ']
          })
        ]
      }),
      new Block({
        tag: 'input',
        className: 'textarea',
        placeholder: 'Phone number',
        events: {
          input: function (e) {
          }
        }
      }),
    ],
  });

export default LoginPage;