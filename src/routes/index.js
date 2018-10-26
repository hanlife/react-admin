import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import BaseLayout from '../page/baseLayout'
import WrappedNormalLogin from '../component/login'
import routesConfig from '../routes/routesConfig'
import Service from '../axios/service'
import {Storage} from '../uitl'

export default class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Auth: null
        }
    }
    componentWillMount(){
        this._getAuth()
    }
    // 权限验证
    requireAuth({history,location}) {
        if(!this.state.Auth){
            console.log("no")
        }
        if(true){
            return (
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
                        <Redirect to='/index/home'/>
                    </Switch>
                </BaseLayout>
            )
        }else{
            return  <Redirect to="/404" />
        }
    }
    render() {
        return (
            <Router>
                <Switch>   
                    <Route path="/login/:backUrl" component={WrappedNormalLogin} />
                    <Route path='/404' component={App}/>
                    <Route path="/" render={({history,location}) => {
                        return this.requireAuth({history,location})
                     }} />
                </Switch>
            </Router>
        )
    }

    _getAuth() {
        (async ()=> {
            let data = await Service.testMeseage();
            this.setState({
                Auth: data
            })
            console.log(data)
        })()
    }
}