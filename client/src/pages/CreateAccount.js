import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  OutlinedInput
} from '@mui/material';
import { OPEN_ACCOUNT } from "../utils/mutations";
import { QUERY_PRODUCTS } from "../utils/queries";

export default function CreateAccount() {
  const [accountType, setAccountType] = React.useState("Select an account type");
  const {loading, data} = useQuery(QUERY_PRODUCTS);
  const [openAcc, {jagaimo, nasu}] = useMutation(OPEN_ACCOUNT)

  const products = data?.getProducts || [];
  console.log(products)


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

  const handleAccountTypeSelect = (e) => {
    setAccountType(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(accountType)
    
    try {
      let vars = {productId: accountType}

      const { data } = await openAcc ({
        variables: {... vars}
      })

      console.log (data)

    } catch (e) {
      console.log (e)
    }
  }

  // let options = [
  //   {name: 'Select an account type'},
  //   {name: 'Personal business account'},
  //   {name: 'Business Deposit Account'},
  //   {name: 'Joint Deposit Account'},
  //   {name: 'Fixed Rate Mortgage'},
  //   {name: 'Floating Rate Mortgage'},
  //   {name: 'Personal Investment Account'},
  //   {name: 'Personal Line of Credit'},
  //   {name: 'Fixed Rate Loan'},
  // ];

  if(!loading){
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select account type.</InputLabel>
          <Select
            labelId="simple-select"
            id="multiple-account"
            // multiple
            value={accountType}
            onChange={handleAccountTypeSelect}
          > 
            {products.map((option, index) => ( // changed to products for futureproofing
              <MenuItem key={index} value={option._id}>{option.name}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </Box>
    );
  } else {
    return(
      <div>
        <h1>Loading</h1>
      </div>
    )
  }
  //added a "if not loading bit"
};