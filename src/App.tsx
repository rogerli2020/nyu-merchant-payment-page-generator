import './App.css';
import MainComponent from './components/MainComponent';
import initializeTemplateState from './utils/intializeTemplateState';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();
  const templateState = useSelector((state: any) => state.template);

  if (!templateState) initializeTemplateState(dispatch);
  
  return (
    <MainComponent/>
  );
}

export default App;
