import React from 'react';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
} from 'antd-mobile';
import { connect } from 'react-redux';

import Logo from '../../component/logo/logo';
import { login } from '../../redux/user.redux';

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        });
    }

    handleLogin = () => {
        this.props.login(this.state);
    }

    register = () => {
        this.props.history.push('./register');
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('user', v)}
                        >用户名</InputItem>
                        <InputItem type="password"
                            onChange={v => this.handleChange('pwd', v)}
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