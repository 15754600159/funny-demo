import React from 'react';
import Divider from 'antd/lib/divider';

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../images/logo.png');

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div id="mobileheader">
                <header>
                    <img src={logoImg} alt="logo"/>
                    <span>ReactNews</span>
                </header>
            </div>
        );
    };
}

export default MobileHeader;