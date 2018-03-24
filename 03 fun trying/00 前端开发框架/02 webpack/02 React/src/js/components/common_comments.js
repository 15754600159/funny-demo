import React from 'react';
import {
    Row,
    Col,
    Form, // 表单
    Input,
    Button,
    Card,
} from 'antd';

const FormItem = Form.Item;

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {
            comments: '',
        };
    }

    componentDidMount() {
        const options = {
            method: 'GET',
        };
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`, options)
            .then(response => response.json()).then(json => this.setState({ comments: json }));
    }

    render() {
        const { getFieldProps } = this.props.form,
            { comments } = this.state,
            commentList = comments.length
                ?
                comments.map(comment => (
                    <Card key={comment.id} title={comment.userName} extra={<a href="www.baidu.com" >发布于 {comment.datetime} </a>}>
                        <p>{comment.Comments}</p>
                    </Card>
                ))
                :
                '还没有评论！';

        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList} {/* 评论太多 */}
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="您的评论">
                                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark', { initialValue: '' })} />
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addCollection}>收藏</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CommonComments = Form.create({})(CommonComments);
