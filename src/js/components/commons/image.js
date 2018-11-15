import React, { Component } from "react";

const defaultPlaceholder = "https://cdn-images-1.medium.com/max/800/1*dgfd5JaT0d7JT4VfhFEnzg.gif";

class Image extends Component {
    state = {
        imgLoaded: false,
        error: null
    };

    placeholderURL = this.props.placeholder || defaultPlaceholder;

    handleImageLoaded = () => {
        this.setState({imgLoaded: true});
    }

    handleImageError = () => {
        this.setState({error: "Error loading doggo pic."});
    }

    render() {
        const {imgLoaded, error} = this.state;
        const {imgURL, alt} = this.props;
        return (
            <img 
                className="card-img-top" 
                src={imgLoaded ? imgURL : this.placeholderURL} 
                alt={error || alt}
                onLoad={this.handleImageLoaded}
                onError={this.handleImageError}
            />
        );
    }
}

export default Image;
