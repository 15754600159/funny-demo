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

const SubMenu = Menu.SubMenu,
    MenuItemGroup = Menu.ItemGroup,
    TabPane = Tabs.TabPane,
    FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
        };

    };

    componentDidMount = () => {
        const options = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, options)
            .then(response => response.json()).then(json => {
                this.setState({ comments: json });
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'GET'
        };
        const formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey + "&comment=" + formdata.remark, options)
            .then(response => response.json()).then(json => {
                this.componentDidMount();
            });
    };

    addCollection = () => {
        const options = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid
            + "&uniquekey=" + this.props.uniquekey, options)
            .then(response => response.json())
            .then(json => {
                //收藏成功以后进行一下全局的提醒
                notification['success']({ message: 'ReactNews提醒', description: '收藏此文章成功' });
            });
    };

    render() {
        let { getFieldProps } = this.props.form;
        const { comments } = this.state,
            commentList = comments.length
                ?
                comments.map((comment, index) => (
                    <Card key={index} title={comment.userName} extra={<a href="#" >发布于 {comment.datetime} </a>}>
                        <p>{comment.Comments}</p>
                    </Card>
                ))
                :
                "还没有评论！";

        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {/* {commentList} */}{/*评论太多*/}
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="您的评论">
                                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark', { initialValue: '' }) }></Input>
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addCollection}>收藏</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    };

}

export default CommonComments = Form.create({})(CommonComments);