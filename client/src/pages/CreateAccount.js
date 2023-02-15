import * as React from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  OutlinedInput
} from '@mui/material';

export default function CreateAccount() {
  const [accountType, setAccountType] = React.useState("Select an account type")

  // const submitNewAccount = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const {data} = await addAccount({
  //       accountType,
  //     });
  //     alert("Account creation request has been submitted. Please wait up to 24 hours for the account to be approved.")
  //   } catch {
  //     console.log(e)
  //   }
  // }

  let options = [
    {name: 'Select an account type'},
    {name: 'Personal business account'},
    {name: 'Business Deposit Account'},
    {name: 'Joint Deposit Account'},
    {name: 'Fixed Rate Mortgage'},
    {name: 'Floating Rate Mortgage'},
    {name: 'Personal Investment Account'},
    {name: 'Personal Line of Credit'},
    {name: 'Fixed Rate Loan'},
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select account type.</InputLabel>
        <Select
          labelId="simple-select"
          id="multiple-account"
          multiple
          value={["Select"]}
          input={<OutlinedInput label="Account"/>}
          onChange={() => setAccountType(document.querySelector("Select"))}
        >
          {options.map((option, index) => {
            <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
          })}
        </Select>
        <Button variant="contained" disabled={accountType=='Select an account type'}>Submit</Button>
      </FormControl>
    </Box>
  );
};