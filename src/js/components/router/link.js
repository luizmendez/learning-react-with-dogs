import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RouterContext } from './router';

class Link extends Component {
    static contextType = RouterContext;
    static propTypes = {
        href: PropTypes.string.isRequired,
        className: PropTypes.string,
        router: PropTypes.object,
        checkPath: PropTypes.bool
    };

    static defaultProps = {
        checkPath: true
    };

    isThisCurrentPath = () => {
        const { currentPath } = this.context;
        const pathParts = currentPath.split('/');
        const hrefParts = this.props.href.split('/');
        if (pathParts.length !== hrefParts.length) return false;
        return pathParts.every(
            (part, index) =>
                (part.indexOf(':') === 0 && hrefParts[index]) || part === hrefParts[index]
        );
    };

    handleClick = e => {
        e.preventDefault();
        const href = this.props.href;
        const urlExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
        const urlReg = new RegExp(urlExp);
        const isUrl = urlReg.test(href);
        if (isUrl) {
            this.props.target === '_blank' ? window.open(href) : (window.location.href = href);
            return;
        }
        history.pushState(
            {
                uri: href
            },
            '',
            href
        );
    };

    render() {
        const isCurrentPath =
            this.context.currentPath && this.props.checkPath && this.isThisCurrentPath();
        return (
            <a
                href=""
                onClick={this.handleClick}
                className={`${this.props.className}${isCurrentPath ? ' active-style' : ''}`}
                style={{
                    ...this.props.style,
                    textDecoration: isCurrentPath ? 'underline' : 'none',
                    fontWeight: isCurrentPath ? 'bold' : 'regular'
                }}>
                {this.props.children}
            </a>
        );
    }
}

export default Link;
