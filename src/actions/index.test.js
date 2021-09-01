import moxios from 'moxios';
import { getSecretWord } from './';
import { storeFactory } from '../../test/testUtils'

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('secretWord is returned', () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party'
      });
    });
    
    // update to test app in Redux / context sections
    return store.dispatch(getSecretWord())
      .then(() => {
        const secretWord = store.getState().secretWord;
        expect(secretWord).toBe('party');
      });
  });
});