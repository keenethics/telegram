import { Block } from '../ui';

const Header = new Block({
  tag: 'header',
  className: 'header-class',
  id: 'header-id',
  children: [
    '<h1>hello world</h1>',
    new Block({ tag: 'span', children: ['hi i am nested child'] })
  ],
  eventHandlers: {
    click: function () {
      console.log('click caught!');
    },
    mouseenter: () => {
      console.log('mouse entered!');
    },
  }
});

export default Header;
