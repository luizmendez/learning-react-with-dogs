import React, { Component } from 'react';
import { RouterContext } from './router';
import PropTypes from 'prop-types';

class Route extends Component {
    static propTypes = {
        path: PropTypes.string
    };

    // React Context usage
    static contextType = RouterContext;

    // Register the route path to the Router
    componentDidMount() {
        this.context.registerPath(this.props.path);
    }

    render() {
        const { currentLocation, currentPath, pathParams } = this.context;
        // TODO: compare params instead of currentLocation when a location is pased as props instead of a path
        const shouldRender = currentPath === this.props.path || currentLocation === this.props.path;
        // If route should render, map the component's children injecting currentPath as prop
        const children = shouldRender
            ? React.Children.map(this.props.children, child => {
                  return React.cloneElement(child, { ...pathParams, currentpath: currentPath });
              })
            : null;

        return children;
    }
}

export default Route;
