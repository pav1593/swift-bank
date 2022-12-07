import * as React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_USER_TRANSACTIONS } from '../utils/queries';
import Auth from '../utils/auth'

const styles = {
  main: {
    paddingTop: "1rem",
    paddingBottom: "6rem"
  }
}

export default function Transactions() {
  const admin = Auth.getProfile().data.admin;
  const {loading, data} = useQuery(QUERY_USER_TRANSACTIONS);
  const accounts = data?.getAllUsers || [];
  // if (!context.user.admin) {
  console.log(Auth.getProfile().data.admin)
  console.log(data)
  if (!loading && admin) {
      return ( // Admin dashbaord
        <div style={styles.main}>
          (accounts.transactions) && (
           <List
           sx={{
             width: '100%',
             maxWidth: 360,
             bgcolor: 'background.paper',
           }}
           >
            {accounts.transactions.map((option) => (
              <div>
                <ListItem>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <Divider component="li" />
              </div>
            ))}
          </List>
          )
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