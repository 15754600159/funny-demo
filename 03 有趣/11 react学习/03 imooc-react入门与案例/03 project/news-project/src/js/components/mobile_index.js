import React from 'react';
import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;

import MobileHeader from './mobile_header';
import MobileList from './mobile_list';
import MobileFooter from './mobile_footer';

const carousel_1 = require('../../images/carousel_1.jpg'),
    carousel_2 = require('../../images/carousel_2.jpg'),
    carousel_3 = require('../../images/carousel_3.jpg'),
    carousel_4 = require('../../images/carousel_4.jpg');

class PCIndex extends React.Component {
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
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src={carousel_1} alt="img"/></div>
                                <div><img src={carousel_2} alt="img"/></div>
                                <div><img src={carousel_3} alt="img"/></div>
                                <div><img src={carousel_4} alt="img"/></div>
                            </Carousel>
                        </div>
                        <MobileList count="20" type="top"></MobileList>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileList count="20" type="shehui"></MobileList>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileList count="20" type="guonei"></MobileList>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileList count="20" type="guoji"></MobileList>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileList count="20" type="yule"></MobileList>
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    };
}

export default PCIndex;