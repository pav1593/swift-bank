import React, {useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Contact from '../pages/Contact';
import OpenAccount from '../pages/OpenAccount';
import AccountSummary from '../pages/AccountSummary';
import ViewTransactions from '../pages/TransactionsView';
import Footer from './Footer';
// import { User } from '../../../server/models';

const drawerWidth = 240;

// testing purposes ~~~~~~~~~~~~~~~~~~~~~~~~
let user = false;
let admin = false;

const userOptions = [
  {
    label: "My Dashboard",
    link: "Dashboard"
  }, 
  {
    label: "View My Accounts",
    link: "Accounts"
  }
]

function Container(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const renderPage = () => {
    if (currentPage === "Dashboard") { // Add account auth
      return <Dashboard/>
    }
    if (currentPage === "Contact") { // No need for auth
      return <Contact/>
    }
    if (currentPage === "OpenAccount") { // Add account auth
      return <OpenAccount/>
    }
    if (currentPage === "AccountSummary") { // Add account auth
      return <AccountSummary/>
    }
    if (currentPage === "ViewTransactions") { // Add admin auth?
      return <ViewTransactions/>
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* User Routes */}
      <List> 
        {userOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <a href={"/"+option.link}>
              <ListItemButton onSubmit={setCurrentPage(option.link)}>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </a>
          </ListItem>
        ))}
      </List>
      {(user) && (
        <List> 
        {userOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <a href={"/"+option.link}>
              <ListItemButton onSubmit={setCurrentPage(option.link)}>
                <ListItemText primary={option.label} />
              </ListItemButton>
            </a>
          </ListItem>
        ))}
      </List>
      )}
      {/* Admin Routes */}
      {(admin) && (
        <List> 
        {['Requests', 'Products', 'Clients'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <a href={"/"+text}>
              <ListItemButton onSubmit={setCurrentPage(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </a>
          </ListItem>
          
        ))}
      </List>
      )}
  </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {renderPage()}
        <Login/>
      </Box>
    </Box>
  );
}

Container.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Container;
