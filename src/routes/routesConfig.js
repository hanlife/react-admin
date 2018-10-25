import React from 'react';
import Loadable from "react-loadable"
import Load from '../page/Load/load'

export default [
    {
        name: '主页',
        path: '/index/home',
        exact: true,
        component: Loadable({
            loader: () => import('../page/Home/home'),
            loading: () => <Load />
        })
    },
    {
        name: '搜索页',
        path: '/index/search',
        component: Loadable({
            loader: () => import('../page/Search/search'),
            loading: () => <Load />
        })
    },
    {
        name: '表单',
        path: '/component/form',
        component: Loadable({
            loader: () => import('../page/Form/form'),
            loading: () => <Load />,
        })
    },
    {
        name: '表格',
        path: '/component/table',
        component: Loadable({
            loader: () => import('../page/Table/table'),
            loading: () => <Load />
        })
    },
    {
        name: '进度条',
        path: '/component/nprogress',
        component: Loadable({
            loader: () => import('../page/Load/nprogress'),
            loading: () => <Load />
        })
    },
    {
        name: '动画',
        path: '/component/transition',
        component: Loadable({
            loader: () => import('../page/Transition/transition'),
            loading: () => <Load />
        })
    },
]