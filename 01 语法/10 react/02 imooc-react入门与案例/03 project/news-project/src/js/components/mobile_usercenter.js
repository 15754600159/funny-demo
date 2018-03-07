import React from 'react';
import { Row, Col } from 'antd';
import {
    Menu, // 头部菜单
    Icon, // 小图标
    Tabs, // 标签页
    message, // 全局提示
    Form, //表单
    Input,
    Button,
    CheckBox,
    Modal,
    notification,
    Card,
} from 'antd';
import {
    HashRouter,
    Route,
    Link,
} from 'react-router-dom';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

const SubMenu = Menu.SubMenu,
    MenuItemGroup = Menu.ItemGroup,
    TabPane = Tabs.TabPane,
    FormItem = Form.Item;

class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible: false
        };
    };

    componentDidMount() {
        const options = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, options)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercollection: json });
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, options)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercomments: json });
            });

    };

    render() {
        const { usercollection, usercomments } = this.state,
            usercollectionList = usercollection.length ?
                usercollection.map((uc, index) => (
                    <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                        <p>{uc.Title}</p>
                    </Card>
                ))
                :
                '您还没有收藏任何的新闻，快去收藏一些新闻吧。',
            usercommentsList = usercomments.length ?
                usercomments.map((comment, index) => (
                    <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}>
                        <p>{comment.Comments}</p>
                    </Card>
                ))
                :
                '您还没有发表过任何评论。';

        return (
            <div>
                <MobileHeader></MobileHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3"></TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <MobileFooter></MobileFooter>
            </div>
        );
    };
}

export default MobileUserCenter;