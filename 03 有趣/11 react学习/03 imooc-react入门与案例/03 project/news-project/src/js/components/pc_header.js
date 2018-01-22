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
} from 'antd';
const SubMenu = Menu.SubMenu,
    MenuItemGroup = Menu.ItemGroup,
    TabPane = Tabs.TabPane,
    FormItem = Form.Item;


// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../images/logo.png');

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', // 初始选中标签
            modalVisible: false, // 模态框的显示状态
            action: 'login',
            hasLogined: false,
            userNickName: '', // 昵称
            userid: 0,
        };
    }

    render() {
        let { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="register">
                <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Link target="_blank">
                    <Button type="dashed" htmlType="button">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" htmlType="button">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="register" className="register">
                <Icon type="appstore" />注册/登录
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span="2"></Col>
                    <Col span="4">
                        <a href="/" className="logo">
                            <img src={logoImg} alt="logo" />
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span="16">

                        <Menu mode="horizontal" selectedKeys={[this.state.current]}>
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore" />国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>

                        <Modal
                            title="用户中心"
                            warpClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onOk={() => this.setModalVisible(false)}
                            onCancel={() => this.setModalVisible(false)}
                            okText="关闭"
                        >
                            <Tabs type="card">
                                <TabPane tab="注册" key="2">
                                    <Form horizontal onSubmit={this.handleSubmit}>
                                        <FormItem label="账户">
                                            <Input placeholder="请输入您的账号" {...getFieldProps('r_userName')}/>
                                        </FormItem>
                                        <FormItem label="密码">
                                            <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            <Input type="password" placeholder="请再次输入您的账号" {...getFieldProps('r_confirmPassword')}/>
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>

                    </Col>
                    <Col span="2"></Col>
                </Row>
            </header>
        );
    };
}

export default PCHeader = Form.create()(PCHeader);