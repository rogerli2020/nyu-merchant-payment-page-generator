// rootReducer.ts

import { combineReducers } from 'redux';
import previewReducer from './previewReducer'; // Adjust the path based on your project structure

const rootReducer = combineReducers({
  preview: previewReducer,
  // Add other reducers here if needed
});

export default rootReducer;
