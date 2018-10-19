import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import {connect} from 'react-redux';
import { Layout } from 'antd';
import routesConfig from '../routes/routesConfig'
import PageSider from './pageSider'
import PageHeader from './pageHeader'
const { Content } = Layout;

class Index extends Component {

  render() {
    return (
      <div className="layout-box">
        <Layout>
            <PageSider collapsed={this.props.data_collapsed}/>
            <Layout>
              <PageHeader />
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div>
                  {
                      routesConfig.map((r, key) => (
                          <Route component={r.component}
                              exact={!!r.exact}
                              key={key}
                              path={r.path}
                          />
                      ))
                  }
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

export default connect(mapStateToProps)(Index);