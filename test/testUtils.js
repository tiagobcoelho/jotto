import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';

/**
 * Create a testing store with imported reducers, middleware and initial state.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory 
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};

/**
 * Returns node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search. 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};



