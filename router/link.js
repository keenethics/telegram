import router from './index.js';
import { Block } from '../ui';

// чи можна передавати в лінк через пропси роутер?
export const Link = (props) => {
    const handleLinkClick = (e) => {
        if (props.to) {
            e.preventDefault();
            router.navigate(props.to);
            return;
        }
    };

    return new Block({
        ...props,
        tag: 'a',
        className: `link ${props.className || ''}`,
        children: props.children,
        events: {
            click: handleLinkClick
        }
    });
}
