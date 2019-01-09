import React from 'react';
import Snackbar from 'components/snackbar/snackbar/';

jest.useFakeTimers();

const noop = () => {};

const props = {
    id: 1,
    message: '',
    type: '',
    msToClose: 0,
    callback: noop
};

describe('<Snackbar />', () => {
    it('renders the Snackbar component', () => {
        const wrapper = shallow(<Snackbar id="1" message="Holis World" />);
        expect(wrapper.find('.snackbar').length).toBe(1);
        expect(wrapper.text()).toMatch('Holis World');
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a child component', () => {
        const wrapper = shallow(
            <Snackbar id={1}>
                <span>Holis</span>
            </Snackbar>
        );
        expect(wrapper.find('span').length).toBe(1);
        expect(wrapper.find('span').text()).toMatch('Holis');
        expect(wrapper).toMatchSnapshot();
    });

    it('applies the given type as a css class', () => {
        const wrapper = shallow(<Snackbar id="1" message="Holis World" type="warning" />);
        expect(wrapper.find('.alert-warning').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should not render if there is no message', () => {
        const wrapper = shallow(<Snackbar {...props} />);
        expect(wrapper.find('.snackbar').length).toBe(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('should not render if close button is clicked', () => {
        const wrapper = shallow(<Snackbar id="1" message="Holis" />);
        const closeBtn = wrapper.find('button');
        expect(wrapper.find('.snackbar').length).toBe(1);
        closeBtn.simulate('click');
        expect(wrapper.find('.snackbar').length).toBe(0);
        expect(wrapper).toMatchSnapshot();
    });

    it('should call callback after closing', () => {
        const mockCallback = jest.fn();
        const wrapper = shallow(<Snackbar id="1" message="Holis" callback={mockCallback} />);
        const closeBtn = wrapper.find('button');
        closeBtn.simulate('click');
        expect(mockCallback).toBeCalledTimes(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('should close snackbar after 3 seconds', () => {
        const wrapper = shallow(
            <Snackbar id="1" message="Holis" callback={noop} msToClose={3000} />
        );
        expect(wrapper.find('.snackbar').length).toBe(1);
        jest.advanceTimersByTime(3010);
        expect(wrapper.find('.snackbar').length).toBe(0);
    });

    it('should not show close button', () => {
        const wrapper = shallow(<Snackbar id="1" message="Holis" showClose={false} />);
        expect(wrapper.find('.btn').length).toBe(0);
    });
});
