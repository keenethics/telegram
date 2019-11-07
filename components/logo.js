import { Block } from '../ui';

const Logo = () => new Block({
  tag: 'span',
  className: 'logo',
  children: ['Keen Telegram'],
});

export default Logo;
