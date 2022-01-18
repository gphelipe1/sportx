import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import LoginPage from '../Pages/Login';

export default function RoutesComp()
{
    return(
        <Routes>
            <Route path="/home" element={<Dashboard/>} />
            <Route path="*" element={<Navigate to="/login"/>} />
            
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
    );
}