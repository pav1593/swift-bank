import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@apollo/client';
import { QUERY_GETME } from '../utils/queries';
import AccountSummary from './AccountSummary';

export default function Dashboard() {
  const {loading, data} = useQuery(QUERY_GETME);
  const accounts = data?.getMe || [];
  // if (!context.user.admin) {
  console.log(useQuery(QUERY_GETME))
  if (true) { // testing for user logged in
    return ( // User dashbaord
      <div>
        <Accordion>
            {accounts.map((account) => (
              <div>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{account.product.name}: {account.product.description}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AccountSummary transactions={account.transactions}/>
                </AccordionDetails>
              </div>
            ))}
        </Accordion>
      </div>
    );
  } else {
    return ( // Admin dashboard
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}