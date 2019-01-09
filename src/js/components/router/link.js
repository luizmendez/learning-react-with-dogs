import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RouterContext } from './router';

class Link extends Component {
    static propTypes = {
        href: PropTypes.string.isRequired,
        className: PropTypes.string,
        router: PropTypes.object,
        checkPath: PropTypes.bool
    };
    // Ready for react context
    static contextType = RouterContext;

    static defaultProps = {
        checkPath: true
    };

    // Checks if current path is the same path that link directs to
    // Returns: bool
    isThisCurrentPath = () => {
        // Get current location path from context
        const { currentPath } = this.context;
        // Split the route and location paths in parts
        const pathParts = currentPath.split('/');
        const hrefParts = this.props.href.split('/');
        // If the number of parts is not the same is not a match
        if (pathParts.length !== hrefParts.length) return false;
        // Checks if every current path part is the same as the link parts and returns true if there's a match
        return pathParts.every(
            (part, index) =>
                (part.indexOf(':') === 0 && hrefParts[index]) || part === hrefParts[index]
        );
    };

    // On click checks if the link is external and the target of the link to open it
    handleClick = e => {
        e.preventDefault();
        const href = this.props.href;
        // Checks if the link is external or a complete url
        const urlExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
        const urlReg = new RegExp(urlExp);
        const isUrl = urlReg.test(href);
        // If the link is external or is a complete url hange the window.location or open a new window with the link
        // depending on the target prop value
        if (isUrl) {
            this.props.target === '_blank' ? window.open(href) : (window.location.href = href);
            return;
        }
        // If link seems to be internal do a history.pushState to update the app location
        history.pushState(
            {
                uri: href
            },
            '',
            href
        );
    };

    render() {
        // Checks if link location is the same as current page location
        const isCurrentPath =
            this.context.currentPath && this.props.checkPath && this.isThisCurrentPath();
        // Renders an <a> element with the appropiate href, target and clickEvent
        return (
            <a
                href={this.props.href}
                onClick={this.handleClick}
                className={`${this.props.className ? this.props.className : ''}${
                    isCurrentPath ? ' current-link' : ''
                }`}>
                {this.props.children}
            </a>
        );
    }
}

export default Link;
