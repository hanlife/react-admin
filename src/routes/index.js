import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import BaseLayout from '../page/baseLayout'
import WrappedNormalLogin from '../component/login'
import routesConfig from '../routes/routesConfig'


export default () => (
    <Router>
        <Switch>   
            <Route path="/login" component={WrappedNormalLogin} />
            <Route path='/404' component={App}/>
            <Route path="/" render={({history,location}) => (
                <BaseLayout history={history} location={location}>
                    <Switch>
                        {
                            routesConfig.map((r, key) => (
                                <Route component={r.component}
                                    exact={!!r.exact}
                                    key={key}
                                    path={r.path}
                                />
                            ))
                        }
                        <Redirect to='/404'/>
                    </Switch>
                </BaseLayout>
            )} />
        </Switch>
    </Router>
)