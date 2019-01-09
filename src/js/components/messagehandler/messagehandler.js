import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '../snackbar/snackbar';

const MessageHandler = ({ messagesList, callback }) => {
    // Maps the messageList returning an array of Snackbar components
    // populated with the corresponding info as props
    const messages = messagesList.map(msg => {
        const { id, message, type, autoClose, msToClose } = msg;
        return (
            <Snackbar
                key={id}
                message={message}
                type={type}
                id={id}
                autoClose={autoClose || true}
                msToClose={msToClose}
                callback={callback}
            />
        );
    });
    // renders the div where the messages will appear
    return <div className="message-handler">{messages}</div>;
};

MessageHandler.propTypes = {
    messagesList: PropTypes.array
};

export default MessageHandler;
