import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';
import Input from '../index';

const defaultProps = { secretWord: 'party' };

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (secretWord='party') => {
  return shallow(<Input secretWord={secretWord} />)
};

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' });
});

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

describe('state controlled input field', () => {
  test('state updates with value of input box upon change', () => {
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: {value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  })
});
