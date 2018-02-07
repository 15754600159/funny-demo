import React from 'react';
import { List, 
    InputItem,
    WingBlank,
    WhiteSpace,
    Button, 
    Radio,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { register } from '../../redux/user.redux';

const RadioItem = Radio.RadioItem;

@connect(
    state => state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius',
        };
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        });
    }

    handleRegister = () => {
        this.props.register(this.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <h2>注册页</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.handleChange('user', v)}    
                        >用户名</InputItem>
                        <InputItem
                            onChange={v => this.handleChange('pwd', v)}
                            type="password"
                        >密码</InputItem>
                        <InputItem
                            onChange={v => this.handleChange('repeatpwd', v)}
                            type="password"
                        >确认密码</InputItem>
                        <RadioItem 
                            checked={this.state.type=='genius'}
                            onChange={v => this.handleChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem 
                            checked={this.state.type=='boss'}
                            onChange={v => this.handleChange('type', 'boss')}
                        >BOSS</RadioItem>
                    </List>
                        <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;