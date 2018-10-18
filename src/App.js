import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { event_addTodo,event_async } from './reducer/action'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        status: ''
    };
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={()=>{this.props.event_addTodo("text")}}>addTodo</button>
          <button onClick={()=>{this.props.event_async("event_async")}}>异步执行</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { data_todos,data_visibilityFilter } = state;
 
  return {
    data_todos,
    data_visibilityFilter
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  console.log(ownProps)
  return {
    ...bindActionCreators({ event_addTodo, event_async }, dispatch)
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
