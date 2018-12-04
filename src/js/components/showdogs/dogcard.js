import React, { Component } from 'react';
import DogPic from './dogpic';
import Link from '../router/link';

const cardStyle = {
    width: '30%',
    margin: '15px 0',
    height: '426px'
};
const capStyle = {
    textTransform: 'capitalize'
};
const linkStyle = {
    color: 'rgba(0,0,0,.8)',
    textDecoration: 'none'
};

class DogCard extends Component {
    render() {
        const dog = this.props.dog;
        return (
            <div className="card" style={cardStyle}>
                <Link href={`/dog/${dog.name}`} style={linkStyle}>
                    <DogPic imgURL={dog.imgURL} />
                    <div className="card-body">
                        <h5 className="card-title" style={capStyle}>
                            {dog.name}
                        </h5>
                    </div>
                </Link>
            </div>
        );
    }
}

export default DogCard;
