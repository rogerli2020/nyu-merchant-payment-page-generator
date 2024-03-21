import { setPreviewHtml } from '../redux/actions/previewActions';
import { Dispatch } from 'redux';
import { IFormInput, ProcessorEnum } from '../components/PageForm';

interface TextModifierInputObject {
  FIELD_TYPE: string;
  FIELD_ID: string;
  FIELD_NAME: string;
  IS_REQUIRED: boolean;
  MAX_LENGTH: number;
  PLACEHOLDER: string;
}

interface DropdownModifierInputObject {
  FIELD_TYPE: string;
  FIELD_ID: string;
  FIELD_NAME: string;
  IS_REQUIRED: boolean;
  OPTIONS: string[];
}

type ParsedInputArray = (TextModifierInputObject | DropdownModifierInputObject)[];

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
textModifierTemplate: `						<label for="sectionHeader"><b>{{IS_REQUIRED_STAR}} {{FIELD_NAME}}:</b><br /></label>
<input type="text" name="{{FIELD_ID}}" id="{{FIELD_ID}}" placeholder="{{PLACEHOLDER}}" {{IS_REQUIRED}}><br/>
`,
dropdownModifierTemplate: `						<label for="sectionHeader"><b>{{FIELD_NAME}}:</b></label>
<select name="{{FIELD_NAME}}" id="{{FIELD_ID}}">
   {{DROPDOWN_OPTIONS}}
</select>
`,
dropdownModifierOptionTemplate: `                             <option value="{{OPTION_ID}}">{{OPTION_NAME}}</option>
`,
cybersourceFormTagTemplate:`		<form action="https://epaygate.nyu.edu/paygateapp/controller?PG_MODE=PG_WEB" method="post" id="cb_web_form" name="cb_web_form" >
`,
uPayFormTagTemplate:`		<form action="https://secure.touchnet.com/C21125_upay/web/index.jsp" method="post" name="web_form" id="web_form" >
`,
primaryFeeTemplate:`						<select for="TRAN_EVT_1" id="TRAN_APP_1" name="TRAN_APP_1"  onchange="handleAppTypeChange1()" onBlur="getTRAN_EVT_4" ononmouseup="getTRAN_EVT_4()" onmousedown="getTRAN_EVT_4()" onmouseover="getTRAN_EVT_4()" onmouseout="getTRAN_EVT_4()" onkeydown="getTRAN_EVT_4()"	onkeypress="getTRAN_EVT_4()" onSubmit="getTRAN_EVT_4()" >		
<option value="none" selected="selected" disabled="disabled">Please Choose One...</option>			    
<optgroup label="{{OPTION_NAME}}">
{{OPTIONS}}
</optgroup>	

</select>

<input type="hidden" id="TRAN_EVT_1" name="TRAN_EVT_1" value="0">
`,
paymentOptionTemplate:`<option value="{{OPTION_VALUE}}" >{{OPTION_NAME}}</option>
`
}


function parseModifiersInput(input: string): ParsedInputArray {
  const lines = input.trim().split('\n');
  const parsedInput: ParsedInputArray = [];

  lines.forEach(line => {
      const [FIELD_TYPE, FIELD_ID, FIELD_NAME, IS_REQUIRED, ...options] = line.trim().split(',').map(field => field.trim());

      if (FIELD_TYPE === 'text') {
          parsedInput.push({
              FIELD_TYPE,
              FIELD_ID,
              FIELD_NAME,
              IS_REQUIRED: IS_REQUIRED === 'true',
              MAX_LENGTH: parseInt(options[0], 10),
              PLACEHOLDER: options[1]
          });
      } else if (FIELD_TYPE === 'dropdown') {
          parsedInput.push({
              FIELD_TYPE,
              FIELD_ID,
              FIELD_NAME,
              IS_REQUIRED: IS_REQUIRED === 'true',
              OPTIONS: options
          });
      }
  });

  console.log(parsedInput);
  return parsedInput;
}


function parseCyberSourceCF(inputString: string, number: string): Record<string, string> {
  const fields: string[] = inputString.split('-');

  const result: Record<string, string> = {};
  result[`ACCOUNT_EVT_${number}_VALUE`] = fields[0];
  result[`FUND_CODE_EVT_${number}_VALUE`] = fields[1];
  result[`DEPTID_EVT_${number}_VALUE`] = fields[2];
  result[`PROGRAM_CODE_EVT_${number}_VALUE`] = fields[3];
  result[`PROJECT_ID_EVT_${number}_VALUE`] = fields[4];

  return result;
}




const replacePlaceholders = (template: string, obj: any, ignoreFields: string[] = []): string =>
    template.replace(/{{(.*?)}}/g, (match, p1) => {
        const fieldName = p1.trim();
        if (ignoreFields.includes(fieldName)) {
            return match; // Return the original placeholder if it's in the ignore list
        }
        if (obj.hasOwnProperty(fieldName)) { // Check if obj has the property
            return obj[fieldName];
        }
        return match; // Return the original placeholder if obj[fieldName] does not exist
    }
);




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
  html = html.replace('{{EVENT_EMAIL}}', userInput.eventEmail);
  html = html.replace('{{MODIFIERS_SECTION_TITLE}}', userInput.modifiersSectionTitle);
  html = html.replace('{{TERMS_OF_SERVICE}}', userInput.termsOfService);
  html = html.replace('{{vatx}}', userInput.vatx.toString());
  html = html.replace('{{revenuex}}', userInput.revenuex.toString());


  // handle form tag
  if (currProcessor == ProcessorEnum.upay)         
    html = html.replace('{{FORM_TAG}}', HTMLTemplates.uPayFormTagTemplate);
  if (currProcessor == ProcessorEnum.cybersource)  
    html = html.replace('{{FORM_TAG}}', HTMLTemplates.cybersourceFormTagTemplate);


  // handle chartfield information
  if (currProcessor == ProcessorEnum.upay) {
    html = replacePlaceholders(html, {ACCOUNT_EVT_1_VALUE:userInput.chartfield1});
    html = replacePlaceholders(html, {ACCOUNT_EVT_2_VALUE:userInput.chartfield2});
  } else if (currProcessor == ProcessorEnum.cybersource) {
    const parsedInputCF1: Record<string, string> = parseCyberSourceCF(userInput.chartfield1, '1');
    const parsedInputCF2: Record<string, string> = parseCyberSourceCF(userInput.chartfield2, '2');
    html = replacePlaceholders(html, parsedInputCF1);
    html = replacePlaceholders(html, parsedInputCF2);
  }

  // handle modifiers section
  let modifiersSectionRawHTML: string = "";
  let parsedModifiers: ParsedInputArray = parseModifiersInput(userInput.modifiers);
  for (let i = 0; i < parsedModifiers.length; i++) {
    let modifierInput: (TextModifierInputObject | DropdownModifierInputObject) = parsedModifiers[i];
    let currentModifierRawHTML: string;
    switch (modifierInput.FIELD_TYPE)
    {
      case 'text':
        modifierInput = modifierInput as TextModifierInputObject;
        currentModifierRawHTML = HTMLTemplates.textModifierTemplate;
        currentModifierRawHTML = replacePlaceholders(currentModifierRawHTML, modifierInput, ['IS_REQUIRED', 'IS_REQUIRED_STAR']);
        currentModifierRawHTML = currentModifierRawHTML.replace('{{IS_REQUIRED_STAR}}', modifierInput.IS_REQUIRED ? '*' : '');
        currentModifierRawHTML = currentModifierRawHTML.replace('{{IS_REQUIRED}}', modifierInput.IS_REQUIRED ? 'required' : '');
        modifiersSectionRawHTML = modifiersSectionRawHTML.concat(currentModifierRawHTML);
        break;
      case 'dropdown':
        modifierInput = modifierInput as DropdownModifierInputObject;
        currentModifierRawHTML = HTMLTemplates.dropdownModifierTemplate;
        let allDropdownOptionsHTML: string = '';
        for (let j = 0; j + 1 < modifierInput.OPTIONS.length; j+=2) {
          let currDropdownOptionHTML = HTMLTemplates.dropdownModifierOptionTemplate;
          currDropdownOptionHTML = replacePlaceholders(
              currDropdownOptionHTML,
              {
                OPTION_ID: modifierInput.OPTIONS[j],
                OPTION_NAME: modifierInput.OPTIONS[j+1],
              }
            )
          allDropdownOptionsHTML = allDropdownOptionsHTML.concat(currDropdownOptionHTML);
        }
        currentModifierRawHTML = replacePlaceholders(
          currentModifierRawHTML, 
          {...modifierInput, DROPDOWN_OPTIONS: allDropdownOptionsHTML},
        );
        console.log(currentModifierRawHTML);
        modifiersSectionRawHTML = modifiersSectionRawHTML.concat(currentModifierRawHTML);
        break;
      default:
        break;
    }
  }
  html = html.replace('{{MODIFIERS_SECTION}}', modifiersSectionRawHTML);

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
