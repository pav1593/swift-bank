import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../components/GlobalState';

export default function Login() {
  const [state, dispatch] = useUserContext(); // contexts and states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = () => {
  //   dispatch({
  //     type: LOGIN,
  //   })
  // }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
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
      <Button variant="contained">Log in</Button>
    </Box>
    </Box>
      
);
}
