import React from 'react';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux';
import addHandleChange from '../../component/form-decorator/addHandleChange';

@connect(
    state => state.user,
    { login }
)
@addHandleChange
class Login extends React.Component {
    handleLogin = () => {
        this.props.login(this.props.state);
    }

    register = () => {
        this.props.history.push('./register');
    }

    render() {
        const path = this.props.location.pathname,
            redirect = this.props.redirectTo;

        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.handleLogin} type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;