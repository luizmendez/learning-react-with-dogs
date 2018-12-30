import { Component } from 'react';
import PropTypes from 'prop-types';

class Redirect extends Component {
    static propTypes = {
        path: PropTypes.string,
        redirect: PropTypes.string
    };

    // Register the redirect to the router component
    componentDidMount() {
        this.props.router.register(this.props.path);
    }

    // Checks if the current path is the same as the redirect route path when there's an update
    componentDidUpdate() {
        if (this.props.path === this.props.router.currentPath) this.redirect();
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
