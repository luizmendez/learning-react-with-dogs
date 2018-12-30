import React from 'react';
import SubmitDog from 'components/submitdog/submitdog';

const formElements = [
    {
        name: 'dogName',
        value: 'Terry',
        type: 'input',
        getAttribute: () => 'input'
    },
    {
        name: 'dogBreed',
        value: 'airedale',
        type: 'select',
        getAttribute: () => 'select'
    },
    {
        name: 'dogPic',
        type: 'file',
        getAttribute: () => 'file',
        files: [
            {
                name: test.jpg
            }
        ]
    }
];

describe('<SubmitDog />', () => {
    it('renders the SubmitDog component', () => {
        const wrapper = shallow(<SubmitDog />);
        expect(wrapper.find('.submit-dog-content').length).toBe(1);
        expect(wrapper).toMatchSnapshot();
    });

    it('submits the form', () => {
        const sendDogForm = jest.fn();
        const wrapper = shallow(<SubmitDog sendDogForm={sendDogForm} />);
        const form = wrapper.find('.form-dog').first();
        const preventDefault = jest.fn();
        const e = {
            preventDefault,
            target: { elements: formElements }
        };
        form.simulate('submit', e);
        expect(e.preventDefault).toBeCalledTimes(1);
        expect(sendDogForm).toBeCalledTimes(1);
        expect(wrapper).toMatchSnapshot();
    });
});
