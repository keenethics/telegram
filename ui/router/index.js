import { Router } from './router.js';
import Store from './../store.js';
import { Block } from './../index.js';

const appStore = new Store({
    page: 'root',
});

const handler = (route) => {
    appStore.set('router', route.path);
    if (!route.name) console.log('path was not found');
};

const router = new Router();
router.root = '/';
router.add({name: 'home', path: '/', handler});
router.add({name: 'about', path: '/about', handler});
router.add({name: 'test', path: '/test', handler});

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