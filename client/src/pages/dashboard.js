import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@apollo/client';
import { QUERY_GETME } from '../utils/queries';
import AccountSummary from './AccountSummary';
import Auth from '../utils/auth'

const styles = {
  main: {
    paddingTop: "1rem",
    paddingBottom: "6rem"
  }
}

export default function Dashboard() {
  const {loading, data} = useQuery(QUERY_GETME);
  const accounts = data?.getMe || [];
  // if (!context.user.admin) {
  console.log(Auth.getProfile().data.admin)
  console.log(data)
  if (!loading) { // testing for user logged in
    return ( // User dashbaord
      <div style={styles.main}>
        <h1>Hello, {accounts.firstName}</h1>
      
        {accounts.accounts && (accounts.accounts.map((account) => (
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {account.product[0].description}
                <p>Account: {account._id}</p>
                <p>Account Balance: ${account.accountBalance}</p>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AccountSummary transactions={account.transactions}/>
            </AccordionDetails>
          </Accordion>
        )))}
        {!accounts.accounts && (
          <h3>Please speak with a bank representative to request your first account.</h3>
        )}
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