import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LazyDog extends Component {
    static propTypes = {
        dogBreed: PropTypes.string,
        dogList: PropTypes.array,
        filterValue: PropTypes.string,
        fetchDogImg: PropTypes.func,
        imgURL: PropTypes.string
    };

    state = {
        visible: false // Component should be showing
    };

    // Reference to the card element
    lazyCard = React.createRef();

    componentDidMount() {
        // Set the listeners and run one time to know if the component is on the viewport sight
        this.wakeLazyDog();
        if (!this.state.visible) {
            // On window scroll and resize check if the component is in the viewport sight
            window.addEventListener('scroll', this.wakeLazyDog);
            window.addEventListener('resize', this.wakeLazyDog);
        }
    }

    componentWillUnmount() {
        // Remove scrolling and sizing listeners
        this.removeListener();
    }

    componentDidUpdate(prev) {
        // When the filterValue changes and dogCards are reorder, check if this component is in the viewport sight
        if (prev.filterValue !== this.props.filterValue) this.wakeLazyDog();
    }

    // Checks if the top of the component is in viewport sight nad if it is change the visible state
    wakeLazyDog = () => {
        // Check if component is visible
        if (this.isElementVisible(this.lazyCard.current)) {
            this.removeListener();
            this.setState({ visible: true }, () => {
                // Callback after setting the visibls state of the component,
                // if the dog don't have an image URL then fetch it
                if (!this.props.imgURL)
                    this.props.fetchDogImg(this.props.dogBreed, this.props.dogList);
            });
        }
    };

    // Checks if the top of the element is in viewport sight
    // Params: el (element) = element to check visibility
    // Returns: bool of the element visibility
    // TODO: check that any part of the component is on sight
    isElementVisible = el => {
        if (!el) return; // if there's no element return
        const b = el.getBoundingClientRect();
        return b.top >= 0 && b.top <= (window.innerHeight || document.documentElement.clientHeight);
    };

    // Remove scrolling and sizing listeners
    removeListener = () => {
        window.removeEventListener('scroll', this.wakeLazyDog);
        window.removeEventListener('resize', this.wakeLazyDog);
    };

    render() {
        // If visible state is true render the children of the coponent,
        // if not render a lazyCard div
        return this.state.visible ? (
            this.props.children
        ) : (
            <div ref={this.lazyCard} className="lazy-dog" />
        );
    }
}

export default LazyDog;
