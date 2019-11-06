import propsAreValid from '../helpers/propsChecker';

/**
 * Block is a constructor for DOM node.
 * @param {Object} props
 * @param {string} props.tag - html tag to render
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {Object} [props.children] - an array of func, block or class based components
 * @param {Object} [props.eventHandlers] - { ['eventName']: eventHandler, click: () => null }
 */
function Block(props) {
  const propsCheck = propsAreValid(props);
  if (!propsCheck.ok) {
    throw new Error(`Failed to construct DOM Node: ${propsCheck.error}`);
  }

  const node = document.createElement(props.tag);

  for (let prop in props) {
    switch (prop) {
      case 'id':
        node.id = props[prop];
        break;
      case 'className':
        node.className = props[prop];
        break;
      case 'children':
        // TODO add children
        break;
      case 'eventHandlers':
        // TODO set handlers
        break;
      default:
        break;
    }
  }

  return node;
}

export default Block;
