import React ,{ Component } from 'react'
import { Layout, Icon } from 'antd';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { event_toggleSider } from '../reducer/action'
const { Header } = Layout;


class PageHeader extends Component{
    
    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.props.data_collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.props.event_toggleSider}
                />
              </Header>
        )
    }
}

const mapStateToProps = state => {
    const { data_collapsed } = state;
   
    return {
        data_collapsed,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ event_toggleSider, }, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PageHeader);
