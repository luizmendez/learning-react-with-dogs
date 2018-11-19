import React, { Component } from "react";

const defaultPlaceholder = require("../../../assets/dogloader.gif");

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

    placeholderURL = this.props.placeholder || defaultPlaceholder;

    waitImgLoad = () => {
        if (!this.props.imgURL) return;
        const img = new Image();
        img.onload = () => this.handleImageLoaded();
        img.onerror = () => this.handleImageError();
        img.src = this.props.imgURL;
    };

    handleImageLoaded = () => {
        this.setState({imgLoaded: true});
    }

    handleImageError = () => {
        this.setState({error: `Error loading doggo pic: ${this.props.imgURL}`});
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
