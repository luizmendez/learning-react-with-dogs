import React, { Component } from 'react';

class MousePosition extends Component {
    state = {
        xpos: 0,
        ypos: 0
    };

    handleMouseMove = e => {
        this.setState({
            xpos: e.clientX,
            ypos: e.clientY
        });
    };

    render() {
        return (
            <>
                <div className="mousepos-div" onMouseMove={this.handleMouseMove} />
                {this.props.render(this.state)}
            </>
        );
    }
}

export default MousePosition;
