import React, { Component } from 'react';
import { Layout, Spin  } from 'antd';

import PageSider from './pageSider'
import PageHeader from './pageHeader'
import RouterTabs from './routerTabs'

const { Content } = Layout;

// 等待弹窗控制
let SpinControl = null;

class BaseLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      spinning: false
    }
    this.event_toggle = this.event_toggle.bind(this)
  }

   /**
     * 打开等待弹窗
     */
  static openSpin() {
      if (SpinControl !== null) {
          SpinControl(true);
      }
  }

  /**
   * 关闭等待弹窗
   */
  static closeSpin() {
      if (SpinControl !== null) {
          SpinControl(false);
      }
  }

  componentWillMount(){
    // 实现等待弹窗控制
    SpinControl = (state) => {
      console.log(state)
      if (state === this.state.spinning) return;
      this.setState({
          spinning: state
      });
    };
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
              <RouterTabs />
              <Spin size='large' spinning={this.state.spinning}>
                <Content style={{ margin: '0 12px', padding: 8, }}>
                  {this.props.children}
                </Content>
              </Spin>
            </Layout>
        </Layout>
      </div>
    );
  }
}

export default BaseLayout;