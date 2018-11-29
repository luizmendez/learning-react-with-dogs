import { Component } from 'react';

class Redirect extends Component {
    componentDidMount() {
        this.props.router.register(this.props.path);
    }

    componentDidUpdate() {
        if (this.props.path === this.props.router.currentPath) this.redirect();
    }

    redirect = () => {
        history.pushState({ path: this.props.redirect }, '', this.props.redirect);
    };

    render() {
        return null;
    }
}

export default Redirect;
