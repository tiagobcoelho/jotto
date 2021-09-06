import React from 'react';
import PropTypes from 'prop-types';

export default function NewWordButton({ display, resetAction }) {

  if(display) {
    return(
      <button data-test="component-new-word-button" onClick={resetAction}>New Word</button>
    );
  } else {
    return null;
  };
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func
};