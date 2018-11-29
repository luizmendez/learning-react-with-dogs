import React, { Component } from 'react';

class Router extends Component {
    state = {
        locationPath: null,
        locationParts: null,
        currentPath: null,
        pathParams: null,
        paths: [],
        otherwise: null
    };

    componentDidMount() {
        this.historyPush();
        this.getCurrentLocation();
        window.onpopstate = history.onpushstate = loc => {
            this.getCurrentLocation(loc);
            this.getCurrentRoute();
        };
    }

    historyPush = (history = window.history) => {
        const pushState = history.pushState;
        history.pushState = (...args) => {
            if (typeof history.onpushstate == 'function') {
                history.onpushstate(args[2]);
            }
            return pushState.apply(history, args);
        };
    };

    getCurrentLocation = (loc = null) => {
        const locationPath = loc || window.location.pathname;
        const locationParts = locationPath.split('/');
        if (locationPath !== this.state.locationPath) {
            this.setState({
                locationPath,
                locationParts
            });
        }
    };

    getCurrentRoute = () => {
        const currentPath = this.getCurrentPath();
        const pathParams = this.getLocationParams(currentPath);
        if (!currentPath && this.state.otherwise) this.goOtherwise();
        if (currentPath !== this.state.currentPath) {
            this.setState({
                currentPath,
                pathParams
            });
        }
    };

    getCurrentPath = () => {
        return this.state.paths.find(p => {
            const pathParts = p.split('/');
            const locationParts = this.state.locationParts;
            if (pathParts.length === locationParts.length) {
                return pathParts.every(
                    (part, index) =>
                        (part.indexOf(':') === 0 && locationParts[index]) ||
                        part === locationParts[index]
                );
            }
        });
    };

    getLocationParams = currentPath => {
        if (!currentPath) return null;
        const locationParts = this.state.locationParts;
        return currentPath.split('/').reduce((params, part, index) => {
            if (part.indexOf(':') === 0) {
                params[part.substr(1)] = locationParts[index];
            }
            return params;
        }, {});
    };

    registerPath = path => {
        this.setState(
            state => ({
                paths: [...state.paths, path]
            }),
            () => this.getCurrentRoute()
        );
    };

    registerOtherwise = otherwise => {
        this.setState({ otherwise: otherwise });
    };

    goOtherwise = () => {
        history.pushState({ path: this.state.otherwise }, '', this.state.otherwise);
    };

    render() {
        const router = {
            currentPath: this.state.currentPath,
            pathParams: this.state.pathParams
        };
        const children = React.Children.map(this.props.children, child => {
            const register =
                child.type.name === 'Otherwise' ? this.registerOtherwise : this.registerPath;
            return React.cloneElement(child, {
                router: { ...router, register }
            });
        });
        return children;
    }
}

export default Router;
