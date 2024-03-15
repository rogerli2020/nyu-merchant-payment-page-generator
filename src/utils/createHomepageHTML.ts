import { setPreviewHtml } from '../redux/actions/previewActions';
import { Dispatch } from 'redux';
import { IFormInput, ProcessorEnum } from '../components/PageForm';

interface ModifierInputObject {
  FIELD_TYPE: string;
  FIELD_ID: string;
  FIELD_NAME: string;
  IS_REQUIRED: boolean;
  MAX_LENGTH: number;
  PLACEHOLDER: string;
}

const paymentProcessorFieldIDs: Record<string, any> = {
  //key                 PGW Field ID            UPay Field ID
  'FORM_ID':            ['FORM_ID',             'UPAY_SITE_ID'],
  'AMOUNT_EVT_1':       ['AMOUNT_EVT_1',        'CREDIT_ACCT_AMT'],
  'AMOUNT_EVT_2':       ['AMOUNT_EVT_1',        'CREDIT_ACCT_AMT_2'],
  'AMOUNT_PAID':        ['AMOUNT_PAID',         'AMT'],
  'FIRST_NAME':         ['FIRST_NAME',          'BILL_NAME'],
  'LAST_NAME':          ['LAST_NAME',           'N/A'],
  'ADDRESS_LINE_1':     ['ADDRESS_LINE_1',      'BILL_STREET1'],
  'ADDRESS_LINE_2':     ['ADDRESS_LINE_2',      'BILL_STREET2'],
  'CITY':               ['CITY',                'BILL_CITY'],
  'STATE':              ['STATE',               'STATE'],
  'POSTAL_CODE':        ['POSTAL_CODE',         'BILL_POSTAL_CODE'],
  'COUNTRY':            ['COUNTRY',             'BILL_COUNTRY'],
  'FORM_SUCCESS_URL':   ['FORM_SUCCESS_URL',    'SUCCESS_LINK'],
  'FORM_FAILURE_URL':   ['FORM_FAILURE_URL',    'ERROR_LINK'],
  'ACCOUNT_EVT_1':      ['ACCOUNT_EVT_1',       'CREDIT_ACCT_CODE'],
  'FUND_CODE_EVT_1':    ['FUND_CODE_EVT_1',     'N/A'],
  'DEPTID_CODE_EVT_1':  ['DEPTID_CODE_EVT_1',   'N/A'],
  'PROGRAM_CODE_EVT_1': ['PROGRAM_CODE_EVT_1',  'N/A'],
  'PROJECT_ID_EVT_1':   ['PROJECT_ID_EVT_1',    'N/A'],
  'ACCOUNT_EVT_2':      ['ACCOUNT_EVT_2',       'CREDIT_ACCT_CODE_2'],
  'FUND_CODE_EVT_2':    ['FUND_CODE_EVT_2',     'N/A'],
  'DEPTID_CODE_EVT_2':  ['DEPTID_CODE_EVT_2',   'N/A'],
  'PROGRAM_CODE_EVT_2': ['PROGRAM_CODE_EVT_2',  'N/A'],
  'PROJECT_ID_EVT_2':   ['PROJECT_ID_EVT_2',    'N/A'],
}

// this object is not very readable.
const HTMLTemplates = {
textModifierTemplate: `						<label for="sectionHeader"><b>{{IS_REQUIRED}} {{FIELD_NAME}}:</b><br /></label>
<input type="text" name="{{FIELD_ID}}" id="{{FIELD_ID}}" placeholder="{{PLACEHOLDER}}"><br/>
`,
dropdownModifierTemplate: `                          <select name="{{FIELD_ID}}" id="{{FIELD_ID}}">
<option value="empty" selected="selected">Select option</option>	
{{DROPDOWN_OPTIONS}}
</select>
`,
dropdownModifierOptionTemplate: `                             <option value="{{OPTION_ID}}">{{OPTION_NAME}}</option>
`,
cybersourceFormTagTemplate:`		<form action="https://epaygate.nyu.edu/paygateapp/controller?PG_MODE=PG_WEB" method="post" id="cb_web_form" name="cb_web_form" >
`,
uPayFormTagTemplate:`		<formaction="https://secure.touchnet.com/C21125_upay/web/index.jsp" method="post" name="web_form" id="web_form" >
`,
}

function parseModifiersInput(input: string): ModifierInputObject[] {
  const lines = input.trim().split('\n');
  const parsedInput: ModifierInputObject[] = [];
  lines.forEach(line => {
      const [FIELD_TYPE, FIELD_ID, FIELD_NAME, IS_REQUIRED, MAX_LENGTH, PLACEHOLDER] = line.trim().split(',').map(field => field.trim());
      parsedInput.push({
          FIELD_TYPE,
          FIELD_ID,
          FIELD_NAME,
          IS_REQUIRED: IS_REQUIRED === 'true',
          MAX_LENGTH: parseInt(MAX_LENGTH, 10),
          PLACEHOLDER
      });
  });
  return parsedInput;
}

const applyUserInput = (userInput: IFormInput, html: string) => {

  // determine payment processor
  const currProcessor: ProcessorEnum = userInput.paymentProcessor

  // handle simple fields that only need string replacement.
  html = html.replace('{{STORE_NAME}}', userInput.storeName);
  html = html.replace('{{STORE_BLURB}}', userInput.storeBlurb);
  html = html.replace('{{REFUND_POLICY}}', userInput.refundPolicy);
  html = html.replace('{{EVENT_NAME}}', userInput.eventName);
  html = html.replace('{{EVENT_URL}}', userInput.eventURL);
  html = html.replace('{{EVENT_IMG}}', userInput.eventImageURL);
  html = html.replace('{{EVENT_DESCRIPTION}}', userInput.eventDescription);
  html = html.replace('{{EVENT_ADDR_1}}', userInput.eventAddr1);
  html = html.replace('{{EVENT_ADDR_2}}', userInput.eventAddr2);
  html = html.replace('{{EVENT_ADDR_3}}', userInput.eventAddr3);
  html = html.replace('{{EVENT_EMAIL}}', userInput.eventEmail);
  html = html.replace('{{MODIFIERS_SECTION_TITLE}}', userInput.modifiersSectionTitle);
  html = html.replace('{{TERMS_OF_SERVICE}}', userInput.termsOfService);

  // handle form tag
  if (currProcessor == ProcessorEnum.upay)         
    html = html.replace('{{FORM_TAG}}', HTMLTemplates.uPayFormTagTemplate);
  if (currProcessor == ProcessorEnum.cybersource)  
    html = html.replace('{{FORM_TAG}}', HTMLTemplates.cybersourceFormTagTemplate);

  // handle chartfield information


  // handle modifiers section
  let parsedModifiers = parseModifiersInput(userInput.modifiers);

  // handle product sections

  // handle 


  return html
}


const createHomepageHTML = async (template: string, userInput: IFormInput, dispatch: Dispatch) => {
  template = applyUserInput(userInput, template);

  // Dispatch the action to update the previewHtml state in Redux
  dispatch(setPreviewHtml(template));
  return template;
};

export default createHomepageHTML;
