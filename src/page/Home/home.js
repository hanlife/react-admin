import React from 'react';
import BaseComponent from '../baseComponent'
import PageBreadcrumb from '../pageBreadcrumb'

export default class Home extends BaseComponent {
    constructor(props){
      super(props)
      this.state= {
        dd:111
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
        </div>
      );
    }
}