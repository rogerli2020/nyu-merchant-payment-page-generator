import './App.css';
import MainComponent from './components/MainComponent';
import initializeTemplateState from './utils/intializeTemplateState';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const templateState = useSelector((state: any) => state.template);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';

      // Display confirmation message
      const confirmationMessage = 'Are you sure you want to leave? Your changes may not be saved.';
      event.returnValue = confirmationMessage; // For older browsers
      return confirmationMessage; // For modern browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  if (!templateState) initializeTemplateState(dispatch);
  
  return (
    <MainComponent/>
  );
}

export default App;
