import React, { Component } from "react";

const linkStyle = {
    color: 'rgba(0,0,0,.8)',
    textDecoration: "none"
}

class Link extends Component {

    handleClick = (e) => {
        e.preventDefault();
        const {state, title, path} = this.props.link;
        history.pushState(state, title, path);
        this.props.setPath();
    }

    render() {
        return (
            <a href="" onClick={this.handleClick} style={linkStyle}>
                {this.props.children}
            </a>
        );
    }
}

export default Link;
