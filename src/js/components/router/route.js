import React, { Component } from 'react';

class Route extends Component {
    componentDidMount() {
        this.props.router.register(this.props.path);
    }

    render() {
        const { currentPath, pathParams } = this.props.router;
        const shouldRender = currentPath === this.props.path;
        const children = shouldRender
            ? React.Children.map(this.props.children, child => {
                  return React.cloneElement(child, { ...pathParams, currentPath });
              })
            : null;

        return <>{children}</>;
    }
}

export default Route;
