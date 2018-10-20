import React ,{ Component } from 'react'
import { Layout, Icon } from 'antd';
const { Header } = Layout;


class PageHeader extends Component{
    componentWillMount(){
        
    }
    
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.props.event_toggle}
                />
              </Header>
        )
    }
}


export default PageHeader;
