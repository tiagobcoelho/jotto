import React from 'react';
import { mount } from 'enzyme';
import App from './App';

import { findByTestAttr } from '../test/testUtils';

/**
 * Create wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 * @function
 * 
 * @param {object} state -Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */
const setup = (state = {}) => {
  // TODO: apply state
  const wrapper = mount(<App />);

  //add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  // simulate a click on the submit button
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

describe.skip('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    });
  });

  test('creates a guessed words table with 1 row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(1);
  });
});

describe.skip('some words guessed', () => {
  let wrapper;
  const guessedWordsList = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'stock', letterMatchCount: 1 },
    { guessedWord: 'white', letterMatchCount: 1 },
  ]
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: guessedWordsList
    });
  });

  test('adds another row to guessed words table', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(guessedWordsList.length + 1);
  });
});

describe.skip('guess secret word', () => {
  let wrapper;
  const guessedWordsList = [
    { guessedWord: 'train', letterMatchCount: 3 },
    { guessedWord: 'stock', letterMatchCount: 1 },
    { guessedWord: 'white', letterMatchCount: 1 },
  ]
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: guessedWordsList
    });
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'party' } }
    inputBox.simulate('change', mockEvent);
  
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('adds another row to guessed words table', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordRows).toHaveLength(guessedWordsList.length + 2);
  });
  
  test('shows congrats message', () => {
    const congratsMessage = findByTestAttr(wrapper, 'congrats-message');
    expect(congratsMessage.text().length).toBeGreaterThan(0);
  });
  
  test('does not show input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.exists()).toBe(false);
    
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});
