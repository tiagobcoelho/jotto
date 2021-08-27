import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';
import Input from '../index';

// mock entire module for destructuring useState on import ////
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

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
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: {value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  })
  
  test('field is cleared upon submit', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  })
});
