import React from 'react';
import PropTypes from 'prop-types';

export default function TotalGuesses({ totalGuesses }) {
  return (
    <div data-test="component-total-guesses">
      <p>Total Guesses: <span data-test="total-guesses">{totalGuesses}</span></p>
    </div>
  );
};

TotalGuesses.propTypes = {
  totalGuesses: PropTypes.number.isRequired
};