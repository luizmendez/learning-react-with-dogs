import React, { Component } from "react";
import Route from "./route";
import AllDogs from "../showdogs/all-dogs";
import Dog from "../showdogs/dog";

class Router extends Component {

    state = {
        
    }

    getCurrentPath = () => {
        const current = window.location.pathname;
        const redirect = this.redirects.find(redirect => {
            return redirect.paths.some((path) => path === current);
        });
        if (redirect) {
            const redirectPath = redirect.redirectPath;
            history.pushState({path: redirectPath}, "Dogs", redirectPath);
            return redirectPath.split('/');
        }
        return current.split('/');
    }

    render() {
        const current = this.getCurrentPath();
        return (
            <>
            </>
        );
    }
}

export default Router;
