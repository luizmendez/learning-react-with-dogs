import React from 'react';
import MessageHandler from 'components/messagehandler/messagehandler';

const noop = () => {};

const props = {
    messagesList: [
        {
            message: 'Error uploading dog pic.',
            type: 'error',
            id: 131313
        }
    ]
};

describe('<MessageHandler />', () => {
    it('renders the MessageHandler component', () => {
        const wrapper = shallow(<MessageHandler {...props} />);
        expect(wrapper.find('.message-handler').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a Snackbar child component', () => {
        const messagesList = [
            {
                message: 'Testing an snackbar message component',
                type: 'info',
                id: 131313
            }
        ];
        const wrapper = mount(<MessageHandler messagesList={messagesList} />);
        expect(wrapper.find('.snackbar').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });
});
