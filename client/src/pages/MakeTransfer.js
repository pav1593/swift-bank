import React from 'react';
import { useTheme } from '@mui/material/styles';
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

const accounts = [] //get accounts from query


export default function OpenAccount() {
  const [state, dispatch] = useUserContext(); // contexts and states
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const theme = useTheme();

  const handleSubmit = () => {
    dispatch({
      type: MAKE_TRANSACTION,
      fromAccount,
      toAccount,
      amount
    })
  }

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
              value={account}
              onChange={handleToAccountSelect}
              input={<OutlinedInput label="Account"/>}
              MenuProps={MenuProps}
            >
              {accounts.map ((account) => (
                <MenuItem
                  key={account}
                  value={account}
                >
                  {account}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            id="outlined-required"
            label="First Name"
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
          />
          <br/>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <br/>
        <Button variant="contained">Submit Transfer</Button>
    </Box>
  )
}
    