import validHtmlTags from '../const/htmlTags';
import validDomEvents from '../const/domEvents';

const propsAreValid = (props) => {
  try {
    if (!props || Object.keys(props).length === 0) {
      throw new Error('No props provided');
    }

    if (!props.tag || !validHtmlTags.includes(props.tag)) {
      throw new Error('props.tag isn\'t valid HTML tag');
    }

    if (props.id && typeof props.id !== 'string') {
      throw new Error(`props.id has invalid type: ${typeof props.className}`);
    }

    if (props.className && typeof props.className !== 'string') {
      throw new Error(`props.className has invalid type: ${typeof props.className}`);
    }

    if (props.children) {
      if (!Array.isArray(props.children)) {
        throw new Error('props.children should be an array');
      }

      props.children.forEach((child) => {
        if (typeof child !== 'string' && !(child instanceof HTMLElement)) {
          throw new Error(`${child} is not valid child element`);
        }
      });
    }

    if (props.eventHandlers !== undefined) {
      const item = props.eventHandlers;
      if (typeof item !== 'object' || Array.isArray(item) || item === null) {
        throw new Error('props.eventHandlers isn\'t valid Block events object');
      }

      for (let event in item) {
        if (!validDomEvents.includes(event)) {
          throw new Error(`Event ${event} in props.eventHandlers isn't valid DOM event`);
        }

        if (typeof item[event] !== 'function') {
          throw new Error(`Handler for ${event} is not a function`);
        }
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return { ok: true };
}

export default propsAreValid;
