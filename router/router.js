import { Route } from './route';

export class Router {

    constructor() {
        this.routes = [];
        this.root = '/';
    }

    get root() {
        return this._root;
    }
    set root(val) {
        this._root = val;
    }

    get routes() {
        return this._routes;
    }
    set routes(val) {
        this._routes = val;
    }

    add(route) {
        this.routes.push(new Route(route.name, route.path, route.handler));
    }

    navigate(route) {
        this.match(route || '/');
    }

    match(url) {
        for (let i = 0; i < this.routes.length; i++) {
            const route = this.routes[i];
            if (route.path === url) {
                route.handler(route);
                this.location(url);
                i = this.routes.length;
            } else if (i === this.routes.length - 1) {
                route.handler({name: null, path: url});
                this.location(url);
            }
        }
    }

    location(route) {
        window.history.pushState(null, null, route)
    }
}
