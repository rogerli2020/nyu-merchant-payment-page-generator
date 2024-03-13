// previewReducer.ts

const initialState = {
  modifiersSectionTitle: 'Registrant Information',
  modifiers: `text,zreg_fname,Registrant First Name,true,64,John
text,zreg_lname,Registrant Last Name,true,64,Smith
text,regEMAIL,Registrant's Email Address,true,32,abc123@nyu.edu`,
  refundPolicy: '<p>Keep in mind that this fee is nonrefundable, even if you ultimately cancel your attendance.</p>',
  termsOfService: '<i>Please note that the event expenses plus the 5% VAT tax on the fee(s) will be assessed. You acknowledge and accept charges accessed for the cost(s) and UAE VAT tax.</i>',
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
  