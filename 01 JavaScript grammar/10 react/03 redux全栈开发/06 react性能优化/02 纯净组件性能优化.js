/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:09 
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-03-08 10:53:11
 */
/**
 * 纯净组件: 只接受props传递的变量，不含有自己的state；
 * 
 * 问题:
 *  1. 父组件状态改变了，自己重新render，子组件也会重新render(不管子组件的props有没有变化)；
 * 
 * 性能优化:
 *  方法1：子组件利用shouldComponentUpdate定制化刷新；
 *  方法2：子组件继承自PureComponent；
 *  方法3：利用immutable.js的新的数据结构创建state，降低状态比较的复杂度；
 * 
 *  其他：
 *  1. reselect对数据做缓存；
 *  2. 谨慎选择key：渲染数组元素的key用来判断dom操作是新增、删除、移动等，毕竟新增和移动的性能相差挺大；
 */

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            title: 'title'
        };
        // 自定义属性
        this.name = {react: 'redux'};
    }
    handleClick = () => {
        this.setState({
            num: this.state.num++,
        })
    }
    render() {
        return (
            <div>
                <h1>app,{this.state.num}, {this.state.title}</h1>
                <Child1 title={this.state.title}></Child1>
                <Child2 title={this.state.title}></Child2>
                <button onClick={this.handleClick}>Btn1</button>
            </div>
        );
    }
}

// 方法1
class Child1 extends React.Component{
    shouldComponentUpdate(nextProps, nextState) {
        // 如果title没变，就没必要重新render子组件
        if (nextProps.title === this.props.title) {
            return false;
        };
        return true;
    }
    render() {
        return (
            <div>{this.props.title}</div>
        );
    }
}

// 方法2
class Child2 extends React.PureComponent{
    render() {
        return (
            <div>{this.props.title}</div>
        );
    }
}



ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);
