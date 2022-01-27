import React, { useState, useEffect } from 'react';
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
import Particles from 'react-tsparticles';
import Alert from '../../Components/Snackbar';
import { isAuthenticated, signIn } from '../../Services/auth';
import { useNavigate }  from 'react-router-dom'; 

function LoginPage()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigateTo = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useState('');

    const [errorAlert, setError] = useState(false);

    const theme = createTheme({
        palette: {
          success: {
            main : "#191919",
          }
        },
      })
    
    const handleUsernameChange = (value) => {
        setUsername(value);
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    const validateUser = async (event) => {
        event.preventDefault();
        const data =
        {
            'username': username,
            'password': password
        };
        const response = await signIn(data);
        if(response.has_error){
            setError(true);
            return;
        }
        navigateTo('/home');

     }

    useEffect(() => {
        if (isAuthenticated()) {
            navigateTo('/home');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Content = () =>
        <>
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                {errorAlert ? <Alert setOpen={() => setError()} open={errorAlert} severity="error" message="Credenciais Inválidas" /> : <></> }
                <img className="logo" src={logo} alt="logo"/>
                <span>SportsX</span>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
                <AccountCircle  sx={{ mr: 1, my: 0.5 }} />
                <TextField value={username} onChange={(e) => handleUsernameChange(e.target.value)} InputLabelProps={{className: 'textField_label'}} color='success' id="input-with-sx" label="Username" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginBottom: '30px' }}>
                <Lock sx={{mr: 1, my: 0.5 }} />
                <TextField value={password} type="password" onChange={(e) => handlePasswordChange(e.target.value)} InputLabelProps={{className: 'textField_label'}} color='success' id="input-with-sx" label="Password" variant="standard" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                <Button type="submit" variant="contained" color='success' endIcon={<SendIcon />}>
                    Entrar
                </Button>
            </Box>
        </ThemeProvider>
        </>

    return(
        <>
        <Particles id="particles" options={{
            fpsLimit: 60,
            particles: {
                color: {
                value: "#404040",
                },
                links: {
                color: "#404040",
                distance: 200,
                enable: true,
                opacity: 0.5,
                width: 1,
                },
                move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 2,
                straight: false,
                },
                number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
                },
                opacity: {
                value: 0.5,
                },
                shape: {
                type: "circle",
                },
                size: {
                random: true,
                value: 3,
                },
            },
            detectRetina: false,
        }} />
        <form onSubmit={validateUser}>
        <BoxSx element={Content()}/>
        </form>
        </>
    );
}

export default LoginPage;