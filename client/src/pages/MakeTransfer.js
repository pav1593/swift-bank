import React, { useState } from 'react';
import { from, useMutation, useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import { QUERY_GETME } from '../utils/queries';
import { 
  OutlinedInput,
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Box, 
  TextField, 
  Button, 
} from '@mui/material';
import { MAKE_TRANSACTION } from '../utils/mutations';
import Auth from '../utils/auth'

// Select box styling hello

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
}

export default function MakeTransfer() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [makeTrans, {error, cheese}] = useMutation(MAKE_TRANSACTION)

  const {loading, data} = useQuery(QUERY_GETME, {variables: {id: Auth.getProfile().data._id}});
  const accounts = data?.getMe || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(parseFloat(amount))){
      alert("Please enter a valid amount here")
      return
    }
    try {
      let vars = {acctId: fromAccount, transferId: toAccount, amount: parseFloat(amount), type: "Transaction"} //now changed

      console.log(vars)
      
      const { data } = await makeTrans ({
        variables: {... vars},
      })

      console.log(data)

      //do something? user can make another transaction or be redirected elsewhere
      
    } catch (e) {
      console.log(e)
    }
  }

  const handleFromAccountSelect = (e) => {
    let account = e.target.value;
    document.querySelector(".notranslate").textContent = account[1];
    setFromAccount(account[1])
  }

  const handleToAccountSelect = (e) => {
    console.log(fromAccount)
    setToAccount(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  if(!loading) {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <div>
            <FormControl sx={{ m:1, width:300}}>
              <InputLabel id="simple-select-label">Choose account to transfer from</InputLabel>
              <Select
                labelId="simple-select"
                id="multiple-account"
                multiple
                value={["Select"]}
                onChange={handleFromAccountSelect}
                input={<OutlinedInput label="Account"/>}
                MenuProps={MenuProps}
              >
                {accounts.accounts.map ((account) => (
                  <MenuItem
                    key={account.accountNumber}
                    value={account._id}
                  >
                    {account._id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Recipient Account"
              onChange={handleToAccountSelect}
            />
            <TextField
              required
              id="outlined-required"
              label="Amount"
              onChange={handleAmountChange}
            />
          </div>
          <br/>
          <Button variant="contained" onClick={handleSubmit}>Submit Transfer</Button>
      </Box>
    )
  } else {
    return ( // Admin dashboard
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}
    