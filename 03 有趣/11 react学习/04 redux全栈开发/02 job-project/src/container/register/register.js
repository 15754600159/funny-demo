import React from 'react';
import { List, 
    InputItem,
    WingBlank,
    Button, 
    Radio,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { register } from '../../redux/user.redux';
import addHandleChange from '../../component/form-decorator/addHandleChange';

const RadioItem = Radio.RadioItem;

@connect(
    state => state.user,
    { register }
)
@addHandleChange
class Register extends React.Component {
    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }

    handleRegister = () => {
        this.props.register(this.props.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}    
                        >用户名</InputItem>
                        <InputItem
                            onChange={v => this.props.handleChange('pwd', v)}
                            type="password"
                        >密码</InputItem>
                        <InputItem
                            onChange={v => this.props.handleChange('repeatpwd', v)}
                            type="password"
                        >确认密码</InputItem>
                        <RadioItem 
                            checked={this.props.state.type==='genius'}
                            onChange={v => this.props.handleChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem 
                            checked={this.props.state.type==='boss'}
                            onChange={v => this.props.handleChange('type', 'boss')}
                        >BOSS</RadioItem>
                    </List>
                        <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Register;