import React from 'react';

const Overview = React.lazy(() => import('./views/overview/Overview'));
const Sector = React.lazy(() => import('./views/sectors/Sector'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/overview', name: 'Overview', component: Overview },
    { path: '/sectors/subsector1', exact: true, name: 'Sector 1', component: Sector, props: { sector: 'sector1' } },
    { path: '/sectors/subsector2', exact: true, name: 'Sector 2', component: Sector, props: { sector: 'sector2' } },
    { path: '/sectors/subsector3', exact: true, name: 'Sector 3', component: Sector, props: { sector: 'sector3' } },
]   

export default routes;