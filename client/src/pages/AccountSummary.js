import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
};

export default function AccountSummary({transactions}) {
  // console.log(transactions)
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      {transactions && (transactions.map((transaction,index) => {
        console.log(transaction.type[0])
        return (
          <ListItem key={index}>
            <ListItemText primary={transaction.type[0].name+", made on "+Date(transaction.createdAt)} secondary={"$"+transaction.amount} />
            <Divider/>
          </ListItem>
        )
        
      }))}
    </List>
  );
}