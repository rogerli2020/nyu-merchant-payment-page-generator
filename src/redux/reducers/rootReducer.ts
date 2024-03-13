// rootReducer.ts

import { combineReducers } from 'redux';
import previewReducer from './previewReducer'; // Adjust the path based on your project structure
import inputReducer from './inputReducer';

const rootReducer = combineReducers({
  preview: previewReducer,
  input: inputReducer,
});

export default rootReducer;
