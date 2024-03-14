
const initialState = ''
  
  const templateReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_TEMPLATE':
        return action.payload;
      default:
        return state;
    }
    
  };
  
  export default templateReducer;
  