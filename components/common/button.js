import { Block } from '../../ui';

const button = (props) => new Block({
  ...props,
  tag: 'button',
  className: `btn ${props.className || ''}`,
});

export default button;