import React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifShow: false,
        };

        // bind func
        
    };

    // static show() {
    //     this.setState({
    //         ifShow: true,
    //     });
    // };

    // static hide() {
    //     this.setState({
    //         ifShow: false,
    //     });
    // };

    render() {
        return (
            <div className="page-loading" style={{display: this.state.ifShow ? "block" : "none"}}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    };
};

export default Loading;

