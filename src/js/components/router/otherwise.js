import { Component } from 'react';
import PropTypes from 'prop-types';

class Otherwise extends Component {
    static propTypes = {
        path: PropTypes.string
    };

    // Register otherwise route to router component
    componentDidMount() {
        this.props.router.register(this.props.path);
    }

    render() {
        return null;
    }
}

export default Otherwise;
