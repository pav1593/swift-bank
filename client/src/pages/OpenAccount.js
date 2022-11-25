import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function OpenAccount() {
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
          />
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
        <Button variant="contained">Sign up</Button>
    </Box>
  )
}
    