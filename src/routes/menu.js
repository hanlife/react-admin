export default [
    {
        key: '/index',
        name: '主页',
        icon: 'user',
        id: '11',
        parentId: '0',
        children: [
            {
                key: '/home',
                name: '主页',
                id: '1101',
                parentId: '11'
            },
            {
                key: '/search',
                name: '搜索页',
                id: '1101',
                parentId: '11'
            }
        ]
    }, {
        key: '/component',
        name: '组件',
        icon: 'team',
        id: '12',
        parentId: '0',
        children: [
            {
                key: '/form',
                name: '表单',
                id: '1201',
                parentId: '12'
            },
            {
                key: '/table',
                name: '表格',
                id: '1202',
                parentId: '12'
            },
            {
                key: '/nprogress',
                name: '进度条',
                id: '1202',
                parentId: '12'
            },
            {
                key: '/transition/:parms',
                name: '动画',
                id: '1203',
                parentId: '12'
            },
        ]
    },
    {
        key: '/app/test',
        name: 'test',
        icon: 'team',
        id: '13',
        parentId: '0',
        children: []
    }
]