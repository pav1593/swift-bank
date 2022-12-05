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

  const {loading, data} = useQuery(QUERY_GETME);
  const accounts = data?.getMe || [];
  console.log(accounts);

  const handleSubmit = () => {
    dispatch({
      type: MAKE_TRANSACTION,
      fromAccount,
      toAccount,
      amount
    })
  }

  const handleFromAccountSelect = (e) => {
    let account = e.target.value;
    console.log(account)
    e.target.value = account;
    console.log(e.target)
    setFromAccount(e.target.value)
  }

  const handleToAccountSelect = (e) => {
    setToAccount(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  if(!loading) {
    const tree = accounts.accounts.map ((acc) => acc._id)
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
                value={tree}
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
          <Button variant="contained" onSubmit={handleSubmit}>Submit Transfer</Button>
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
    