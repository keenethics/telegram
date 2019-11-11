export default class BaseComponent {
  constructor(props) {
    this.props = props || {};

    this.render = this.render.bind(this);
    this.rerender = this.rerender.bind(this);

    if (this.props.store && this.props.field) this.props.store.subscribe(this.props.field, this.rerender);

    this.node = this.render();

    return this.node;
  }

  rerender() {
    console.log('update');
    const node = this.render();

    this.node.replaceWith(node);
    this.node = node;
  }
}
