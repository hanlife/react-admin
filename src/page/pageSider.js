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

class PageSider extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
            mode: 'inline',
            openKey: '',
            selectedKey: '',
            firstHide: true,
        }
    }

    static getDerivedStateFromProps (props, state) {
        if (props.collapsed !== state.collapsed) {
            const state1 = PageSider.setMenuOpen(props);
            const state2 = PageSider.onCollapse(props.collapsed);

            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed,  // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }

    static setMenuOpen = props => {
        const { pathname } = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        return {
            collapsed,
            // firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    componentDidMount() {
        const state = PageSider.setMenuOpen(this.props);
        this.setState(state);
    }
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.collapsed}
                breakpoint="lg"
            >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline" 
                    onClick={this.menuClick}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
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

export default withRouter(PageSider);

