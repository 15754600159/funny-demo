/*
 * @Author: 果实o 
 * @Date: 2018-03-07 11:15:09 
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-03-07 14:07:13
 */
/**
 * 问题:
 *  1. 写法1.1: 每次render都会执行一次bind函数，影响性能； 写法1.2: 每次render都会生成一个匿名函数，与上一次的不是同一个，增加内存消耗；
 *  2. 写法2.1： 每次render都会生成一个新对象{react: 'redux'}，增加内存消耗；
 * 
 * 性能优化:
 *  1. 注意render函数中的匿名对象和匿名函数的使用；
 *  2. 父组件向子组件传递尽可能少的属性；
 */

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
        };
        // 自定义属性
        this.name = {react: 'redux'};
    }
    handleClick = () => {
        this.setState({
            num: this.state.num++,
        })
    }
    handleClick1() {
        this.setState({
            num: this.state.num++,
        })
    }
    render() {
        return (
            <div>
                <h1>app</h1>
                {/* 推荐写法1 */}
                <button onClick={this.handleClick}>Btn1</button>
                {/* 不推荐写法1.1 */}
                <button onClick={this.handleClick1.bind(this)}>Btn2</button>
                {/* 不推荐写法1.2 */}
                <button onClick={() => this.handleClick1()}>Btn3</button>

                {/* 推荐写法2 */}
                <h2 name={this.name}></h2>
                {/* 不推荐写法2.1 */}
                <h2 name={{react: 'redux'}}></h2>
            </div>
        );
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById('root')
);
