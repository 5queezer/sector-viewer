import React from 'react';

const Overview = React.lazy(() => import('./views/overview/Overview'));
const Sectors = React.lazy(() => import('./views/sectors/Sectors'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/overview', name: 'Overview', component: Overview },
    { path: '/sectors/:id', exact: true, name: 'Sectors', component: Sectors }
]   

export default routes;