import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CREATE_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';


export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, {error, data}] = useMutation(CREATE_USER);

  const SubmitRegister = async (e) => {
    e.preventDefault();
    try {
      let vars = { email:email, firstName:firstName, lastName:lastName, password:password }
      const { data } = await addUser({
        variables: {... vars},
      });
      auth.login(data.addUser.token);
    } catch (e) {
        console.log(e)
      }
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
    <Box sx={{ flexGrow: 1 }}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50%' },
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
        <Button variant="contained" onClick={SubmitRegister}>Sign up</Button>
      </Box>
    </Box>
  )
}