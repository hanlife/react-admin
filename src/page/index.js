import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import routesConfig from '../routes/routesConfig'

export default class Index extends Component {
 
  render() {
    return (
      <div>
        Index
        <div>
            {
                routesConfig.map((r, key) => (
                    <Route component={r.component}
                        exact={!!r.exact}
                        key={key}
                        path={r.path}
                    />
                ))
            }
        </div>
      </div>
    );
  }
}