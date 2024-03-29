// rootReducer.ts

import { combineReducers } from 'redux';
import previewReducer from './previewReducer'; // Adjust the path based on your project structure
import inputReducer from './inputReducer';
import templateReducer from './templateReducer';
import templateDialogReducer from './templateDialogReducer';
import inputInfoDialogReducer from './inputInfoDialogReducer';
import previewEditDialogReducer from './previewEditDialogReducer';

const rootReducer = combineReducers({
  preview: previewReducer,
  input: inputReducer,
  template: templateReducer,
  templateDialog: templateDialogReducer,
  inputInfoDialog: inputInfoDialogReducer,
  previewEditDialog: previewEditDialogReducer,
});

export default rootReducer;
