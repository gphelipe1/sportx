import React from 'react';
import BoxSx from '../../Components/Card';
import './index.css';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/Person';
import Lock from '@mui/icons-material/Lock';
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import logo from '../../Assets/Logos/logosport.png';
// import white from '@material-ui/core/colors/white';

function LoginPage(props)
{
    const theme = createTheme({
        palette: {
          success: {
            main : "#191919",
          }
        },
      })

    const Content = () =>
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <img className="logo" src={logo} alt="logo"/>
                <span>SportX</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <AccountCircle  sx={{ mr: 1, my: 0.5 }} />
                <TextField InputLabelProps={{className: 'textField_label'}} color='success' id="input-with-sx" label="Username" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginBottom: '30px' }}>
                <Lock sx={{mr: 1, my: 0.5 }} />
                <TextField InputLabelProps={{className: 'textField_label'}} color='success' type="password" id="input-with-sx" label="Password" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <Button variant="contained" color='success' endIcon={<SendIcon />}>
                    Entrar
                </Button>
            </Box>
        </ThemeProvider>;

    return(
        <BoxSx element={Content()}/>
    );
}

export default LoginPage;