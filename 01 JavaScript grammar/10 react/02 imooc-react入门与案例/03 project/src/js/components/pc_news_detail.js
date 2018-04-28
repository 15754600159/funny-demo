import React from 'react';
import { Row, Col, BackTop } from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';

class PCNewsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            newItem: '',
        };
    };

    componentDidMount = () => {
        const options = {
            method: 'GET',
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, options)
            .then(response => response.json())
            .then(json => {
                this.setState({ newItem: json });
                document.title = this.state.newItem.title + " - React News | React 驱动的新闻平台";
            });
    };

    createMarkup = () => {
        return { __html: this.state.newItem.pagecontent };
    };

    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count="10" type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"></PCNewsImageBlock>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
                <BackTop></BackTop>
            </div>
        );
    };

}

export default PCNewsDetail;