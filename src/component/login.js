import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router'
import {Storage} from '../uitl'
import '../style/login.less'

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props){
        super(props)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            console.log(Storage.get('username'))
            this.props.history.push('/index/home')
          }
        });
    }
    componentWillMount(){
        Storage.set("username",{name:"hanlaifu"})
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login-page">
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