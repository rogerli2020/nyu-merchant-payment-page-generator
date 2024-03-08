import ReactDOM from "react-dom"
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

enum GenderEnum {
  upay = "Touchnet UPay",
  cybersource = "Cybersource"
}

enum SchoolEnum {
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

interface IFormInput {
  storeID: number
  paymentProcessor: GenderEnum
  storeName: string
  schoolSelection: SchoolEnum
  storeBlurb: string
  refundPolicy: string
  eventName: string
}

export default function PageForm() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => 
  {
    console.log(data);
    alert('Submitted!');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", flex: '1', marginRight:'25px' }}>

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
        {...register("storeName")}
        label="TEST Store ID"
        id="TEST_STORE_ID"
        defaultValue=""
        variant="filled"
        helperText="The ID of the store in TEST environment."
        required
        type="number"
      />

      <TextField 
        {...register("storeName")}
        label="Chartfield 1"
        defaultValue=""
        variant="filled"
        helperText="For 'AMOUNT_EVT_1'. Format: AA-BBBB-CCCCCC-DDDDD-EEEEEE"
        required
      />

      <TextField 
        {...register("storeName")}
        label="Chartfield 2"
        defaultValue=""
        variant="filled"
        helperText="For 'AMOUNT_EVT_2'. Format: AA-BBBB-CCCCCC-DDDDD-EEEEEE"
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
        required
        defaultValue={"placeholder"}
      >
        <MenuItem disabled value="placeholder">Select School</MenuItem>
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
        required
      />

      {/* Blurb */}
      <TextField 
        {...register("refundPolicy")}
        label="Refund Policy HTML"
        defaultValue=""
        helperText="Enter the raw HTML of a message detailing the refund policies of the store."
        variant="filled"
        multiline
        minRows={2}
        maxRows={20}
        required
      />

      {/* Blurb */}
      <TextField 
        {...register("refundPolicy")}
        label="Terms of Service HTML"
        defaultValue=""
        helperText="Enter the raw HTML of a message detailing the TOS of the store."
        variant="filled"
        multiline
        minRows={2}
        maxRows={20}
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

      {/* Event Description */}
      <TextField 
        {...register("eventName")}
        label="Event/Organization Description HTML"
        defaultValue=""
        helperText="Enter the raw HTML of the description of the organization or event."
        variant="filled"
        multiline
        minRows={2}
        maxRows={20}
      />

      {/* Event Address */}
      <TextField 
        {...register("eventName")}
        label="Address Line 1"
        defaultValue=""
        helperText="Line 1 of the event/organization's address"
        variant="filled"
      />

      <TextField 
        {...register("eventName")}
        label="Address Line 2"
        defaultValue=""
        helperText="Line 2 of the event/organization's address"
        variant="filled"
      />

      {/* Event Address */}
      <TextField 
        {...register("eventName")}
        label="City, State, Country, and Zip Code"
        defaultValue=""
        helperText="Enter city, state, (country), and zip code of the address"
        variant="filled"
      />

      {/* Event Address */}
      <TextField 
        {...register("eventName")}
        label="Phone"
        defaultValue=""
        helperText="Phone number if applicable."
        variant="filled"
      />

      {/* Event Address */}
      <TextField 
        {...register("eventName")}
        label="Email"
        defaultValue=""
        helperText="Email address if applicable."
        variant="filled"
      />

      {/* Modifiers */}
      <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="4. Modifiers" size="small" /></Divider>
      <TextField 
        {...register("eventName")}
        label="Modifiers Section Title"
        defaultValue=""
        helperText="Enter title of Modifiers section, such as 'Registrant Information.'"
        variant="filled"
        required
      />
      <TextField 
        {...register("eventName")}
        label="Modifiers"
        defaultValue=""
        helperText={"Follow the following format guide so the application can parse your input."}
        variant="filled"
        multiline
        minRows={4}
        maxRows={20}
      />
      <SimpleCollapse choice={1}/>

      {/* Payment Options */}
      <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="5. Payment Options" size="small" /></Divider>
      <TextField 
        {...register("eventName")}
        label="Payment Options"
        defaultValue=""
        helperText={"Follow the following format guide so the application can parse your input."}
        variant="filled"
        multiline
        minRows={4}
        maxRows={20}
      />
      <SimpleCollapse choice={2}/>

      {/* Promo Codes */}
      <Divider textAlign="center" style={{marginTop:'25px'}}><Chip label="6. Promo Codes" size="small" /></Divider>
      <TextField 
        {...register("eventName")}
        label="Promo Codes"
        defaultValue=""
        helperText={"Follow the following format guide so the application can parse your input."}
        variant="filled"
        multiline
        minRows={4}
        maxRows={20}
      />
      <SimpleCollapse choice={3}/>


      <Button type="submit" variant="outlined" style={{marginTop:"25px"}}>
        <RefreshIcon fontSize='small'/>
        GENERATE/REFRESH PREVIEW
      </Button>
      <Button type="submit" variant="contained">
        <DownloadIcon fontSize='small'/>
        GENERATE .ZIP FILE
      </Button>
    </form>
  )
}