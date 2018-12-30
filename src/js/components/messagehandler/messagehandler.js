import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../snackbar/snackbar';

class MessageHandler extends Component {
    static propTypes = {
        messagesList: PropTypes.array,
        removeMessage: PropTypes.func
    };

    // Create a callback function with the callback passed as props and
    // a function to remove the message from list
    // Params:
    //  callback (funct) = The original callback to be passed through props
    //  messageId messageId (string) = The id of the message to be removed
    messageCallback = (callback = null) => messageId => {
        this.props.removeMessage(messageId);
        if (callback) callback();
    };

    render() {
        // Maps the messageList returning an array of Snackbar components
        // populated with the corresponding info as props
        const messages = this.props.messagesList.map(message => (
            <Snackbar
                key={message.id.toString()}
                message={message.message}
                type={message.type}
                id={message.id}
                autoClose={message.autoClose || true}
                msToClose={message.msToClose}
                callback={this.messageCallback(message.callback)}
            />
        ));
        // renders the div where the messages will appear
        return <div className="message-handler">{messages}</div>;
    }
}

export default MessageHandler;
