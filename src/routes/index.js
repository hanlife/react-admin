import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Index from '../page/index'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app" push />} />        
            <Route path="/app" component={App} />
            <Route path="/index" component={Index} />
            
        </Switch>
    </Router>
)