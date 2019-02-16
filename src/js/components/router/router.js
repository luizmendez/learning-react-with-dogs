import React, { Component } from 'react';

const RouterContext = React.createContext();

// Router manages the paths and location of the app.
// <Route />, <Redirect /> and <Otherwise /> register their paths into the Router.
// Gets the current location pathname and splits it into parts to be matched against the registered paths.
// When a match is made, sets the current location path to context to be used by each <Route /> and <Redirect /> components
// This components try to match the current path with their own paths to decide to render their childs (route) or change the location (redirect)
// If no match is found changes the location to the otherwise fallback path
// An event listener for history.pushState which gets the new current location path

class Router extends Component {
    state = {
        locationPath: null, // current window path
        locationParts: null, // parts of the current window path
        currentPath: null, // current router path
        pathParams: null, // parts of the current router path
        paths: [], // registered route and redirects paths
        otherwise: null // registered path fallback
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
    // @param {string} loc - current location.
    getCurrentLocation = (loc = null) => {
        // If loc is falsey use window.location,
        // if loc is triggered by browser back button use attr state.path
        const locationPath = loc ? (loc.state ? loc.state.path : loc) : window.location.pathname;
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

    // Tries to get the current path and params of route component and sets it on state
    // If no current path is found go to otherwise path if is already registered
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
    // @parm {string} path - path to be registered
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
    // @param {string} otherwise - fallback path to be registered
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
        // Renders the component children and passes the router object as context
        return (
            <RouterContext.Provider value={router}>{this.props.children}</RouterContext.Provider>
        );
    }
}

export default Router;
export { RouterContext };
