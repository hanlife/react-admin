import React from "react";
import ReactDom from 'react-dom';
import {
    withRouter
} from 'react-router-dom';
import {
    Tag,
    Dropdown,
    Icon,
    Tooltip,
    Menu
} from "antd";
import '../style/routerTabs.less';
import MenuList from '../routes/menu'

const { SubMenu } = Menu;

// 通过 pathname 获取 pathname 对应到路由描述信息对象
const getTitleByPathname = (pathname) => {
    let routerInfo
    for (let i = 0; i < MenuList.length; i++) {
        const v = MenuList[i];
        if(v.children.length<=0){
            if(v.key === pathname){
                routerInfo = v
            }
        }else{
            for (let j = 0; j < v.children.length; j++) {
                const v_c = v.children[j];
                if(v.key+v_c.key === pathname){
                    routerInfo = v_c
                }
            }

        }
    }
    return routerInfo;
}

const HomePath = '/index/home'

class RouterTabs extends React.Component{

    static unListen = null;

    constructor(props) {
        super(props);
        this.state = {
            currentPageName: HomePath, // 当前路由对应到 pathname
            refsTag: [HomePath], // tabs 所有到所有页签
            searchMap: {}, // 每个 页签对应的路由参数
        };
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        if (this.unListen) {
          this.unListen();
          this.unListen = null;
        }
        // 监听路由切换事件
        this.unListen = this.props.history.listen((_location) => {
          if (this.didUnMounted) {
            return;
          }
          if (this.notListenOnce) {
            this.notListenOnce = false;
            return;
          }
          const { pathname } = _location;
          if (pathname === '/' || !getTitleByPathname(pathname)) {
            this.setState({
              currentPageName: '',
            });
            return;
          }
          const newRefsTag = [...this.state.refsTag];
          const currentPathname = pathname;
          if (newRefsTag.indexOf(currentPathname) === -1) {
            newRefsTag.push(currentPathname);
          }
          this.state.searchMap[pathname] = _location.search;
          this.setState({
            currentPageName: pathname,
            refsTag: newRefsTag,
          });
          // 假如是新的 导航item 添加进来,需要在 添加完成后调用 scrollIntoTags
          clearTimeout(this.tagChangeTimerId);
          this.tagChangeTimerId = setTimeout(() => {
            this.scrollIntoTags(pathname);
          }, 100);
        });
        const { pathname } = this.props.location;
        this.defaultRefsTag(pathname);
        this.scrollIntoTags(pathname);
    }

    componentWillUnmount() {
        this.didUnMounted = true;
        if (this.unListen) {
          this.unListen();
          this.unListen = null;
        }
    }
    // 初始化tags
    defaultRefsTag(pathname) {
        if(pathname === this.state.currentPageName){
            return
        }else{
            let newRefsTag = [...this.state.refsTag, pathname]
            this.setState({
                currentPageName: pathname,
                refsTag: newRefsTag,
            });
        }
    }
    scrollIntoTags(pathname) {
        let dom;
        try {
          // eslint-disable-next-line react/no-find-dom-node
          dom = ReactDom.findDOMNode(this)
            .querySelector(`[data-key="${pathname}"]`);
          if (dom === null) {
            // 菜单 还没有假如 导航条(横)
          } else {
            // 菜单 已经加入 导航条(横)
            dom.scrollIntoView(false);
          }
        } catch (e) {
          // console.error(e);
        }
    }

    handleClose = (tag) => {
        const { pathname } = this.props.location;
        const { history } = this.props;
        let { currentPageName } = this.state;
        const { searchMap } = this.state;
        const newRefsTag = [...this.state.refsTag.filter(t => t !== tag)];
        if (currentPageName === tag) {
          currentPageName = this.state.refsTag[this.state.refsTag.indexOf(tag) - 1];
        }
        this.setState({
          currentPageName,
          refsTag: newRefsTag,
        });
        if (pathname !== currentPageName) {
          this.notListenOnce = true;
          history.push({
            pathname: currentPageName,
            search: searchMap[currentPageName],
          });
        }
    };

    handleClickTag = (tag, e) => {
        if(e) {
            if (e.target.tagName.toLowerCase() === 'i' || e.target.tagName.toLowerCase() === 'svg' || e.target.tagName.toLowerCase() === 'path') {
                return;
            }
        }
        if (tag !== this.state.currentPageName) {
            this.props.history.push({
                pathname: tag,
                search: this.state.searchMap[tag] ? this.state.searchMap[tag].replace(/from=[^&]+&?/, '') : undefined,
            });
        }
    }

    handleMenuClick = (e) => {
        const eKey = e.key;
        let currentPathname = this.props.location.pathname;
        let newRefsTag;
        if (eKey === '1') {
            // 关闭所有
            newRefsTag = [HomePath];
            currentPathname = HomePath;
        } else if (eKey === '2') {
            // 关闭其他
            newRefsTag = [HomePath];
            if (currentPathname !== HomePath) {
              newRefsTag.push(currentPathname);
            }
        } else {
            this.handleClickTag(eKey);
            return;
        }
        if (currentPathname !== this.state.currentPageName) {
            this.props.history.push({
                pathname: currentPathname,
                search: this.state.searchMap[currentPathname],
            });
        }
        this.setState({
            refsTag: newRefsTag,
        });
        
    }
    
    render() {
        const { currentPageName, refsTag } = this.state;
        const tags = refsTag.map((pathname, index) => {
            const routeInfo = getTitleByPathname(pathname); // 这里假设每个pathname都能获取到指定到页面名称
            let title = routeInfo ? routeInfo.name : '404';
            const isLongTag = title.length > 30;
            const tagElem = (
                <Tag
                key={pathname}
                data-key={pathname}
                className={ pathname === currentPageName ? 'tag active': 'tag' }
                onClick={e => this.handleClickTag(pathname, e)}
                closable={index !== 0}
                afterClose={() => this.handleClose(pathname)}
                >
                <span className="icon" />{isLongTag ? `${title.slice(
                    0, 30)}...` : title}
                </Tag>
            );
            return isLongTag
                ? <Tooltip title={title} key={`tooltip_${pathname}`}>{tagElem}</Tooltip>
                : tagElem;
        });
        this.tags = tags;
        return (
            <div>
                <div className="router-tabs" style={{
                    height: '40px',
                    maxHeight: '40px',
                    lineHeight: '40px',
                    }}>
                    <div style={{
                        flex: '1',
                        height: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                        background: '#f0f0f0',
                        padding: '0px 0px',
                    }}>
                        <div style={{
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        top: '0px',
                        padding: '0px 10px 0px 10px',
                        overflowX: 'auto',
                        }}>
                        {tags}
                        </div>
                    </div>
                    <div style={{
                        width: '96px',
                        height: '100%',
                        background: '#fff',
                        boxShadow: '-3px 0 15px 3px rgba(0,0,0,.1)',
                    }}>
                        <Dropdown overlay={<Menu onClick={this.handleMenuClick}>
                        <Menu.Item key="1">关闭所有</Menu.Item>
                        <Menu.Item key="2">关闭其他</Menu.Item>
                        <SubMenu title="切换标签">
                            {
                            tags.map(item => (<Menu.Item key={item.key}>{item.props.children}</Menu.Item>))
                            }
                        </SubMenu>
                        </Menu>}
                        >
                        <Tag size={'small'} color="#2d8cf0"
                            style={{ marginLeft: 9 }}>
                            标签选项 <Icon type="down" />
                        </Tag>
                        </Dropdown>
                    </div>
                </div>
            </div>
          );
    }
}

export default withRouter(RouterTabs);