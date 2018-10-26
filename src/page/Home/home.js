import React from 'react';
import BaseComponent from '../baseComponent'
import PageBreadcrumb from '../pageBreadcrumb'


export default class Home extends BaseComponent {
    constructor(props){
      super(props)
      this.state= {
        
      }
      this.breadcrumb = [[null, 'Home']]
    }
    componentWillMount(){
      
    }
    render() {
      return (
        <div>
          <PageBreadcrumb breadcrumb={this.breadcrumb}/>
          Home
          <div onClick={()=>{this.openSpin()}}>openSpin</div>
          <a href="/static/resources/demo.html?ddd" target="_blank">调转demo.html</a>
        </div>
      );
    }
}