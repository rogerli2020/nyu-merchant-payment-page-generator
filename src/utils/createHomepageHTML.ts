import { setPreviewHtml } from '../redux/actions/previewActions';
import { Dispatch } from 'redux';


const applyUserInput = (userInput: Record<string, any>, html: string) => {
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


const createHomepageHTML = async (userInput: Record<string, any>, dispatch: Dispatch) => {
  const basePath = process.env.PUBLIC_URL || '';
  try {
    const response = await fetch(`${basePath}/html_template/homepage.html`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage.html: ${response.status} ${response.statusText}`);
    }

    let htmlContent = await response.text();
    htmlContent = applyUserInput(userInput, htmlContent);

    htmlContent = htmlContent.replace('{{STORE_NAME}}', userInput.storeName);

    // Dispatch the action to update the previewHtml state in Redux
    dispatch(setPreviewHtml(htmlContent));
    return htmlContent;

  } catch (error) {
    console.error('Error fetching homepage.html:', error);
    return null;
  }

};

export default createHomepageHTML;
