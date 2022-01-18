import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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