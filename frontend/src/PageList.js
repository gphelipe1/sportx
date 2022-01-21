import React from 'react';
import loadable from '../utils/loadable';

export const Login = loadable(() => import('./Pages/Login'), {
  fallback: <h1>Loading . . .</h1>,
});
export const DashboardPage = loadable(() => import('./Pages/Dashboard'), {
  fallback: <h1>Loading . . .</h1>,
});
