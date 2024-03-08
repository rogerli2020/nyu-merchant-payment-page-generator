import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Paper, Typography, Divider } from '@mui/material';

interface SimpleCollapseProps {
  choice: number;
}

const guide1 = (
  <Paper variant="elevation" elevation={12} style={{padding: '10px', backgroundColor:'Cornsilk'}}>
    <Typography align="center" variant="h6"><strong>MODIFIERS INPUT FORMAT GUIDE</strong></Typography>
    <Divider/>
    <Typography>
      <ol>
        <li>
          Enter the information of a modifier in comma separated format as specified below.
        </li>
        <li>
          If the field is a text input field, use this format: <strong>text,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[STRING LENGTH LIMIT]</strong>
        </li>
        <li>
          If the field is a dropdown field, use this format: <strong>dropdown,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[OPTION1 VALUE],[OPTION1 NAME],[OPTION2 VALUE],[OPTION2 NAME]...</strong>
        </li>
        <li>
          Start a new line each time when you're entering the information of a new modifier. Make sure to not use any commas in any field as commas are reserved for the purpose of parsing your input.
        </li>
        <li>
          Example input:<br/>
          <div className="github-code">
            <code>
              text,REGISTRANT_FULL_NAME,Registrant Full Name,true,50<br/>
              dropdown,REGISTRANT_TYPE,Registrant Type,false,UNDERGRAD_STU,Undergraduate,GRAD_STU,Graduate Student,PROF,Professor
            </code><br/>
          </div>
          This example input generates 2 modifier fields: a required Registrant Full Name field with maximum 50 characters, and an optional Registrant Type field with 3 options: Undergraduate, Graduate Student, and Professor.
        </li>
      </ol>
    </Typography>
  </Paper>
);

const guide2 = (
  <Paper variant="elevation" elevation={12} style={{padding: '10px', backgroundColor:'Cornsilk'}}>
    <Typography align="center" variant="h6"><strong>PAYMENT OPTIONS INPUT FORMAT GUIDE</strong></Typography>
    <Divider/>
    <Typography>
    <ol>
      <li>
        Enter the information of a modifier in comma separated format as specified below.
      </li>
      <li>
        If the field is a text input field, use this format: <strong>text,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[STRING LENGTH LIMIT]</strong>
      </li>
      <li>
        If the field is a dropdown field, use this format: <strong>dropdown,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[OPTION1 VALUE],[OPTION1 NAME],[OPTION2 VALUE],[OPTION2 NAME]...</strong>
      </li>
      <li>
        Start a new line each time when you're entering the information of a new modifier. Make sure to not use any commas in any field as commas are reserved for the purpose of parsing your input.
      </li>
      <li>
        Example input:<br/>
        <div className="github-code">
          <code>
            text,REGISTRANT_FULL_NAME,Registrant Full Name,true,50<br/>
            dropdown,REGISTRANT_TYPE,Registrant Type,false,UNDERGRAD_STU,Undergraduate,GRAD_STU,Graduate Student,PROF,Professor
          </code><br/>
        </div>
        This example input generates 2 modifier fields: a required Registrant Full Name field with maximum 50 characters, and an optional Registrant Type field with 3 options: Undergraduate, Graduate Student, and Professor.
      </li>
    </ol>
    </Typography>
  </Paper>
);

const guide3 = (
  <Paper variant="elevation" elevation={12} style={{padding: '10px', backgroundColor:'Cornsilk'}}>
    <Typography align="center" variant="h6"><strong>PROMO CODE INPUT FORMAT GUIDE</strong></Typography>
    <Divider/>
    <Typography>
    <ol>
      <li>
        Enter the information of a modifier in comma separated format as specified below.
      </li>
      <li>
        If the field is a text input field, use this format: <strong>text,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[STRING LENGTH LIMIT]</strong>
      </li>
      <li>
        If the field is a dropdown field, use this format: <strong>dropdown,[MODIFIER FIELD ID],[MODIFIER FIELD NAME],[REQUIRED],[OPTION1 VALUE],[OPTION1 NAME],[OPTION2 VALUE],[OPTION2 NAME]...</strong>
      </li>
      <li>
        Start a new line each time when you're entering the information of a new modifier. Make sure to not use any commas in any field as commas are reserved for the purpose of parsing your input.
      </li>
      <li>
        Example input:<br/>
        <div className="github-code">
          <code>
            text,REGISTRANT_FULL_NAME,Registrant Full Name,true,50<br/>
            dropdown,REGISTRANT_TYPE,Registrant Type,false,UNDERGRAD_STU,Undergraduate,GRAD_STU,Graduate Student,PROF,Professor
          </code><br/>
        </div>
        This example input generates 2 modifier fields: a required Registrant Full Name field with maximum 50 characters, and an optional Registrant Type field with 3 options: Undergraduate, Graduate Student, and Professor.
      </li>
    </ol>
    </Typography>
  </Paper>
);


const chooseGuide = (choice: number): JSX.Element => {
  if (choice == 1) {
    return guide1;
  } else if (choice == 2) {
    return guide2;
  } else {
    return guide3;
  }
}

const SimpleCollapse: React.FC<SimpleCollapseProps> = ({ choice }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show/Hide Guide"
      />
      <Box
        sx={{
          '& > :not(style)': {
            display: 'flex',
            justifyContent: 'space-around',
            // height: 120,
            // width: 250,
          },
        }}
      >
        <div>
          <Collapse in={checked} collapsedSize={0}>
            {chooseGuide(choice)}
          </Collapse>
        </div>
      </Box>
    </Box>
  );
}

export default SimpleCollapse;