// previewReducer.ts
import { IFormInput, ProcessorEnum, SchoolEnum } from "../../components/PageForm";

const initialState: IFormInput = {
  modifiersSectionTitle: 'Registrant Information',
  modifiers: `text,zreg_fname,Registrant First Name,true,64,John
text,zreg_lname,Registrant Last Name,true,64,Smith
text,regEMAIL,Registrant's Email Address,true,32,abc123@nyu.edu`,
  refundPolicy: '<p>Keep in mind that this fee is nonrefundable, even if you ultimately cancel your attendance.</p>',
  termsOfService: '<i>Please note that the event expenses plus the 5% VAT tax on the fee(s) will be assessed. You acknowledge and accept charges accessed for the cost(s) and UAE VAT tax.</i>',

  // TEST DATA
  paymentProcessor: ProcessorEnum.cybersource,
  chartfield1: 'TEST-67890-10-11-12',
  chartfield2: 'TEST-67890-10-11-12',
  storeName: 'Test Store',
  schoolSelection: SchoolEnum.tandon,
  storeID: -1,
  storeBlurb: '<p>This is a test input.</p>',
  eventName: 'Test Event',
  eventImageURL: 'https://www.nyu.edu/content/nyu/en/life/travel-and-transportation/university-transportation/routes-and-schedules/route-a/jcr:content/1/par-left/colctrl/1/nyuimage_0.img.1280.high.png/1631050042816.png',
  eventAddr1: 'NYU Test',
  eventAddr2: '12580 Test Street',
  eventAddr3: 'Brooklyn, NY 11201',
  eventDescription: 'This is a test input.',
  eventEmail: 'rel7817@nyu.edu',
  eventPhone: '(123)456-7890',
  eventURL: 'www.nyu.edu',
  paymentOptions: 'None',
  promoCodes: 'None',
};
  
  const inputReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_INPUT_FIELDS':
        return action.payload;
      default:
        return state;
    }
    
  };
  
  export default inputReducer;
  