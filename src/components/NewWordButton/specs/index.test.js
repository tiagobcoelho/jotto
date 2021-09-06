import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../../test/testUtils';
import NewWordButton from '../index';

const defaultProps = { display: false };

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @returns {ShallowWrapper}
 */
 const setup = (props) => {
  const setupProps = { ...defaultProps, ...props };
  return mount(<NewWordButton {...setupProps}/>);
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = setup({ display: true, resetAction: () => {} });
    });

    test('NewWordButton shows non-empty text', () => {
      const newWord = findByTestAttr(wrapper, 'component-new-word-button');
      expect(newWord.length).not.toBe(0);
    });
  });
  
  describe('success is false', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = setup();
    });

    test('NewWordButton does not have text', () => {
      const newWord = findByTestAttr(wrapper, 'component-new-word-button');
      expect(newWord.length).toBe(0);
    });
  });

  test('does not throw warning with expected props', () => {
    const expectedProps = { display: false, resetAction: () => {} };
    checkProps(NewWordButton, expectedProps);
  });
})