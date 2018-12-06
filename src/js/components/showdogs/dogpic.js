import React, { Component } from 'react';

const defaultPlaceholder = require('../../../assets/dogloader.gif');

class DogPic extends Component {
    state = {
        imgLoaded: false,
        error: null
    };

    componentDidMount() {
        if (this.props.imgURL) this.waitImgLoad();
    }

    componentDidUpdate() {
        if (!this.state.imgLoaded) this.waitImgLoad();
    }

    componentWillUnmount() {
        this.img.removeEventListener('load', this.handleImageLoaded);
        this.img.removeEventListener('error', this.handleImageError);
    }

    img = new Image();

    placeholderURL = this.props.placeholder || defaultPlaceholder;

    waitImgLoad = () => {
        if (!this.props.imgURL) return;
        this.img.addEventListener('load', this.handleImageLoaded);
        this.img.addEventListener('error', this.handleImageError);
        this.img.src = this.props.imgURL;
    };

    handleImageLoaded = () => {
        this.setState({ imgLoaded: true });
    };

    handleImageError = () => {
        this.setState({ error: `Error loading doggo pic: ${this.props.imgURL}` });
    };

    render() {
        const { imgLoaded } = this.state;
        const { imgURL, height = '350px' } = this.props;
        const bgImg = imgLoaded ? imgURL : defaultPlaceholder;
        const style = {
            backgroundImage: `url(${bgImg})`,
            height
        };
        return <div className="dog-pic-wrapper card-img-top" style={style} />;
    }
}

export default DogPic;
