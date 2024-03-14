import './App.css';
import MainComponent from './components/MainComponent';
import initializeTemplateState from './utils/intializeTemplateState';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  initializeTemplateState(dispatch);
  
  return (
    <MainComponent/>
  );
}

export default App;
