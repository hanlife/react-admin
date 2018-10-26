##### 安装依赖：

```
react
react-dom
redux
react-redux
redux-thunk
react-router-dom
antd
less-loader
less
axios
react-loadable
nprogress
```

##### 配置路由

```
 <Router>
    <Switch>   
        <Route path="/login/:backUrl" component={WrappedNormalLogin} />
        <Route path='/404' component={App}/>
        <Route path="/" render={({history,location}) => {
            return this.requireAuth({history,location})
         }} />
    </Switch>
</Router>

 // 权限验证
requireAuth({history,location}) {
    if(!this.state.Auth){
        console.log("no")
    }
    if(true){
        return (
            <BaseLayout history={history} location={location}>
                <Switch>
                    {
                        routesConfig.map((r, key) => (
                            <Route component={r.component}
                                exact={!!r.exact}
                                key={key}
                                path={r.path}
                            />
                        ))
                    }
                    <Redirect to='/index/home'/>
                </Switch>
            </BaseLayout>
        )
    }else{
        return  <Redirect to="/404" />
    }
}
```
##### 路由集合 routesConfig

```
[
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
]
```

##### BaseLayout 

```
<Layout>
    <PageSider collapsed={this.state.collapsed} event_toggle={this.event_toggle}/>
    <Layout>
      <PageHeader collapsed={this.state.collapsed} event_toggle={this.event_toggle}/>
      <RouterTabs />
      <Spin size='large' spinning={this.state.spinning}>
        <Content style={{ margin: '0 12px', padding: 8, }}>
          {this.props.children}
        </Content>
      </Spin>
    </Layout>
</Layout>
```

菜单栏

```
[
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
    },
]
```
