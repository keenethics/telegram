import { Block } from '../ui';

const Header = new Block({
  tag: 'header',
  className: 'header-class',
  id: 'header-id',
  children: [
    'hello world',
    new Block({ tag: 'span', children: ['hi i am nested child'] })
  ],
  eventHandlers: {
    click: function () {
      console.log('click caught! destroying');
      this.destroy();
    },
    mouseleave: () => {
      console.log('mouse leaving');
      console.log('this is', this);
    },
  }
});

export default Header;
