import React, { Component } from 'react';
import DogPic from './dogpic';
import DogTip from './dogtip';
import MousePosition from '../commons/mouseposition';
import Link from '../router/link';

class DogCard extends Component {
    state = {
        showTip: false
    };

    handleMouseEnter = () => {
        this.setState({
            showTip: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            showTip: false
        });
    };

    render() {
        const dog = this.props.dog;
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
