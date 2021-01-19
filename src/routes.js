import React from 'react';

const Overview = React.lazy(() => import('./views/overview/Overview'));
const Sector1 = React.lazy(() => import('./views/sectors/Sector1'));
const Sector2 = React.lazy(() => import('./views/sectors/Sector2'));
const Sector3 = React.lazy(() => import('./views/sectors/Sector3'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/overview', name: 'Overview', component: Overview },
    { path: '/sectors/subsector1', exact: true, name: 'Sector 1', component: Sector1 },
    { path: '/sectors/subsector2', exact: true, name: 'Sector 2', component: Sector2 },
    { path: '/sectors/subsector3', exact: true, name: 'Sector 3', component: Sector3 },
]   

export default routes;