import React, { Component } from 'react';

const RouterContext = React.createContext();

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
        // Gets current window location URI and sets it in the state
        this.getCurrentLocation();
        // Creates listener for history.pushState event
        this.historyPush();
        window.onpopstate = history.onpushstate = loc => {
            // Gets and sets new window location URI and paths
            this.getCurrentLocation(loc);
        };
    }

    // Creates listener of history.pushState overwriting the function
    historyPush = (history = window.history) => {
        const pushState = history.pushState;
        history.pushState = (...args) => {
            if (typeof history.onpushstate == 'function') {
                history.onpushstate(args[2]);
            }
            return pushState.apply(history, args);
        };
    };

    // Get the current window location and parts of it in an array.
    // Sets the current location and parts in the state with a callback to getCurrentRoute
    // Params: loc - string of current location; defaults to null.
    getCurrentLocation = (loc = null) => {
        const locationPath = loc || window.location.pathname;
        const locationParts = locationPath.split('/');
        if (locationPath !== this.state.locationPath) {
            this.setState(
                {
                    locationPath,
                    locationParts
                },
                () => this.getCurrentRoute()
            );
        }
    };

    // Tries to get the current path and params of it and sets it on state
    // If no current path is found and there's an otherwise registered go to it
    getCurrentRoute = () => {
        const currentPath = this.getCurrentPath();
        const pathParams = this.getLocationParams(currentPath);
        if (!currentPath && this.state.otherwise) {
            this.goOtherwise();
            return;
        }
        this.setState({
            currentPath,
            pathParams
        });
    };

    // Tries to match the current location URI with the list of registered paths
    // Returns string of current path if found
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

    // If a currentPath is set tries to get the current URI params
    // Returns object of found params
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

    // Set in state.paths string of routes and redirects
    // Params: path - string - path to be registered
    // Callback: getCurrentRoute() after setting path on state
    registerPath = path => {
        this.setState(
            state => ({
                paths: [...state.paths, path]
            }),
            () => this.getCurrentRoute()
        );
    };

    // Sets in state.otherwise string of URI fallback
    // Params: otherwise - string - path of otherwise to be registered
    registerOtherwise = otherwise => {
        this.setState({ otherwise: otherwise });
    };

    // Calls history.pushState of uri registered as otherwise fallback
    goOtherwise = () => {
        history.pushState({ path: this.state.otherwise }, '', this.state.otherwise);
    };

    render() {
        // Creates object with path and params of current uri
        const router = {
            currentLocation: this.state.locationPath,
            locationParts: this.state.locationParts,
            currentPath: this.state.currentPath,
            pathParams: this.state.pathParams,
            registerPath: this.registerPath,
            registerOtherwise: this.registerOtherwise
        };
        // Creates object of Routes, Redirects and Otherwise injecting proper
        // register function and router object created above as props
        const children = React.Children.map(this.props.children, child => {
            const register =
                child.type.name === 'Otherwise' ? this.registerOtherwise : this.registerPath;
            return React.cloneElement(child, {
                router: { ...router, register }
            });
        });
        return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
    }
}

export default Router;
export { RouterContext };
