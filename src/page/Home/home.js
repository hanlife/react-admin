import React from 'react';
import BaseComponent from '../baseComponent'
import PageBreadcrumb from '../pageBreadcrumb'
import ReposChart from './reposChart'
import Service from '../../axios/service'
import { Input, } from 'antd';

const Search = Input.Search;

export default class Home extends BaseComponent {
    constructor(props){
      super(props)
      this.state= {
          name: 'hanlife',
          list: []
      }
      this.breadcrumb = [[null, 'Home']]
    }
    componentWillMount(){
        this._getGitInfo(this.state.name)
    }
    render() {
      return (
        <div>
          <PageBreadcrumb breadcrumb={this.breadcrumb}/>
          <div className="header-section" style={{margin:'5px 0'}}>
          <Search
              placeholder="请输入github账号"
              onSearch={value => {this.setState({name:value});this._getGitInfo(value);}}
              style={{ width: 200 }}
            />
          </div>
          <ReposChart option={this.state.list}/>
        </div>
      );
    }

    _getGitInfo(name) {
      (async ()=> {
        let data = await Service.gitUserInfo({name: name})
        if(data === 'notfound'){
        }else{
          this.setState({
            list: data.data
          })
        }
      })()
    }
}