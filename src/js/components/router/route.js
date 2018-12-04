import React, { Component } from 'react';
import { RouterContext } from './router';

class Route extends Component {
    static contextType = RouterContext;
    componentDidMount() {
        this.context.registerPath(this.props.path);
    }

    render() {
        const { currentLocation, currentPath, pathParams } = this.context;
        // TODO: compare params instead of currentLocation when a location is pased as props instead of a path
        const shouldRender = currentPath === this.props.path || currentLocation === this.props.path;
        const children = shouldRender
            ? React.Children.map(this.props.children, child => {
                  return React.cloneElement(child, { ...pathParams, currentpath: currentPath });
              })
            : null;

        return children;
    }
}

export default Route;
