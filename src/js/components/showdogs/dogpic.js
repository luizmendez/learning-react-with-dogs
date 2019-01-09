import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultPlaceholder = require('../../../assets/dogloader.gif');

class DogPic extends Component {
    static propTypes = {
        dogImgUrl: PropTypes.string
    };

    state = {
        imgLoaded: false, // image was loaded
        error: null // image error
    };

    componentDidMount() {
        // if the component has an imgURL prop wait for the image to load
        if (this.props.imgURL) this.waitImgLoad();
    }

    componentDidUpdate() {
        // if the component have an imgURL prop wait for the image to load
        if (!this.state.imgLoaded) this.waitImgLoad();
    }

    componentWillUnmount() {
        // Remove the image listeners
        this.img.removeEventListener('load', this.handleImageLoaded);
        this.img.removeEventListener('error', this.handleImageError);
    }

    // Create a new image to preload the image URL
    img = new Image();

    // If a placeholder was passed through props use it, if don't use the default placeholder
    placeholderURL = this.props.placeholder || defaultPlaceholder;

    // Waits for the image to load on the created img element
    waitImgLoad = () => {
        // If there's not an imgURL then return
        if (!this.props.imgURL) return;
        // Add image listeners on load and error
        this.img.addEventListener('load', this.handleImageLoaded);
        this.img.addEventListener('error', this.handleImageError);
        // Load the image URL into the img element
        this.img.src = this.props.imgURL;
    };

    // If the event is trigger changge the loaded state of the image
    handleImageLoaded = () => {
        this.setState({ imgLoaded: true });
    };

    // If the event is trigger changge the error state of the image
    handleImageError = () => {
        this.setState({ error: `Error loading doggo pic: ${this.props.imgURL}` });
    };

    render() {
        const { imgLoaded } = this.state;
        const { imgURL, height = '350px' } = this.props;
        // If image is not loaded yet show a placeholder
        const bgImg = imgLoaded ? imgURL : defaultPlaceholder;
        // Styles with variables
        const style = {
            backgroundImage: `url(${bgImg})`,
            height
        };
        // Renders the dog pic with the appropiate image or placeholder
        return <div className="dog-pic-wrapper card-img-top" style={style} />;
    }
}

export default DogPic;
