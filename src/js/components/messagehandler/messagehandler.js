import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../snackbar/snackbar';

class MessageHandler extends Component {
    static propTypes = {
        messagesList: PropTypes.array
    };

    render() {
        // Maps the messageList returning an array of Snackbar components
        // populated with the corresponding info as props
        const messages = this.props.messagesList.map(msg => {
            const { id, message, type, autoClose, msToClose, callback } = msg;
            return (
                <Snackbar
                    key={id}
                    message={message}
                    type={type}
                    id={id}
                    autoClose={autoClose || true}
                    msToClose={msToClose}
                    callback={callback && callback(id)}
                />
            );
        });
        // renders the div where the messages will appear
        return <div className="message-handler">{messages}</div>;
    }
}

export default MessageHandler;
