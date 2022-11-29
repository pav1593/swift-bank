import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function AccountSummary({transactions}) {
  console.log(transactions)
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {transactions.map((transaction,index) => {
        <div key={index}> 
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider/>
          <li>
          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            text
          </Typography>
          </li>
        </div>
      })}
    </List>
  );
}