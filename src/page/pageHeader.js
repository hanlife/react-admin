import React ,{ Component } from 'react'
import { Layout, Icon } from 'antd';
import { withRouter } from 'react-router';
import Service from '../axios/service'


const { Header } = Layout;

class PageHeader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: null
        }
    }
    componentWillMount() {
       this._getUserInfo();
    }
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.props.event_toggle}
                />
                <div style={{float:'right'}}>
                    <span>{this.state.username}</span>
                    <Icon type="logout" theme="outlined" onClick={()=>{this._logout()}}/>
                </div>
              </Header>
        )
    }
    // 获取用户信息
    _getUserInfo() {
        (async () => {
           let userInfo = Service.getLocalUserInfo();
           if(!userInfo) return
           this.setState({
                username: userInfo.name
           })
        })()
    }
    // 退出
    _logout() {
       (async ()=> {
            await Service.logout();
            let params = window.location.pathname;
            this.props.history.push('/login/' + encodeURIComponent(params) )
       })()
    }
}


export default withRouter(PageHeader);
