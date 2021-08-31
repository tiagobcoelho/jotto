import { actionTypes } from '../actions';
import successReducer from './successReducer';

test('when previous state is undefined, return false', () => {
  const newState = successReducer(undefined, {});
  expect(newState).toBe(false);
});

test('when action type is unknown, return previous state', () => {
  const newState = successReducer(false, { type: 'unkown' });
  expect(newState).toBe(false);
});

test('when action type is CORRECT_GUESS, return true', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});