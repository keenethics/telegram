import { Block } from '../ui';
import { Link } from '../router/link';

const Header = () => new Block({
  tag: 'header',
  children: [
    Link({
      to: '/',
      children: ['Home']
    }),
    Link({
      to: '/chat',
      children: ['Chat']
    }),
  ],
});

export default Header;
