import React, { Component } from 'react';
import DogPic from './dogpic';
import DogTip from './dogtip';
import MousePosition from '../commons/mouseposition';
import Link from '../router/link';
import PropTypes from 'prop-types';

class DogCard extends Component {
    static propTypes = {
        dog: PropTypes.array
    };

    state = {
        showTip: false // Show the dog's breed name as a tooltip
    };

    // When the event is triggered show tooltip
    handleMouseEnter = () => {
        this.setState({
            showTip: true
        });
    };

    // When the event is triggered hide tooltip
    handleMouseLeave = () => {
        this.setState({
            showTip: false
        });
    };

    render() {
        const dog = this.props.dog;
        // Renders the dog card of each dog
        // If showTip state is true renders a tooltip through a
        // React Portal that follows the mouse with the dog's breed name
        return (
            <div
                className="dog-card card"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                <Link href={`/dog/${dog.name}`}>
                    <DogPic imgURL={dog.imgURL} />
                    {this.state.showTip && (
                        <MousePosition
                            render={mousePos => <DogTip mousepos={mousePos}>{dog.name}</DogTip>}
                        />
                    )}
                </Link>
            </div>
        );
    }
}

export default DogCard;
