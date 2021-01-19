import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
    {
      _tag: 'CSidebarNavItem',
      name: 'Overview',
      to: '/overview',
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
            icon: 'cil-graph',
            to: '/sectors/subsector1',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Sector 2',
            icon: 'cil-graph',
            to: '/sectors/subsector2',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Sector 3',
            icon: 'cil-graph',
            to: '/sectors/subsector3',
          },
        ],
      }
]

export default _nav