
const initialState = false
  
  const templateDialogReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'TOGGLE_DIALOG':
        return !state;
      default:
        return state;
    }
    
  };
  
export default templateDialogReducer;
  