export default class BaseComponent {
  constructor(props) {
    this.props = props || {};

    this.render = this.render.bind(this);
    this.rerender = this.rerender.bind(this);

    if (this.props.store) this.props.store.subscribe('page', this.rerender);

    this.node = this.render();

    return this.node;
  }

  rerender() {
    const node = this.render();

    this.node.replaceWith(node);
  }
}
