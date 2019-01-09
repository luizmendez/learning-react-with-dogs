import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MousePosition extends Component {
    static propTypes = {
        render: PropTypes.func
    };

    state = {
        xpos: 0, // Mouse x Position
        ypos: 0 // Mouse y Position
    };

    // On event trigger sets the mouse x and y position in state
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
