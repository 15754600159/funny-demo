/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:34 
 * @Last Modified by:   果实o 
 * @Last Modified time: 2018-03-07 11:15:34 
 */
/**
 * 核心思想：
 *  1. Provider 将store传入全局context
 *  2. connect 从context将store的功能取出(store.getState用于获取state传入组件，store.dispatch用于包装actionCreator)，传入当前组件
 */

import React from 'react';
import PropTypes from 'prop-types';

// connect 负责链接组件，给到redux里的数据放到组件的属性里
// 1. 负责接受一个组件，把state里的一些数据放进去，返回一个组件
// 2. 数据变化的时候，能够通知组件
export const connect = (mapStateToProps = state=>state, mapDispatchToProps = {}) => (WarpComponent) => {
    return class ConnectComponent extends React.Component{
        static contextType = {
            store: PropTypes.object,
        }
        constructor(props, context) {
            super(props, context);
            this.state = {
                props: {}
            }
        }
        componentDidMount() {
            const { store } = this.context;
            store.subscribe(() => this.update); // 数据改变，则刷新组件
            this.update();
        }
        update = () => {
            const { store } = this.context,
                stateProps = mapStateToProps(store.getState()),
                dispatchProps = this.bindActionCreators(mapDispatchToProps, store.dispatch);
            
            this.setState({
                props: { ...this.state.props, ...stateProps, ...dispatchProps }
            })
        }
        // 本来属于 redux 的函数
        bindActionCreators = (creators, dispatch) => {
            let bound = {};
            Object.keys(creators).forEach(v => {
                let creator = creators[v];
                bound[v] = (...args) => dispatch(creator(...args));
            });
            return bound;
        }
        render() {
            return <WarpComponent {...this.state.props}></WarpComponent>
        }
    }
}

// Provider 把store放到context里，所有的子元素都可以直接获取store
export class Provider extends React.Component{
    static childContextType = {
        store: PropTypes.object,
    }
    getChildContext() {
        return {store: this.store};
    }
    constructor(props, context) {
        super(props);
        this.store = props.store;  // 将组件上props中传入的store对象放到context全局中
    }
    render() {
        return this.props.children; // 什么也不做，只是渲染其中的子元素
    }
}