import React, { Component } from "react";

class Route extends Component {

    componentDidMount() {
        this.props.router.register(this.props.router.path);
    }

    render() {
        const {path, currentPath, pathParams} = this.props.router;
        const shouldRender = currentPath === path;
        const children = shouldRender ? React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {...child.props, ...pathParams, currentPath});
        }) : null;

        return (
            <>
                {children}
            </>
        );
    }
}

export default Route;
