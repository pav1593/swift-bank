import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'

export default function Login() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
        <Button variant="contained">Log in</Button>
      </Box>
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
      </Grid>
    </Box>
      
);
}
