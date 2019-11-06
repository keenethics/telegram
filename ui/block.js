import propsAreValid from '../helpers/propsChecker';

/**
 * Block is a constructor for DOM node.
 * @param {object} props
 * @param {string} props.tag - html tag to render
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {object} [props.children] - an array of func, block or class based components
 * @param {object} [props.eventHandlers] - { ['eventName']: eventHandler, click: () => null }.
 *  Don't use arrow functions if you want to access Block methods
 */
function Block(props) {
  const propsCheck = propsAreValid(props);
  if (!propsCheck.ok) {
    throw new Error(`Failed to construct DOM Node: ${propsCheck.error}`);
  }

  const node = document.createElement(props.tag);

  this.destroy = () => {
    if (props.eventHandlers) {
      for (let event in props.eventHandlers) {
        node.removeEventListener(event, props.eventHandlers[event]);
      }
    }
    node.remove();
  }

  for (let prop in props) {
    switch (prop) {
      case 'id':
        node.id = props[prop];
        break;

      case 'className':
        node.className = props[prop];
        break;

      case 'children':
        props[prop].forEach((child) => {
          node.append(child);
        });
        break;

      case 'eventHandlers':
        for (let event in props[prop]) {
          const boundHandler = props[prop][event].bind(this);
          node.addEventListener(event, boundHandler);
        }
        break;

      default:
        break;
    }
  }

  return node;
}

export default Block;
