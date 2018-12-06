import { Component } from 'react';
import ReactDOM from 'react-dom';

const body = document.body;

class DogTip extends Component {
    componentDidMount() {
        this.tip.className = 'dog-tip';
        body.appendChild(this.tip);
    }

    tip = document.createElement('div');

    componentWillUnmount() {
        body.removeChild(this.tip);
    }

    render() {
        this.tip.style.left = `${this.props.mousepos.xpos + 20}px`;
        this.tip.style.top = `${this.props.mousepos.ypos - 40}px`;
        return ReactDOM.createPortal(this.props.children, this.tip);
    }
}

export default DogTip;
