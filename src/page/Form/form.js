import React, { Component } from 'react';

export default class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: []
    }
  }
 componentWillMount(){
    for (let i = 0; i < 10000; i++) {
      this.state.list.push(i)
    }
 }
  render() {
    return (
      <div>
        form
        {
          this.state.list.map(v=>{
            return <div key={v}>v</div>
          })
        }
      </div>
    );
  }
}