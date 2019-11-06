import { Block } from '../ui';

const Header = Block({
  tag: 'header',
  className: 'header-class',
  id: 'header-id',
  children: [
    'hello world',
    Block({ tag: 'span', children: ['hi i am nested child'] })
  ],
  eventHandlers: {
    click: () => console.log('click caught!'),
    mouseenter: () => console.log('mouse entered'),
  }
});

export default Header;
