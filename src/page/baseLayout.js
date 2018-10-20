import React, { Component } from 'react';
import { Layout } from 'antd';

import PageSider from './pageSider'
import PageHeader from './pageHeader'
const { Content } = Layout;

class BaseLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false
    }
    this.event_toggle = this.event_toggle.bind(this)
  }
  componentWillMount(){
    
  }
  event_toggle(){
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <div className="layout-box">
        <Layout>
            <PageSider collapsed={this.state.collapsed} event_toggle={this.event_toggle}/>
            <Layout>
              <PageHeader collapsed={this.state.collapsed} event_toggle={this.event_toggle}/>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div>
                  {this.props.children}
              </div>
              </Content>
            </Layout>
        </Layout>
      </div>
    );
  }
}

export default BaseLayout;