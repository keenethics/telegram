import propsAreValid from '../helpers/propsChecker';

/**
 * Block is a constructor for DOM node.
 * Event handlers must NOT be arrow to preserve `this` pointing to Block's own context.
 * @param {object} props
 * @param {string} props.tag - html tag to render
 * @param {string} [props.id]
 * @param {string} [props.className]
 * @param {object} [props.children] - an array of func, block or class based components
 * @param {object} [props.events] - { ['eventName']: eventHandler, click: function() { return null; } }
 */
function Block(props) {
  const propsCheck = propsAreValid(props);

  if (!propsCheck.ok) {
    throw new Error(`Failed to construct DOM Node: ${propsCheck.error}`);
  }

  this.options = props.options || null;

  const node = document.createElement(props.tag || 'div');
  const propKeys = Object.keys(props);

  for (let propIndex = 0; propIndex < propKeys.length; propIndex++) {
    const prop = propKeys[propIndex];

    switch (prop) {
      case 'id':
        node.id = props[prop];
        break;

      case 'className':
        node.className = props[prop];
        break;
      case 'children':
        for (let childIndex = 0; childIndex < props[prop].length; childIndex++) {
          node.append(props[prop][childIndex]);
        }
        break;

      case 'events':
        for (let event in props[prop]) {
          const boundHandler = props[prop][event].bind(this);
          node.addEventListener(event, boundHandler);
        }
        break;

      default:
        break;
    }
  }

  // TODO move to BaseComponent, Block doesnt need it
  // this.destroy = () => {
  //   if (props.eventHandlers) {
  //     for (let event in props.eventHandlers) {
  //       node.removeEventListener(event, props.eventHandlers[event]);
  //     }
  //   }
  //   node.remove();
  // }

  return node;
}

export default Block;
