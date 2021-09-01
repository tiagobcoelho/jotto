import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import Congrats from './components/Congrats';
import GuessedWords from './components/GuessedWords';
import Input from './components/Input';
import { getSecretWord } from './actions';

function App() {
  const success = useSelector(state => state.success);
  const guessedWords = useSelector(state => state.guessedWords);
  const secretWord = useSelector(state => state.secretWord);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getSecretWord());
  }, []);
  
  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <Congrats success={success}/>
      <Input success={success} secretWord={secretWord}/>
      <GuessedWords guessedWords={guessedWords}/>
    </div>
  );
}

export default App;
