import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Sectors',
        route: '/sectors',
        icon: 'cil-chart-pie',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Sector 1',
            to: '/sectors/subsector1',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Sector 2',
            to: '/sectors/subsector2',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Sector 3',
            to: '/sectors/subsector3',
          },
        ],
      }
]

export default _nav