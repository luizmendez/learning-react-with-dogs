import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Snackbar extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        message: PropTypes.string,
        callback: PropTypes.func,
        msToClose: PropTypes.number,
        autoClose: PropTypes.bool,
        type: PropTypes.string,
        hideCloseButton: PropTypes.bool
    };

    static defaultProps = {
        type: 'info',
        msToClose: 3000,
        autoClose: true,
        hideCloseButton: false
    };

    state = {
        shouldHide: false, // Component should hide
        timestamp: null, // timestamp when was the component created
        timeout: null // timeout to hide the component
    };

    componentDidMount() {
        // Gets current timestamp and the autoclose flag if applies
        const { msToClose, autoClose } = this.props;
        const timestamp = Date.now();
        const timeout = autoClose ? setTimeout(this.closeSnackbar, msToClose) : null;
        // Sets the timestamp and timeout in state
        this.setState({
            timestamp,
            timeout
        });
    }

    // Sets the hide state in state and calls callback function
    closeSnackbar = () => {
        const callback = this.props.callback ? () => this.props.callback(this.props) : null;
        this.setState(
            {
                shouldHide: true
            },
            callback
        );
    };

    render() {
        const { message, children, type, hideCloseButton } = this.props;
        // Gets the content of the snackbar, either children or message passed through props
        const content = children || message;
        const shouldHide = this.state.shouldHide || !content;
        // Sets the class of the component depending on the prop.type value, defaults to 'info'
        const snackbarClass = `snackbar alert alert-dismissible alert-${type}`;
        // If component sould hide don't return anything
        if (shouldHide) {
            return null;
        }
        return (
            <div className={snackbarClass}>
                {content}
                {hideCloseButton || (
                    <button
                        type="button"
                        className="close close-snackbar"
                        onClick={this.closeSnackbar}>
                        &times;
                    </button>
                )}
            </div>
        );
    }
}

export default Snackbar;
