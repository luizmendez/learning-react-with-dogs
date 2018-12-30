import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Snackbar extends Component {
    static propTypes = {
        id: PropTypes.number,
        message: PropTypes.string,
        callback: PropTypes.func,
        removeMessage: PropTypes.func,
        msToClose: PropTypes.number,
        autoClose: PropTypes.bool,
        type: PropTypes.string,
        showButton: PropTypes.bool
    };

    state = {
        shouldHide: false, // Component should hide
        timestamp: null, // timestamp when was the component created
        timeout: null // timeout to hide the component
    };

    // 3secs default to close
    defaultMsToClose = 3000;

    componentDidMount() {
        // Gets current timestamp and the autoclose flag if applies
        const timestamp = Date.now();
        const msToClose = this.props.msToClose ? this.props.msToClose : this.defaultMsToClose;
        const shouldAutoClose = this.props.autoClose ? this.props.autoClose : true;
        const timeout = shouldAutoClose ? setTimeout(this.closeSnackbar, msToClose) : null;
        // Sets the timestamp and timeout in state
        this.setState({
            timestamp,
            timeout
        });
    }

    // Sets the hide state in state and calls callback function
    closeSnackbar = () => {
        this.setState(
            {
                shouldHide: true
            },
            () => {
                // Calls callback with component id as parameters
                this.props.callback(this.props.id);
            }
        );
    };

    render() {
        const { message, children, type, showCloseButton } = this.props;
        // Gets the content of the snackbar, either children or message passed through props
        const content = children || message;
        const shouldHide = this.state.shouldHide || !content;
        const showClose = showCloseButton ? showCloseButton : true;
        // Sets the class of the component depending on the prop.type value, defaults to 'info'
        const snackbarClass = `snackbar alert alert-dismissible alert-${type ? `${type}` : 'info'}`;
        // If component sould hide don't return anything
        if (shouldHide) {
            return null;
        }
        return (
            <div className={snackbarClass}>
                {content}
                {showClose && (
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
