import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@apollo/client';
import { QUERY_GETME } from '../utils/queries';
import AccountSummary from './AccountSummary';

const styles = {
  main: {
    paddingTop: "9rem",
    paddingBottom: "9rem"
  }
}

export default function Dashboard() {
  const {loading, data} = useQuery(QUERY_GETME);
  const accounts = data?.getMe.accounts || [];
  // if (!context.user.admin) {
  console.log(accounts)
  if (!loading) { // testing for user logged in
    return ( // User dashbaord
      <div style={styles.main}>
        {accounts.map((account) => (
          <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{account.product[0].description}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <AccountSummary transactions={account.transactions}/>
            </AccordionDetails>
          </Accordion>
        ))}
        
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