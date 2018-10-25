import React, { Component } from 'react';
import { Spin } from 'antd';

export default class Load extends Component {
 
  render() {
    return (
      <div className="componentLoad" style={{margin: '100px 0',textAlign:"center"}}>
        <Spin tip="页面拼命加载中..."></Spin>
      </div>
    );
  }
}