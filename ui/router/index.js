import appStore from '../../stores/app';

import { Router } from './router.js';
import { Block } from './../index.js';

const handler = (route) => {
    const prevPage = appStore.get('page');
    if (prevPage !== route.path) {
        appStore.set('page', route.path);
        if (!route.name) console.log('path was not found');
    }
};

const router = new Router();
router.root = '/';
router.add({name: 'home', path: '/', handler});
router.add({name: 'chat', path: '/chat', handler});

// initial navigation
router.navigate(window.location.pathname);
window.onpopstate = function (e) {
    router.navigate(window.location.pathname);
}

const LinkComponent = (props) => {
    const handleLinkClick = (e) => {
        if (props.href) {
            window.location.href = props.href;
            return;
        } else if (props.to) {
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

export const Link = LinkComponent;
