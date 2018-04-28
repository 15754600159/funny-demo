import React from 'react';
import { Row, Col, BackTop } from 'antd';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';

class MobileNewsDetail extends React.Component {
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
            <div id="mobileDetailsContainer">
                <MobileHeader></MobileHeader>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr />
                            <CommonComments uniquekey={this.props.match.params.uniquekey}></CommonComments>
                        </Col>
                    </Row>
                    <MobileFooter></MobileFooter>
                    <BackTop></BackTop>
                </div>
            </div>
        );
    };

}

export default MobileNewsDetail;