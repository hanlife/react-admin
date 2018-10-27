import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router'
import Particles from 'react-particles-js'
import {Storage} from '../uitl'
import Service from '../axios/service'
import '../style/login.less'

const FormItem = Form.Item;
// 粒子效果配置
const particlesConfig =  {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            shadow: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            }
        }
    },
    interactivity:{
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            backUrl: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            Storage.set("username",{name:"hanlaifu"})
            // 登录接口
            Service.getLogin(values).then(data=> {
                if(!this.state.backUrl){
                    this.props.history.push('/index/home')
                }else{
                    this.props.history.push(decodeURIComponent(this.state.backUrl))
                }
            })
          }
        });
    }
    componentWillMount(){
        let {backUrl} = this.props.match.params
        this.setState({backUrl})
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login-page">
                <Particles 
                    params={particlesConfig}
                    className="particles"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
                <ul className="login_bg">
                    <li></li>
                </ul>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '用户名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        OR<a href="">注册</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedNormalLogin = Form.create()(Login);

export default withRouter(WrappedNormalLogin)