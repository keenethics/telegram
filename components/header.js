import { Block } from '../ui';

const Header = new Block({
  tag: 'header',
  className: 'header-class',
  id: 'header-id',
  children: [
    'i am simple text',
    new Block({ tag: 'span', children: ['hi i am nested html element'] })
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
