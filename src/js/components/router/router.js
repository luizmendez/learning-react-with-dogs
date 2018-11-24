import React, { Component } from "react";
import Route from "./route";
import AllDogs from "../showdogs/all-dogs";
import Dog from "../showdogs/dog";

class Router extends Component {

    state = {
        locationPath: null,
        locationParts: null,
        currentPath: null,
        pathParams: null,
        paths: [],
        redirects: [],
        otherwise: null
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    getCurrentLocation = () => {
        const locationPath = window.location.pathname;
        const locationParts = locationPath.split('/');
        this.setState({
            locationPath,
            locationParts
        });
    }

    getCurrentRoute = () => {
        const currentPath = this.getCurrentPath();
        const pathParams = this.getLocationParams(currentPath);
        this.setState({
            currentPath,
            pathParams
        });
    }

    getCurrentPath = () => {
        return this.state.paths.find( p => {
            const pathParts = p.split('/');
            const locationParts = this.state.locationParts;
            if (pathParts.length === locationParts.length) {
                return pathParts.every((part, index) =>
                    part.indexOf(':') === 0 && locationParts[index] ||
                    part === locationParts[index]
                );
            }
        });
    }

    getLocationParams = (currentPath) => {
        if (!currentPath) return null;
        const locationParts = this.state.locationParts;
        return currentPath.split('/').reduce((params, part, index) => {
            if (part.indexOf(':') === 0) {
                params[part.substr(1)] = locationParts[index];
            }
            return params;
        }, {})
    }

    registerPath = (path) => {
        this.setState((state) => ({
            paths: [...state.paths, path]
        }), () => this.getCurrentRoute());
    }

    registerRedirect = (redirect) => {
        this.setState((state) => ({
            redirect: [...state.redirects, redirect]
        }), () => this.getCurrentRoute());
    }

    registerOtherwise = (otherwise) => {
        this.setState({otherwise: otherwise}, () => this.getCurrentRoute());
    }

    render() {
        const router = {
            currentPath: this.state.currentPath,
            pathParams: this.state.pathParams
        }
        const children = React.Children.map(this.props.children, child => {
            const register = child.type.name === 'Route' ? this.registerPath :
                (child.type.name === 'Redirect' ? this.registerRedirect : this.registerOtherwise);
            const getCurrentRoute = this.getCurrentRoute;
            return React.cloneElement(child, {router: { ...child.props, ...router, register, getCurrentRoute} });
        });
        return children;
    }
}

export default Router;
