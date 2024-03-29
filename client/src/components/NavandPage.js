import React, {useState} from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import Login from '../pages/Login';
import Dashboard from '../pages/dashboard';
import Contact from '../pages/Contact';
import AccountSummary from '../pages/AccountSummary';
import Accounts from '../pages/Accounts';
import Policy from '../pages/Policy';
import Signup from '../pages/Signup';
import MakeTransfer from "../pages/MakeTransfer";
import Auth  from "../utils/auth";
import Home from "../pages/Home";
import Transactions from '../pages/Transactions';
import CreateAccount from "../pages/CreateAccount";
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
import logo from "../images/swiftbank_logo.png";

const drawerWidth = 240;

const styles = {
  contentPadding: {
    paddingTop: "5rem"
  }
}

// testing purposes ~~~~~~~~~~~~~~~~~~~~~~~~
let user=false;
let admin=false;
let loggedIn = Auth.loggedIn();
if (loggedIn) {
  admin = Auth.getProfile().data.admin;
  admin ? user=false : user=true;
}

const userOptions = [
  {
    label: "My Dashboard",
    link: "Dashboard"
  }, 
  {
    label: "View My Accounts",
    link: "CreateAccount"
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
]

const adminOptions = [
  {
    label: "View all transactions",
    link: "Transactions"
  },
  {
    label: "View all account requests",
    link: "Accounts"
  }
]

const extraOptions = [
  {
    label: "Home",
    link: "Home"
  },
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

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  }

  const renderPage = () => {

    switch (currentPage) {
      case "Signup": return <Signup/>;
      case "Login": return <Login/>;
      case "Dashboard": return <Dashboard/>;
      case "CreateAccount": return <CreateAccount/>;
      case "MakeTransfer": return <MakeTransfer/>;
      case "Policy": return <Policy/>;
      case "Contact": return <Contact/>;
      case "Transactions": return <Transactions/>;
      case "Accounts": return <Accounts/>;
      default: return <Home/>
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
      <Link href="/">
          <Box
            component="img"
            sx={{ height: 54 }}
            alt="Logo"
            src={logo}
          />
        </Link>
      </Toolbar>
      <Divider />
      {/* User Routes */}
      {(user && !admin) && (
        <List>
            {userOptions.map((option) => (
              <ListItem key={option.link} disablePadding>
                  <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
              </ListItem>
            ))}
            <ListItem key="logout" disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemText primary="Log out" />
                </ListItemButton>
            </ListItem>
        </List>
      )}
      {/* Admin Routes */}
      {(admin) && (
        <List> 
        {adminOptions.map((option) => (
          <ListItem key={option.link} disablePadding>
            <ListItemButton href={"#"+option.link} onClick={() => setCurrentPage(option.link)}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
          <ListItem key="logout" disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemText primary="Log out" />
                </ListItemButton>
            </ListItem>
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
