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
              <Content style={{ margin: '0 12px', padding: 8, }}>
                {this.props.children}
              </Content>
            </Layout>
        </Layout>
      </div>
    );
  }
}

export default BaseLayout;