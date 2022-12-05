import React, { useState } from 'react';
import { from, useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import { useUserContext } from '../components/GlobalState';
import { QUERY_GETME } from '../utils/queries';
import { 
  OutlinedInput,
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Box, 
  TextField, 
  Button 
} from '@mui/material';
import { MAKE_TRANSACTION } from '../utils/actions';

// Select box styling

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
  const [state, dispatch] = useUserContext(); // contexts and states
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState(0);

  const {loading, data} = useQuery(QUERY_GETME);
  const accounts = data?.getMe || [];

  const handleSubmit = () => {
    console.log(1)
    dispatch({
      type: MAKE_TRANSACTION,
      fromAccount,
      toAccount,
      amount
    })
    console.log(2)
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
    const tree = accounts.accounts.map ((acc) => "Select Account")
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
    