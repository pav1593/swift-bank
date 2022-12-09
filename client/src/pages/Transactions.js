import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Box, 
  Button, 
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER_TRANSACTIONS } from '../utils/queries';
import { CHANGE_TRANS_STATUS } from '../utils/mutations'
import { useState } from 'react';
import Auth from '../utils/auth'

const styles = {
  main: {
    paddingTop: "1rem",
    paddingBottom: "6rem"
  },
  button: {
    margin: "1rem"
  },
  name: {
    fontSize: "2rem",
    paddingRight: "1rem"
  }
}

export default function Transactions() {
  const admin = Auth.getProfile().data.admin;
  const [tStatus, setTStatus] = useState("")
  const [appTrans, {holenso, cabocha}] = useMutation(CHANGE_TRANS_STATUS)

  const {loading, data} = useQuery(QUERY_USER_TRANSACTIONS);
  const users = data?.getAllUsers || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tId = prompt("To confirm, please enter in the transaction ID you are updating")
    let tString
    tStatus === 'approve' ? tString = 'approved' : tString = 'rejected'
    
    try {
      let vars = {transId: tId, status: tString, approverId: Auth.getProfile().data._id
      }
      console.log(vars)

      const { data } = await appTrans ({
        variables: {...vars}
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleTStatus = (e) => {
    setTStatus(e.target.value)
  }

  if (!loading && admin) {
      return ( // Admin dashbaord
        <div style={styles.main}>
          {(users) && (
           <List
           sx={{
             width: '100%',
             bgcolor: 'background.paper',
           }}
           >
            {users.map((u) => {
              return (
                <div>
                  
                    {
                      u.accounts.map(a => {
                        return (
                          <div>
                            {
                              a.transactions.map(t => {
                                return (
                                  <ListItem>
                                    <div style={styles.name}>{u.firstName + " " + u.lastName}</div>
                                  <div>
                                    <ListItemText primary={"$ " + t.amount} secondary= {"To: " + t.transferTo + " Made on: " + t.createdAt} tertiary="test"/> 
                                    <Divider component="li" />
                                    <Box
                                      component="form"
                                      sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                      >
                                      <div>
                                        <FormControl fullWidth>
                                          <InputLabel id="change-trans-status-label">Select an action</InputLabel>
                                          <Select
                                            labelId="change-trans-status-label"
                                            id="change-trans-status"
                                            // fix the value please
                                            value={tStatus}
                                            label="Approve or Reject"
                                            onChange={handleTStatus}
                                          >
                                            <MenuItem value={"approve"}>Approve</MenuItem>
                                            <MenuItem value={"reject"}>Reject</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </div>
                                      <Button variant="contained" onClick={handleSubmit} style={styles.button}>Change Transaction Status</Button>
                                    </Box>
                                  </div>
                                  <Divider/>
                                  </ListItem>
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                  
                  <Divider component="li" />
                </div>
              )
            })}
          </List>
          )}
        </div>
      )
  } else if (!loading && !admin) {
    return ( // Admin dashboard
      <div>
        <h1>This page is for admins only.</h1>
        <h2>Please sign in as an admin to view all transactions.</h2>
      </div>
    );
  } else {
    return ( // Admin dashboard
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}