import React ,{ Component } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb  } from 'antd';
import { withRouter } from 'react-router'

class PageBreadcrumb extends Component{
    componentWillMount(){
        
    }
    render() {
        const {breadcrumb} = this.props
        return (
            <Breadcrumb className="breadcrumb-box">
                <Breadcrumb.Item><Link to='/index/home'>主页</Link></Breadcrumb.Item>
                {
                    breadcrumb.map((v,index)=>{
                        return (
                            <Breadcrumb.Item key={index}>
                            {v[0] === null
                                ? v[1]
                                : <Link to={v[0]}>{v[1]}</Link>}
                            </Breadcrumb.Item>
                        )
                    })
                }
                
            </Breadcrumb>
        )
    }
}

export default withRouter(PageBreadcrumb);