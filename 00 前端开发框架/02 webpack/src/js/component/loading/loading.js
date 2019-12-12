import React from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';

import store from '../../../index';
import { showLoading, hideLoading } from '../../redux/loading.redux';

@connect(state => state.loading)
class Loading extends React.Component {
    static show() {
        store.dispatch(showLoading());
    }

    static hide() {
        store.dispatch(hideLoading());
    }

    render() {
        return (
            <div className="page-loading" style={{ display: this.props.ifShow ? 'block' : 'none' }}>
                <Spin size="large" tip="加载中..." />
            </div>
        );
    }
}

export default Loading;

