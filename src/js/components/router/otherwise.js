import { Component } from 'react';
import { RouterContext } from './router';
import PropTypes from 'prop-types';

// This component register a fallback path to be directed if the current path is not registered in the router
class Otherwise extends Component {
    static propTypes = {
        path: PropTypes.string
    };

    // React Context usage
    static contextType = RouterContext;

    // Register otherwise path to the Router
    componentDidMount() {
        this.context.registerOtherwise(this.props.path);
    }

    render() {
        return null;
    }
}

export default Otherwise;
