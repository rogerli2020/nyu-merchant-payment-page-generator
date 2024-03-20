
const initialState = false
  
  const previewEditDialogReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'TOGGLE_PREVIEW_EDIT_DIALOG':
        return !state;
      default:
        return state;
    }
    
  };
  
export default previewEditDialogReducer;
  