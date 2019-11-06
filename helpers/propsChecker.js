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

    if (props.children && props.children.length) {
      // TODO iterate over children and check that it is a function, instance of Block or BaseComponent
    }

    if (props.eventHandlers) {
      for (let event in props.eventHandlers) {
        if (!validDomEvents.includes(event)) {
          throw new Error(`Event ${event} in props.eventHandlers isn't valid DOM event`);
        }

        if (typeof props.eventHandlers[event] !== 'function') {
          throw new Error(`Handler for ${event} is not a function`);
        }
      }
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error,
    };
  }

  return { ok: true };
}

export default propsAreValid;
