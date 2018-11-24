import React, { Component } from "react";

class Route extends Component {

    comparePath = () => {
        const {current, path} = this.props;
        const pathArray = path.split("/");
        const isPath = {
            shouldRender: false
        }

        if (current.length !== pathArray.length) return isPath;
        isPath.childProps = path.includes(":") ? {} : null;
        for (let i = 0; i < pathArray.length; i++ ) {
            if (pathArray[i].includes(":")) {
                isPath.shouldRender = true;
                isPath.childProps = { [pathArray[i].substr(1)]: current[i] };
                break;
            }
            if (pathArray[i] !== current[i]) {
                break;
            }
        }

        return isPath;
    }

    render() {
        const isPath = this.comparePath();
        const children = isPath.shouldRender ? React.Children.map(this.props.children, child => {
            return React.cloneElement(child, isPath.childProps);
        }) : null;

        return (
            <>
                {children}
            </>
        );
    }
}

export default Route;
