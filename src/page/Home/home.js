import React from 'react';
import BaseComponent from '../baseComponent'
import PageBreadcrumb from '../pageBreadcrumb'
import Service from '../../axios/service'


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
        </div>
      );
    }
}