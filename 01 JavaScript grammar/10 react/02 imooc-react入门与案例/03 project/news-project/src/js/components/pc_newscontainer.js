import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';

import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane;

const carousel_1 = require('../../images/carousel_1.jpg'),
    carousel_2 = require('../../images/carousel_2.jpg'),
    carousel_3 = require('../../images/carousel_3.jpg'),
    carousel_4 = require('../../images/carousel_4.jpg');

class PCNewsContainer extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true,
        };

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">

                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src={carousel_1} alt="img"/></div>
                                    <div><img src={carousel_2} alt="img"/></div>
                                    <div><img src={carousel_3} alt="img"/></div>
                                    <div><img src={carousel_4} alt="img"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count="6" type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"></PCNewsImageBlock>
                        </div>

                        <Tabs className="tabs_news">
                            <TabPane tab="头条" key="1">
                                <PCNewsBlock count="22" type="top" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count="22" type="guoji" width="100%" bordered="false"></PCNewsBlock>
                            </TabPane>
                        </Tabs>

                        <div>
                            <PCNewsImageBlock count="8" type="guonei" width="100%" cardTitle="国内新闻" imageWidth="132px"></PCNewsImageBlock>
                            <PCNewsImageBlock count="16" type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="132px"></PCNewsImageBlock>
                        </div>

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    };
}

export default PCNewsContainer;