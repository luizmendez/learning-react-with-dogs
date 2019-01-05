import { Component } from 'react';
import { RouterContext } from './router';
import PropTypes from 'prop-types';

class Redirect extends Component {
    static propTypes = {
        path: PropTypes.string,
        redirect: PropTypes.string
    };

    // React Context usage
    static contextType = RouterContext;

    // Register the redirect path on the Router
    componentDidMount() {
        this.context.registerPath(this.props.path);
    }

    // Checks if the current path is the same as the redirect route path when there's an update
    componentDidUpdate() {
        // Get current location and parts of it from the context
        const { currentLocation, currentPath } = this.context;
        if (currentPath === this.props.path || currentLocation === this.props.path) this.redirect();
    }

    // Uses history.pushState to update location to the redirect path
    redirect = () => {
        history.pushState({ path: this.props.redirect }, '', this.props.redirect);
    };

    render() {
        return null;
    }
}

export default Redirect;
