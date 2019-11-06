// import { block, Store, Component } from '../ui/index';

// const counter = new Store({
//   value: 0,
// });

// class counterValue extends Component {
//   constructor (props) {
//     super(props);

//     window.events.subscribe('change', this.render);
//   }

//   render () {
//     return block('div', {
//       className: 'sidebar-increase-button',
//       children: 0,
//     });
//   }
// }

// const counterValueComponent = new counterValue(counter);

// const increaseButton = block('button', {
//   className: 'sidebar-increase-button',
//   children: '+',
//   onClick: function () {
//     let previousValue = counter.get('value');
//     counter.set('value', previousValue += 1);
//   }
// });

// const decreaseButton = block('button', {
//   className: 'sidebar-decrease-button',
//   children: '-',
//   onClick: function () {
//     let previousValue = counter.get('value');
//     counter.set('value', previousValue -= 1);
//   }
// });

// const sidebar = block(
//   'div',
//   {
//     className: 'sidebar',
//     id: 'sidebar',
//     children: [
//       increaseButton,
//       counterValueComponent,
//       decreaseButton,
//     ],
//   }
// );

// export default sidebar;
