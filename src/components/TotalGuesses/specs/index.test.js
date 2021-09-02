import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';
import TotalGuesses from '../index';

const defaultProps = {
  totalGuesses: 1,
};

/**
 * Factory function to create a ShallowWrapper for the TotalGuesses component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
 const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<TotalGuesses {...setupProps} />)
}

test('does not throw warning with expected props', () => {
  checkProps(TotalGuesses, defaultProps);
})

test('renders TotalGuesses component without errors', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-total-guesses');
  expect(component.length).toBe(1);
});

test('renders correct number of guesses', () => {
  const totalGuesses = 3
  const wrapper = setup({ totalGuesses });
  const totalGuessesNode = findByTestAttr(wrapper, 'total-guesses');
  expect(totalGuessesNode.text()).toBe(`${totalGuesses}`);
});

