const childrenFallback = function (children) {
  if (typeof children === 'string') return document.createTextNode(children);
  if (typeof children === 'function') return children();
  if (typeof children === 'object' && children.render) return children.render();

  return children;
}

export default function block (type, parameters) {
  const element = document.createElement(type);
  const keys = Object.keys(parameters);

  for (let i = 0; i <= keys.length; i += 1) {
    const targetKey = keys[i];
    const targetValue = parameters[targetKey];

    switch (targetKey) {
      case 'id':
        element.id = targetValue;
        break;
      case 'className':
        element.className = targetValue;
        break;
      case 'children':
        if (Array.isArray(targetValue)) {
          for (let t = targetValue.length - 1; t >= 0; t -= 1) {
            element.insertBefore(childrenFallback(targetValue[t]), element.firstChild);
          }

          break;
        }

        element.append(childrenFallback(targetValue));

        break;
      case 'onClick':
        element.addEventListener('click', targetValue);
        break;
      default:
        break;
    }
  }

  return element;
}
