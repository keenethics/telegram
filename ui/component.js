export default class BaseComponent {
  constructor(props) {
    // props.subscription will be passed by withSubscription
    const {
      store, fields
    } = props.subscription;

    store.subscribe(fields, this._onUpdate);
  }

  _onUpdate(value) {
    if (this.onUpdate) return this.onUpdate(value);
    throw new Error(
      'It seems that you\'ve subscribed to store updates but didn\'t define `onUpdate method`'
    );
      
  }

  // render() {
  //   const {
  //     tag,
  //     className,
  //     children,
  //     events,
  //   } = this.props;

  //   return block(tag, {
  //     className,
  //     children,
  //     events,
  //   });
  // }
}
