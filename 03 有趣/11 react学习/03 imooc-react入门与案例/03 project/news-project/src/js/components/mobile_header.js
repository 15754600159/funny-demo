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
import {
    HashRouter,
    Route,
    Link,
} from 'react-router-dom';
const SubMenu = Menu.SubMenu,
    MenuItemGroup = Menu.ItemGroup,
    TabPane = Tabs.TabPane,
    FormItem = Form.Item;

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../images/logo.png');

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', // 初始选中标签
            modalVisible: false, // 模态框的显示状态
            action: '',
            hasLogined: false,
            userNickName: '', // 昵称
            userid: 0,
        };
    };

    componentWillMount = () => {
        if (localStorage.userid != '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
                userid: localStorage.userid,
            });
        }
    };

    setModalVisible = (value) => {
        this.setState({ modalVisible: value });
    };

    login = () => {
        this.setModalVisible(true);
    }

    // 页面向API提交数据 fetch
    handleSubmit = (e) => {
        e.preventDefault();
        const formData = this.props.form.getFieldsValue(),
            myFetchOptions = {
                method: 'GET',
            };
        // console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
            + "&username=" + formData.userName
            + "&password=" + formData.password
            + "&r_userName=" + formData.r_userName
            + "&r_password=" + formData.r_password
            + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({ userNickName: json.NickUserName, userid: json.UserId });
            });
        if (this.state.action === 'login') {
            this.setState({ hasLogined: true });
        }
        message.success("请求成功！");
        this.setModalVisible(false);
    };

    callback = (key) => {
        if (key === '1') {
            this.setState({ action: 'login' });
        } else if (key === '2') {
            this.setState({ action: 'register' });
        }
    };

    render() {
        let { getFieldProps } = this.props.form;
        const userShow = this.state.hasLogined
            ? <HashRouter>
                <Link to="/usercenter">
                    <Icon type="inbox" />
                </Link>
            </HashRouter>
            :
            <Icon type="setting" onClick={this.login} />;

        return (
            <div id="mobileheader">

                <header>
                    <img src={logoImg} alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </header>

                <Modal
                    title="用户中心"
                    warpClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)}
                    onCancel={() => this.setModalVisible(false)}
                    okText="关闭"
                >
                    <Tabs type="card" onChange={this.callback}>
                        <TabPane tab="登录" key="1">
                            <Form horizontal="true" onSubmit={this.handleSubmit}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('userName') } />
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password') } />
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form horizontal="true" onSubmit={this.handleSubmit}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账号" {...getFieldProps('r_userName') } />
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password') } />
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入您的账号" {...getFieldProps('r_confirmPassword') } />
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>

            </div>
        );
    };
}

export default MobileHeader = Form.create()(MobileHeader);