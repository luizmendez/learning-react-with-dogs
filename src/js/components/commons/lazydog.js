import React, { Component } from 'react';

class LazyDog extends Component {
    state = {
        visible: false
    };

    lazyCard = React.createRef();

    componentDidMount() {
        this.wakeLazyDog();
        if (!this.state.visible) {
            window.addEventListener('scroll', this.wakeLazyDog);
            window.addEventListener('resize', this.wakeLazyDog);
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    componentDidUpdate(prev) {
        if (prev.filterValue !== this.props.filterValue) this.wakeLazyDog();
    }

    wakeLazyDog = () => {
        if (this.isElementVisible(this.lazyCard.current)) {
            this.setState({ visible: true });
            this.removeListener();
            if (!this.props.imgURL) this.props.fetchDogImg(this.props.dogBreed);
        }
    };

    isElementVisible = el => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        return b.top >= 0 && b.top <= (window.innerHeight || document.documentElement.clientHeight);
    };

    removeListener = () => {
        window.removeEventListener('scroll', this.wakeLazyDog);
        window.removeEventListener('resize', this.wakeLazyDog);
    };

    render() {
        return this.state.visible ? (
            this.props.children
        ) : (
            <div ref={this.lazyCard} className="lazy-dog" />
        );
    }
}

export default LazyDog;
