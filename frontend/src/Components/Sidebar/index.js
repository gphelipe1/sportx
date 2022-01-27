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
import Logo from '../../Assets/Logos/logo-white.png'
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { logout } from '../../Services/auth';
import { Navigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AddNewClient from '../AddNewClient';
import './index.css';

export const customTheme = createTheme({
    palette: {
      primary: {
        light: '#fff',
        main: '#404040',
        dark: '#fff',
        contrastText: '#fff'
      },
      background: {
        default: '#191919',
        paper: '#404040',
      },
    },
  });

export default function PermanentDrawerLeft() {
  const [drawerWidth, setDrawerWidth] = useState(240);
  // eslint-disable-next-line no-unused-vars
  const [openBurguer, setOpenBurguer] = useState(false);

  const [popUpController, setPopUpController] = useState(false);

  const logoutClick = () => {
    logout();
    window.location.reload();
  }
  
  const addClientClick = () => {
    const newWidth = window.innerWidth;
    if(newWidth < 1350 && openBurguer === true){
      setDrawerWidth(0);
    }
    setPopUpController(true);
  }
  
  const homeClick = () => {
    return(<Navigate to="/home"/>);
  }

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
  }

  useEffect(() => {
    updateWindowDimensions();
  },[] );

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
  },[] );
  
  return (
    <>
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
                          {<MenuIcon style={{ color: '#FFFFFF' }} />}
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
              }}
              variant="permanent"
              anchor="left"
              color='black'
          >
              <Toolbar />
              <Divider />
              <List>
            {['Home', 'Add','Logout'].map((text, index) => (
              <>
              {text ==='Logout' ? <><br/><Divider sx={{ width: '80px' }} variant="inset"  /></> : <></>}
              <ListItem button key={text} onClick={ text === 'Logout' ? logoutClick : text==='Add Client' ? addClientClick : homeClick } >
                <ListItemIcon>
                  {text === 'Home' ? <HomeIcon sx={{ color: 'white'}} /> : text === 'Logout' ? <LogoutIcon sx={{ color: 'white'}} /> : <PersonAddIcon sx={{ color: 'white'}} /> }
                </ListItemIcon>
                <ListItemText primary={<Typography style={{ color: '#FFFFFF' }}>{text}</Typography>} />
              </ListItem>{text ==='Logout' ? <><Divider sx={{ width: '80px' }} variant="inset"  /></> : <></>}</>
            ))}
          </List>
          </Drawer>
          </Box>
      </ThemeProvider>
      < AddNewClient controller={popUpController} setController={setPopUpController} title="Adicionar Novo Cliente" closeBtn={true} />
    </>
  );
}