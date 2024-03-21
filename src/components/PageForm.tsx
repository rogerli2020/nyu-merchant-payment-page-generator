import { useForm, SubmitHandler } from "react-hook-form"
import { 
  Select,
  Button,
  TextField,
  Divider,
  Chip,
  MenuItem,
  FormHelperText,
} from "@mui/material"
import './CodeBlock.css'
import SimpleCollapse from "./SimpleCollapse"
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import createHomepageHTML from "../utils/createHomepageHTML";
import TemplateEditDialog from "./TemplateEditDialog";
import InputInfoDialog from "./InputInfoDialog";
import { useDispatch, useSelector } from "react-redux";

export enum ProcessorEnum {
  upay = "upay",
  cybersource = "cybersource"
}

export enum SchoolEnum {
  nyuad = "NYU Abu Dhabi",
  nyu = "NYU",
  nyush = "NYU Shanghai",
  tandon = "Tandon",
  dentistry = "College of Dentistry",
  cas = "College of Arts and Science",
  courant = "Courant",
  gallatin = "Gallatin",
  stern = "Stern",
  steinhardt = "Steinhardt",
  tisch = "Tisch",
}

export interface IFormInput {
  // Payment Processor Fields
  paymentProcessor: ProcessorEnum
  storeID: number
  chartfield1: string
  chartfield2: string

  // General Information Fields
  storeName: string
  schoolSelection: SchoolEnum
  storeBlurb: string
  refundPolicy: string
  termsOfService: string

  // Event/Organzation Information Fields
  eventName: string
  eventURL: string
  eventImageURL: string
  eventDescription: string
  eventAddr1: string
  eventAddr2: string
  eventAddr3: string
  eventPhone: string
  eventEmail: string

  // Modifiers Fields
  modifiersSectionTitle: string
  modifiers: string

  // Payment Options Fields
  paymentOptions: string
  vatx: Number
  revenuex: Number

  // Promo Codes Fields
  promoCodes: string

}

export default function PageForm() {
  // redux stuff.
  const dispatch = useDispatch();
  const inputState = useSelector((state: any) => state.input);
  const templateState = useSelector((state: any) => state.template);

  // react-hook-form submission stuff
  const { register, setValue, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => 
  {
    createHomepageHTML(templateState, data, dispatch);
    console.log(data);
  }

  // populate fields based on the state of inputState...
  for (const key in inputState) {
    if (Object.prototype.hasOwnProperty.call(inputState, key)) {
      setValue(key as keyof IFormInput, inputState[key as keyof IFormInput]);
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: '1', marginRight:'25px' }}>
      <TemplateEditDialog/>
      <InputInfoDialog/>
      <Divider/>
      <Button variant="contained" color="error" disabled>
        RESET ALL DATA (UNDER CONSTRUCTION)
      </Button>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", flex: '1' }}>
        
        {/* <FormHelperText style={{marginLeft:'10px'}}>
            If applicable, you can import a text file containing the input data, and the application will 
            automatically parse your data and populate the fields.
        </FormHelperText> */}

        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="1. Payment Processor Information" size="small" /></Divider>
        <Select 
          {...register("paymentProcessor")}
          required
          defaultValue={"placeholder"}
        >
          <MenuItem disabled value="placeholder">Select Payment Processor</MenuItem>
          <MenuItem value="upay">Touchnet UPay</MenuItem>
          <MenuItem value="cybersource">NYU PGW (CyberSource)</MenuItem>
        </Select>

        <TextField 
          {...register("storeID")}
          label="TEST Store ID"
          id="TEST_STORE_ID"
          defaultValue=""
          variant="filled"
          helperText="The ID of the store in TEST environment."
          required
          type="number"
        />

        <TextField 
          {...register("chartfield1")}
          label="Chartfield 1"
          defaultValue=""
          variant="filled"
          helperText="For CyberSource, chartfield will be parsed in the format of ACCOUNT_EVT_1-FUND_CODE_EVT_1-DEPTID_EVT_1-PROGRAM_CODE_EVT_1-PROJECT_ID_EVT_1 (e.g. 23103-75-71653-ADHPG-STCON)"
          required
        />

        <TextField 
          {...register("chartfield2")}
          label="Chartfield 2"
          defaultValue=""
          variant="filled"
          helperText="Follow the same format specified above."
          required
        />

        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="2. General Information" size="small" /></Divider>
        <TextField 
          {...register("storeName")}
          label="Store Name"
          defaultValue=""
          helperText="The name of the store."
          variant="filled"
          required
        />

        {/* School Selection */}
        <Select 
          {...register("schoolSelection")}
          disabled
          defaultValue={"placeholder"}
        >
          <MenuItem disabled value="placeholder">Select School (IGNORE THIS FIELD)</MenuItem>
          <MenuItem value="nyu">NYU</MenuItem>
          <MenuItem value="nyuad">NYU Abu Dhabi</MenuItem>
          <MenuItem value="nyush">NYU Shanghai</MenuItem>
          <MenuItem value="dentistry">College of Dentistry</MenuItem>
          <MenuItem value="cas">College of Arts and Science</MenuItem>
          <MenuItem value="Courant">Courant</MenuItem>
          <MenuItem value="gallatin">Gallatin</MenuItem>
          <MenuItem value="stern">Stern</MenuItem>
          <MenuItem value="steinhardt">Steinhardt</MenuItem>
          <MenuItem value="tandon">Tandon</MenuItem>
          <MenuItem value="tisch">Tisch</MenuItem>
        </Select>
        <FormHelperText style={{marginLeft:'10px'}}>
          Choose the parent school of your event/organization from the dropdown menu above.
        </FormHelperText>

        {/* Blurb */}
        <TextField 
          {...register("storeBlurb")}
          label="Store Blurb HTML"
          defaultValue=""
          helperText="Enter the raw HTML of a welcome message detailing the information of the store."
          variant="filled"
          multiline
          minRows={2}
          maxRows={20}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
          required
        />

        {/* Blurb */}
        <TextField 
          {...register("refundPolicy")}
          label="Refund Policy HTML"
          helperText="Enter the raw HTML of a message detailing the refund policies of the store."
          variant="filled"
          multiline
          minRows={2}
          maxRows={20}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
          required
        />

        {/* Blurb */}
        <TextField 
          {...register("termsOfService")}
          label="Terms of Service"
          defaultValue=""
          helperText="Enter a message detailing the TOS of the store."
          variant="filled"
          multiline
          minRows={2}
          maxRows={20}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
          required
        />

        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="3. Event/Organization Information" size="small" /></Divider>
        {/* Event Name */}
        <TextField 
          {...register("eventName")}
          label="Event/Organization Name"
          defaultValue=""
          helperText="The name of the event or organization"
          variant="filled"
          required
        />

        {/* Event Name */}
        <TextField 
          {...register("eventURL")}
          label="Event/Organization URL"
          defaultValue=""
          helperText="The URL link to the event/organization, if it has one"
          variant="filled"
        />

        {/* Event Name */}
        <TextField 
          {...register("eventImageURL")}
          label="Event/Organization Image URL"
          defaultValue=""
          helperText="The URL to a representative image of the event/organization"
          variant="filled"
        />

        {/* Event Description */}
        <TextField 
          {...register("eventDescription")}
          label="Event/Organization Description"
          defaultValue=""
          helperText="Enter the description of the organization or event."
          variant="filled"
          multiline
          minRows={2}
          maxRows={20}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
        />

        {/* Event Address */}
        <TextField 
          {...register("eventAddr1")}
          label="Address Line 1"
          defaultValue=""
          helperText="Line 1 of the event/organization's address"
          variant="filled"
        />

        <TextField 
          {...register("eventAddr2")}
          label="Address Line 2"
          defaultValue=""
          helperText="Line 2 of the event/organization's address"
          variant="filled"
        />

        {/* Event Address */}
        <TextField 
          {...register("eventAddr3")}
          label="City, State, Country, and Zip Code"
          defaultValue=""
          helperText="Enter city, state, (country), and zip code of the address"
          variant="filled"
        />

        {/* Event Address */}
        <TextField 
          {...register("eventPhone")}
          label="Phone"
          defaultValue=""
          helperText="Phone number if applicable."
          variant="filled"
        />

        {/* Event Address */}
        <TextField 
          {...register("eventEmail")}
          label="Email"
          defaultValue=""
          helperText="Email address if applicable."
          variant="filled"
        />

        {/* Modifiers */}
        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="4. Modifiers" size="small" /></Divider>
        <TextField 
          {...register("modifiersSectionTitle")}
          label="Modifiers Section Title"
          defaultValue=""
          helperText="Enter title of Modifiers section, such as 'Registrant Information.'"
          variant="filled"
          required
        />
        <TextField 
          {...register("modifiers")}
          label="Modifiers"
          defaultValue=""
          helperText={"Follow the following format guide so the application can parse your input."}
          variant="filled"
          multiline
          minRows={4}
          maxRows={64}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
        />
        <SimpleCollapse choice={1}/>

        {/* Payment Options */}
        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="5. Payment Options" size="small" /></Divider>
        <TextField 
          {...register("paymentOptions")}
          label="Payment Options"
          defaultValue=""
          helperText={"Follow the following format guide so the application can parse your input."}
          variant="filled"
          multiline
          minRows={4}
          maxRows={64}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
        />
        <SimpleCollapse choice={2}/>

        {/* Promo Codes */}
        <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="6. Promo Codes" size="small" /></Divider>
        <TextField 
          {...register("promoCodes")}
          label="Promo Codes"
          defaultValue=""
          helperText={"Follow the following format guide so the application can parse your input."}
          variant="filled"
          multiline
          minRows={4}
          maxRows={64}
          InputProps={{style: {fontSize: 'small', fontFamily: 'monospace'}}}
        />
        <SimpleCollapse choice={3}/>


        <Button type="submit" variant="outlined" style={{marginTop:"25px"}}>
          <RefreshIcon fontSize='small'/>
          GENERATE/REFRESH PREVIEW
        </Button>
        <Button type="submit" variant="contained" disabled>
          <DownloadIcon fontSize='small'/>
          GENERATE .ZIP FILE (UNDER CONSTRUCTION)
        </Button>
      </form>
    </div>
  )
}