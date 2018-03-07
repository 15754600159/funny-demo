import React from 'react';
import { connect } from 'react-redux';
import {
    Result,
    List,
    WhiteSpace,
    Modal,
} from 'antd-mobile';
import browserCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';

import { logoutSubmit } from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    logout = () => {
        const alert = Modal.alert;

        alert('注销', '确定要退出???', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确定', onPress: () => {
                browserCookies.erase('userid');
                this.props.logoutSubmit();
            }},
        ]);
    }

    render() {
        const Item = List.Item,
            Brief = Item.Brief;

        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../avatar-selector/images/${this.props.avatar}.png`)} style={{ width: 50 }} alt="avatar" />}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company : null}
                ></Result>
                <List renderHeader={() => '简介'}>
                    <Item>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {this.props.money ? <Brief>薪资: {this.props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo}></Redirect>;
    }
}

export default User;