import { Block } from '../ui';
import Button from './common/button';
import Logo from './logo';

const Header = () => new Block({
  tag: 'header',
  children: [
    Logo(),
    new Block({
      children: [
        Button({
          className: '-inverted',
          events: { click: () => console.log('button 1 clicked') },
          children: ['button 1']
        }),
        Button({
          className: '-inverted',
          events: { click: () => console.log('button 2 clicked') },
          children: ['button 2']
        }),
      ]
    })
  ],
});

export default Header;
