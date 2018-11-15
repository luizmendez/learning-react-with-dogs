import React, { Component } from "react";

const defaultPlaceholder = "https://cdn-images-1.medium.com/max/800/1*dgfd5JaT0d7JT4VfhFEnzg.gif";

class DogPic extends Component {
    state = {
        imgLoaded: false,
        error: null
    };

    componentDidMount() {
        this.waitImgLoad();
    }

    placeholderURL = this.props.placeholder || defaultPlaceholder;

    waitImgLoad = () => {
        const img = new Image();
        img.onload = () => this.handleImageLoaded();
        img.onerror = () => this.handleImageError();
        img.src = this.props.imgURL;
    };

    handleImageLoaded = () => {
        this.setState({imgLoaded: true});
    }

    handleImageError = () => {
        this.setState({error: "Error loading doggo pic."});
    }

    render() {
        const {imgLoaded, error} = this.state;
        const {imgURL, alt, height = "350px"} = this.props;
        const bgImg = imgLoaded ? imgURL : defaultPlaceholder;
        const style = {
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            height
        };
        return (
            <div className="dog-pic-wrapper card-img-top" style={style} />
        );
    }
}

export default DogPic;
