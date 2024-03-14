import { setPreviewHtml } from '../redux/actions/previewActions';
import { Dispatch } from 'redux';


const applyUserInput = (userInput: Record<string, any>, html: string) => {

  // 1. handle simple fields that only need string replacement.
  html = html.replace('{{STORE_NAME}}', userInput.storeName);
  html = html.replace('{{STORE_BLURB}}', userInput.storeBlurb);
  html = html.replace('{{REFUND_POLICY}}', userInput.refundPolicy);
  html = html.replace('{{EVENT_NAME}}', userInput.eventName);
  html = html.replace('{{EVENT_IMG}}', userInput.eventImageURL);
  html = html.replace('{{EVENT_DESCRIPTION}}', userInput.eventDescription);
  html = html.replace('{{EVENT_ADDR_1}}', userInput.eventAddr1);
  html = html.replace('{{EVENT_ADDR_2}}', userInput.eventAddr2);
  html = html.replace('{{EVENT_ADDR_3}}', userInput.eventAddr3);
  html = html.replace('{{EVENT_EMAIL}}', userInput.eventEmail);
  html = html.replace('{{MODIFIERS_SECTION_TITLE}}', userInput.modifiersSectionTitle);


  return html
}


const createHomepageHTML = async (template: string, userInput: Record<string, any>, dispatch: Dispatch) => {
  template = applyUserInput(userInput, template);

  // Dispatch the action to update the previewHtml state in Redux
  dispatch(setPreviewHtml(template));
  return template;
};

export default createHomepageHTML;
