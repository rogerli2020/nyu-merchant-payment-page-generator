
const initialState = false
  
  const inputInfoDialogReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'TOGGLE_INPUT_DIALOG':
        return !state;
      default:
        return state;
    }
    
  };
  
export default inputInfoDialogReducer;
  