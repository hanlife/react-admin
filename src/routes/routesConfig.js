import React from 'react';
import Loadable from "react-loadable"
import Load from '../page/Load/load'

export default [
    {
        name: 'home',
        path: '/index/home',
        exact: true,
        component: Loadable({
            loader: () => import('../page/Home/home'),
            loading: () => <Load />
        })
    },
    {
        name: 'search',
        path: '/index/search',
        component: Loadable({
            loader: () => import('../page/Search/search'),
            loading: () => <Load />
        })
    },
]