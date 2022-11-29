import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function AccountSummary(transactions) {

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {transactions.map((transaction) => {
        <div> 
          <ListItem>
          <ListItemText primary={transaction.amount} secondary={transaction.createdAt} />
          </ListItem>
          <Divider component="li" />
          <li>
          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            Divider
          </Typography>
          </li>
        </div>
      })}
    </List>
  );
}