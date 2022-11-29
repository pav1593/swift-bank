import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import Login from '../pages/Login';
import Dashboard from '../pages/dashboard';
import Contact from '../pages/Contact';
import OpenAccount from '../pages/OpenAccount';
import AccountSummary from '../pages/AccountSummary';
import ViewTransactions from '../pages/TransactionsView';
import Policy from '../pages/Policy';
import Signup from '../pages/Signup';
import MakeTransfer from "../pages/MakeTransfer";
import {AuthService} from "../utils/auth";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  ListItemButton,
  Typography
} from "@mui/material"

const drawerWidth = 240;

const styles = {
  contentPadding: {
    paddingTop: "5rem"
  }
}

// testing purposes ~~~~~~~~~~~~~~~~~~~~~~~~
let user = AuthService.loggedIn()
let admin = false;

const userOptions = [
  {
    label: "My Dashboard",
    link: "Dashboard"
  }, 
  {
    label: "View My Accounts",
    link: "AccountSummary"
  },
  {
    label: "Send a Transfer",
    link: "MakeTransfer"
  },
  {
    label: "Request a Loan",
    link: "RequestLoan"
  }
];

const loginOptions = [
  {
    label: "Log in!",
    link: "Login"
  },
  {
    label: "Sign up now!",
    link: "Signup"
  },
  {
    label: "My Dashboard",
    link: "Dashboard"
  }, 
]

const extraOptions = [
  {
    label: "Contact us!",
    link: "Contact"
  },
  {
    label: "Our policy",
    link: "Policy"
  }
]

function Container(props) {
  const [currentPage, setCurrentPage] = useState('Home');
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const renderPage = () => {

    switch (currentPage) {
      case "Signup": return <Signup/>;
      case "Login": return <Login/>;
      case "Dashboard": return <Dashboard/>;
      case "OpenAccount": return <OpenAccount/>;
      case "AccountSummary": return <AccountSummary/>;
      case "MakeTransfer": return <MakeTransfer/>;
      case "ViewTransactions": return <ViewTransactions/>;
      case "Policy": return <Policy/>;
      case "Contact": return <Contact/>;
      default: return <Contact/>
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
      {(user) && (
        <List>
            {userOptions.map((option) => (
              <ListItem key={option.link} disablePadding>
                  <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
              </ListItem>
            ))}
        </List>
      )}
      {/* Admin Routes */}
      {(admin) && (
        <List> 
        {userOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      )}
      {(!user && !admin) && (
        <List> 
        {loginOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      )}
      <Divider/>
      <List>
      {extraOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
            Swift Bank
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
        style={styles.contentPadding}
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {renderPage()}
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
