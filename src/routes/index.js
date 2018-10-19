import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Index from '../page/index'
import WrappedNormalLogin from '../component/login'


export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />     
            <Route path="/login" component={WrappedNormalLogin} />
            <Route path="/app" component={Index} />
        </Switch>
    </Router>
)