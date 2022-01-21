import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material';
import Logo from '../../Assets/Logos/logosport.png'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import './index.css';
import { logout } from '../../Services/auth';
import { Navigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

export const customTheme = createTheme({
    palette: {
      primary: {
        light: '#fff',
        main: '#fff',
        dark: '#191919',
        contrastText: '#000'
      },
      background: {
        default: '#191919',
        paper: '#fff',
      },
    },
  });

const logoutClick = () => {
  logout();
  window.location.reload();
}

const homeClick = () => {
  return(<Navigate to="/home"/>);
}

export default function PermanentDrawerLeft() {
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [openBurguer, setOpenBurguer] = useState(false);

  // const handleBurguerClick =() => {

  // }

  const updateStatusSideBar = () => {
    if(drawerWidth===0){
      setOpenBurguer(true);
      setDrawerWidth(220)
    }else{
      setOpenBurguer(false);
      setDrawerWidth(0);
    }
  }

  const updateWindowDimensions = () => {
    const newWidth = window.innerWidth;
    if(newWidth < 1350){
      setDrawerWidth(0);
    }else{
      setDrawerWidth(220);
    }
  };

  useEffect(() => {
    updateWindowDimensions();
  },[] );

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  },[] );
  
  return (
    <ThemeProvider theme={customTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, transition: 'width 1s' }}
        >
            <Toolbar>
            
            <Typography variant="h6" noWrap component="div">
              <button className ="burguer-menu"
                      onClick={() => {updateStatusSideBar()}}>
                        {<MenuIcon/>}
              </button>
              <img className="logo" src={Logo} alt="logo" /> SportsX
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                transition: 'width 1s'
            },
            color: 'dark',
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List>
          {['Home', 'Logout'].map((text, index) => (
            <ListItem button key={text} onClick={ text === 'Logout' ? logoutClick : homeClick } >
              <ListItemIcon>
                {text === 'Home' ? <HomeIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        </Drawer>
        </Box>
    </ThemeProvider>
  );
}