// import { Dashboard } from '@mui/icons-material';
import { BrowserRouter } from 'react-router-dom';
// import Privateroute from './Components/Privateroute';
// import LoginPage from './Pages/Login';
import RoutesComp from './Routes/index';

function App()
{
    return(
        <BrowserRouter>
            <RoutesComp/>
        </BrowserRouter>
    );
}

export default App;