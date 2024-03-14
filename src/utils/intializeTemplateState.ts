import { setTemplate } from '../redux/actions/templateActions';
import { Dispatch } from 'redux';


const initializeTemplateState = async (dispatch: Dispatch) => {
  const basePath = process.env.PUBLIC_URL || '';
  console.log('Fetching default template...')
  try {
    const response = await fetch(`${basePath}/html_template/homepage.html`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch homepage.html: ${response.status} ${response.statusText}`);
    }

    let htmlContent = await response.text();

    // Dispatch the action to update the previewHtml state in Redux
    dispatch(setTemplate(htmlContent));
    return htmlContent;

  } catch (error) {
    console.error('Error fetching homepage.html:', error);
    return null;
  }

};

export default initializeTemplateState;
