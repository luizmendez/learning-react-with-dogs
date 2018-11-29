import { Component } from 'react';

class Otherwise extends Component {
    componentDidMount() {
        this.props.router.register(this.props.path);
    }

    render() {
        return null;
    }
}

export default Otherwise;
