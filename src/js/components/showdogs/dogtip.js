import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class DogTip extends Component {
    static propTypes = {
        mousepos: PropTypes.object
    };

    // Sets a classname and appends the tip element to the body
    componentDidMount() {
        this.tip.className = 'dog-tip';
        document.body.appendChild(this.tip);
    }

    // Create element to use as tooltip
    tip = document.createElement('div');

    // Remove the element from the body
    componentWillUnmount() {
        document.body.removeChild(this.tip);
    }

    render() {
        // Styles element position,
        // uses mousePosition component as a render prop to pass location props
        this.tip.style.left = `${this.props.mousepos.xpos + 20}px`;
        this.tip.style.top = `${this.props.mousepos.ypos - 40}px`;
        // Creates a React Portal to show the tooltip outside of the App components
        return ReactDOM.createPortal(this.props.children, this.tip);
    }
}

export default DogTip;
