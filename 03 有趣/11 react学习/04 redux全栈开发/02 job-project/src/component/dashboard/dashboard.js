import React from 'react';
import { connect } from 'react-redux';
import { 
    NavBar, 
} from 'antd-mobile';
import { Route, Switch } from 'react-router-dom';

import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';

function Msg() {
    return <h2>Msg页</h2>
}

@connect(
    state => state
)
class Dashboard extends React.Component {
    render() {
        const { pathname } = this.props.location,
            user = this.props.user,
            navList = [
                {
                    path: '/boss',
                    text: '牛人',
                    icon: 'list',
                    title: '牛人列表',
                    component: Boss,
                    hide: user.type !== 'boss',
                },
                {
                    path: '/genius',
                    text: 'boss',
                    icon: 'list',
                    title: 'BOSS列表',
                    component: Genius,
                    hide: user.type !== 'genius',
                },
                {
                    path: '/msg',
                    text: '消息',
                    icon: 'msg',
                    title: '消息列表',
                    component: Msg,
                },
                {
                    path: '/me',
                    text: '我',
                    icon: 'user',
                    title: '个人中心',
                    component: User,
                }
            ];

        return (
            <div>
                <NavBar className="fixd-header" mode="dark">{navList.find(v => v.path === pathname) ? navList.find(v => v.path === pathname).title : null}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        );
    }
}

export default Dashboard;