import { Block } from '../ui';

const Header = Block({
  tag: 'header',
  className: 'header-class',
  id: 'header-id',
  children: ['hello world', Block({ tag: 'span', children: ['hi i am nested child'] })],
});

export default Header;
