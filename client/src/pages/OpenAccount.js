import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../components/GlobalState';
import { CREATE_USER } from '../utils/actions';

export default function OpenAccount() {
  const [state, dispatch] = useUserContext();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    dispatch({
      type: CREATE_USER,
      firstName,
      lastName,
      email,
      password
    })
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={handleEmailChange}
          />
          <TextField
            required
            id="outlined-required"
            label="First Name"
            onChange={handleFirstNameChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            onChange={handleLastNameChange}
          />
          <br/>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
        </div>
        <br/>
        <Button variant="contained" onClick={handleSubmit}>Sign up</Button>
    </Box>
  )
}
    