export default class BaseComponent {
  constructor(props) {
    this.props = props || {};

    this.render = this.render.bind(this);
    this.rerender = this.rerender.bind(this);

    if (this.props.store && this.props.field) this.props.store.subscribe(this.props.field, this.rerender);

    this.node = this.render();
    this.focused = null;
  }

  rerender() {
    if (this.node.contains(document.activeElement)) {
      this.focused = document.activeElement.id;
    }

    const node = this.render();

    this.node.replaceWith(node);
    this.node = node;

    if (this.focused) {
      const focusedElem = this.node.querySelector(`#${this.focused}`);
      focusedElem.focus();
      focusedElem.setSelectionRange(focusedElem.value.length, focusedElem.value.length);
      this.focused = null;
    }
  }
}
