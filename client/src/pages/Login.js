import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../components/GlobalState';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../utils/mutations'

export default function Login() {
  const [state, dispatch] = useUserContext(); // contexts and states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, {error}] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const {data} = await Login({
        variables: {email,password}
      });
      window.location.replace('/Dashboard')
    } catch (e) {
      console.log(e)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <p>
        Please enter your registered email and related password to log into your account!
        If you do not have an account, please sign up
      </p>
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
      <Button variant="contained" onSubmit={handleSubmit}>Log in</Button>
    </Box>
    </Box>
      
);
}
