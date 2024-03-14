// rootReducer.ts

import { combineReducers } from 'redux';
import previewReducer from './previewReducer'; // Adjust the path based on your project structure
import inputReducer from './inputReducer';
import templateReducer from './templateReducer';

const rootReducer = combineReducers({
  preview: previewReducer,
  input: inputReducer,
  template: templateReducer,
});

export default rootReducer;
