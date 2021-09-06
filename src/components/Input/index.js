import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { guessWord } from '../../actions';

export default function Input({ secretWord }) {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const dispatch = useDispatch();
  const success = useSelector(state => state.success);

  if(success) {
    return null;
  }
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input 
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess" 
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)} 
        />
        <button
          disabled={!currentGuess.length}
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            dispatch(guessWord(currentGuess));
            setCurrentGuess('');
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
