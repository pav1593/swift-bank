import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
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
  const theme = useTheme();

  const {accounts} = useQuery(QUERY_GETME);

  const handleSubmit = () => {
    dispatch({
      type: MAKE_TRANSACTION,
      fromAccount,
      toAccount,
      amount
    })
  }
  
  const fromAccounts = ""; // use query to grab transactions for user and set equal to array of accounts, grabbing names


  const handleFromAccountSelect = (e) => {
    setFromAccount(e.target.value)
  }

  const handleToAccountSelect = (e) => {
    setToAccount(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

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
            <InputLabel id="multiple-account-label">Choose account to transfer from</InputLabel>
            <Select
              labelId="multiple-account-label"
              id="multiple-account"
              multiple
              // value={account}
              onChange={handleFromAccountSelect}
              input={<OutlinedInput label="Account"/>}
              MenuProps={MenuProps}
            >
              {accounts.map ((account) => (
                <MenuItem
                  key={account.accountNumber}
                  value={account.name}
                >
                  {account.description}
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
        <Button variant="contained" onSubmit={handleSubmit}>Submit Transfer</Button>
    </Box>
  )
}
    