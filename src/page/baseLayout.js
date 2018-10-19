import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Layout } from 'antd';

import PageSider from './pageSider'
import PageHeader from './pageHeader'
const { Content } = Layout;

class BaseLayout extends Component {
  componentWillMount(){
    
  }
  render() {
    return (
      <div className="layout-box">
        <Layout>
            <PageSider />
            <Layout>
              <PageHeader />
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

const mapStateToProps = state => {
  const { data_collapsed } = state;
  return {
      data_collapsed,
  };
};

export default connect(mapStateToProps)(BaseLayout);