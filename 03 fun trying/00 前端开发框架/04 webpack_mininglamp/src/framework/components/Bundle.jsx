/**
 * 功能：动态加载组件
 * 作者：安超
 * 日期：2018/7/11
 */

import React from 'react';
import PropTypes from 'prop-types';

class Bundle extends React.Component {
    state = {
        // short for "module" but that's a keyword in js, so "mod"
        mod: null
    }

    componentWillMount() {
        // 加载初始状态
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const { load } = this.props
        if (nextProps.load !== load) {
            this.load(nextProps)
        }
    }

    load(props) {
        // 重置状态
        this.setState({
            mod: null
        });
        // 传入组件的组件
        props.load((mod) => {
            this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        // if state mode not undefined,The container will render children
        const { mod } = this.state
        const { children } = this.props
        return mod ? children(mod) : null
    }
}

Bundle.propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
};

export default Bundle
