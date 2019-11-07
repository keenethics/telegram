import { block, Store, Component } from '../ui/index';

const store = new Store({
  counters: [
    {
      value: 1,
    },
    {
      value: 0,
    },
  ],
});

class counterValue extends Component {
  constructor (props) {
    super(props);

    this.index = props.index;
    this.store = props.store;
    this.element = null;

    this.render = this.render.bind(this);

    this.store.subscribe(this.render);
  }

  render () {
    const counter = this.store.get('counters')[this.index].value;

    console.log(this.store.get('counters'));

    const element = block('div', {
      className: 'sidebar-increase-button',
      children: counter,
    });

    if (!this.element) {
      this.element = element;

      return this.element;
    }

    this.element.innerHTML = counter;
  }
}

const increaseButton = (index) => block('button', {
  className: 'sidebar-increase-button',
  children: '+',
  onClick: function () {
    const counters = [...store.get('counters')];

    counters[index] = { value: counters[index].value + 1 };

    store.set('counters', counters);
  }
});

const decreaseButton = (index) => block('button', {
  className: 'sidebar-decrease-button',
  children: '-',
  onClick: function () {
    const counters = [...store.get('counters')];

    counters[index] = { value: counters[index].value - 1 };

    store.set('counters', counters);
  }
});

const children = [
  block('div', {
    className: 'counter',
    children: [
      increaseButton(0),
      new counterValue({ index: 0, store }),
      decreaseButton,
    ],
  }),
  block('div', {
    className: 'counter',
    children: [
      increaseButton(1),
      new counterValue({ index: 1, store }),
      decreaseButton,
    ],
  }),
];

const sidebar = block('div', {
  className: 'sidebar',
  id: 'sidebar',
  children,
});

export default sidebar;
