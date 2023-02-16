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
  buttonApprove: {
    margin: "1rem"
  },
  buttonReject: {
    margin: "1rem",
    background: "red",
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
    let params = e.target.id.split(" ");
    console.log(params); // e.target.id gives the id of the transaction PROBLEM SOLVED
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
                                <ListItem key={t._id} id={t._id}>
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
                                    </div>
                                    <Button variant="contained" onClick={handleSubmit} className="danger" style={styles.buttonApprove} id={t._id+" approve"}>Approve</Button>
                                    <Button variant="contained" onClick={handleSubmit} className="danger" style={styles.buttonReject} id={t._id+" reject"}>Reject</Button>
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