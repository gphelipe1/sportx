import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
// import Privateroute from '../Components/Privateroute';
import LoginPage from '../Pages/Login';
import PrivateRoute from './Privateroute';
export default function RoutesComp()
{
    return(
        <Routes>
            <Route path='/' element={<PrivateRoute/>}>
                <Route path='/home' element={<Dashboard/>}/>
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="" element={<Navigate to="/home" />} />
            </Route>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>       
    );
}

// return(
//     <Routes>
//         <Route path="*" element={<Navigate to="/login"/>} />
        
//         <Route path="/login" element={<LoginPage/>} />
//         <Route element={<Sidebar/>} path="/home" exact />
//     </Routes>
// );