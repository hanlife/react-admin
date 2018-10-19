import React ,{ Component } from 'react';
import {Link} from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'
const { Sider } = Layout;
const {SubMenu} = Menu;

const MenuList = [
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

function _getKey(pathname) {
    let _defaultKey
    for (let i = 0; i < MenuList.length; i++) {
        if (MenuList[i].children.length<=0) {
            if(pathname === MenuList[i].key){
                _defaultKey = pathname
                continue
            }
        }
        for (let j = 0; j < MenuList[i].children.length; j++) {
           if(pathname === (MenuList[i].key+MenuList[i].children[j].key)){
                _defaultKey = MenuList[i].key
                continue;
           }
        }
    }
    return _defaultKey;
}

class PageSider extends Component{
    constructor(props){
        super(props)
        this.state = {
            openKeys:[]
        }
    }
    rootSubmenuKeys = MenuList.map(v=>{
        return v.key
    })
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    }
    componentWillMount(){
        let pathname = this.props.location.pathname;
        this.state.openKeys = [_getKey(pathname)]
    }
    render() {
        
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" 
                    defaultSelectedKeys={[this.props.location.pathname]}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    {
                      MenuList.map( r => {
                          if(r.children.length<=0){
                              return (
                                <Menu.Item key={r.key}>
                                    <Icon type={r.icon} />
                                    <span><Link to={r.key}>{r.name}</Link></span>
                                </Menu.Item>
                              )
                          }
                          return (<SubMenu key={r.key}
                                           title={<span><Icon type={r.icon}/><span>{r.name}</span></span>}>
                                    {
                                        r.children.map(
                                            subR => {
                                                return (
                                                    <Menu.Item key={r.key+subR.key}>
                                                        <Link to={r.key+subR.key}>{subR.name}</Link>
                                                    </Menu.Item>
                                                )
                                            }
                                        )
                                    }
                                </SubMenu>)
                      })
                    }
                </Menu>
          </Sider>
        )
    }
}

export default withRouter(PageSider)

