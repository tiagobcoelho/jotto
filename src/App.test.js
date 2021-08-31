import { mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';
import App from './App';

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

/**
 * Setup function for App component
 * @returns {ShallowWrapper}
 */
const setup = () => {
  const store = storeFactory()
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent).toHaveLength(1);
});


describe('getSecretWord', () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  })

  test('getSecretWord runs on app mount', () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });
  
  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // using setProps because wrapper.update() does not trigger useEffect
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});