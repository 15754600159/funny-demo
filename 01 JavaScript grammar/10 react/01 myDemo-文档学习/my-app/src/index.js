import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// 1. hello world
    // ReactDOM.render(
    //     <h1>hello, world!</h1>,
    //     document.getElementById('myTest'),
    // );

// 2. 元素渲染
    // 在实际生产开发中, 大多数React应用只会调用一次 ReactDOM.render()
    // 我们用React 开发应用时一般只会定义一个根节点。
    // function tick() {
    //     const element = (
    //         <div>
    //             <h1>hello, world!</h1>
    //             <h2>It is {new Date().toLocaleTimeString()}.</h2>
    //         </div>
    //     );
    //     ReactDOM.render(
    //         element,
    //         document.getElementById('myTest'),
    //     );
    // }

    // setInterval(tick, 1000);

// 3. 组件 & Props
    // // Props的只读性: 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
    // // 一般函数声明一个组件
    // function Welcome(props) {
    //     return <h1>hello, {props.name}</h1>;
    // }
    // // 类声明一个组件
    // class WelcomeClass extends React.Component {
    //     render() {
    //         return <h1>Hello, {this.props.name}</h1>;
    //     }
    // }
    // // <Welcome />表示一个组件 (组件中的组件)
    // // <App1 />表示一个组件
    // function App1() { 
    //     return (
    //         <div>
    //             <Welcome name="Sara" /> 
    //             <Welcome name="Cahal" />
    //             <WelcomeClass name="Edite" />
    //         </div>
    //     );
    // }
    // ReactDOM.render(
    //     <App1 />,
    //     document.getElementById('myTest'),
    // );

// 4. State & 生命周期
    // // 数据自顶向下流动: state -> props -> state
    // class Clock extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             date: new Date(),
    //         }
    //     }

    //     componentDidMount() {
    //         this.timerID = setInterval(
    //             () => this.tick(),
    //             1000
    //         );
    //     }

    //     componentWillUnmount() {
    //         clearInterval(this.timerID);
    //     }

    //     tick() {
    //         this.setState({
    //             date: new Date(),
    //         });
    //     }

    //     render() {
    //         return (
    //             <div>
    //                 <h1>hello, world!</h1>
    //                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    //             </div>
    //         )
    //     }

    // }

    // ReactDOM.render(
    //     <Clock />,
    //     document.getElementById('myTest'),
    // )

// 5. 事件处理
    // class Toggle extends React.Component{
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             flag: true,
    //         }
    //     }

    //     handleClick = (e, id) => { // 1. 注意是箭头函数，用来绑定this
    //         // console.log('this: ', this);
    //         this.setState(prevState => ({
    //             flag: !prevState.flag,
    //         }))
    //     }

    //     render() {
    //         // 2. 注意onclick之后函数用{}包裹
    //         // 3. 事件的参数传递
    //         // 4. 条件渲染 ?:
    //         return ( 
    //             <button onClick={(e) => this.handleClick(e, 'id')}> 
    //                 {this.state.flag ? 'ON' : 'OFF'} 
    //             </button>
    //         );
    //     }

    // } 

    // ReactDOM.render(
    //     <Toggle />,
    //     document.getElementById('myTest')
    // )

// 6. 列表 & Keys
    // Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化
    // 一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串
    // 当元素没有确定的id时，你可以使用他的序列号索引index作为key(渲染变得很慢)
    // 元素的key只有在它和它的兄弟节点对比时才有意义
    // function NumberList(props) {
    //     const numbers = props.numbers;
    //     const listItems = numbers.map((number) => 
    //         <li key={number.toString()}>
    //             {number}
    //         </li>
    //     );
    //     return (
    //         <ul>{listItems}</ul>
    //     );
    // }

    // const numbers = [1, 2, 3, 4, 5];
    // ReactDOM.render(
    //     <NumberList numbers={numbers} />,
    //     document.getElementById('myTest')
    // );

// 7. 表单
    // class NameForm extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {value: ''};
    //     }

    //     handleChange = (event) => {
    //         this.setState({value: event.target.value.toUpperCase()});
    //     }

    //     handleSubmit = (event) => {
    //         alert('A name was submitted: ' + this.state.value);
    //     }

    //     render() {
    //         return (
    //             <form onSubmit={this.handleSubmit}>
    //                 <label>
    //                     Name: 
    //                     <input type="text" value={this.state.value} onChange={this.handleChange} />
    //                 </label>
    //                 <input type="submit" value="submit" />
    //             </form>
    //         );
    //     }

    // }

    // ReactDOM.render(
    //     <NameForm />,
    //     document.getElementById('myTest')
    // )

// 8. 状态提升
    // function toCelsius(fahrenheit) {
    //     return (fahrenheit - 32) * 5 / 9;
    // }

    // function toFahrenheit(celsius) {
    //     return (celsius * 9 / 5) + 32;
    // }

    // function tryConvert(temperature, convert) {
    //     const input = parseFloat(temperature);
    //     if (Number.isNaN(input)) {
    //         return '';
    //     }
    //     const output = convert(input);
    //     const rounded = Math.round(output * 1000) / 1000;
    //     return rounded.toString();
    // }

    // class BoilingVerdict extends React.Component {
    //     constructor(props) {
    //         super(props);
    //     }

    //     render() {
    //         return this.props.celsius >= 100 ? <p>水会烧开</p> : <p>水不会烧开</p>;
    //     }
    // }

    // class TemperatureInput extends React.Component {
    //     constructor(props) {
    //         super(props);
    //     }

    //     handleChange = (event) => {
    //         this.props.onTempratureChange(event.target.value);
    //     }

    //     render() {
    //         const temperature = this.props.temperature,
    //             scale = this.props.scale,
    //             scaleNames = {
    //                 c: 'Celsius',
    //                 f: 'Fahrenheit'
    //               };
    //         return (
    //             <fieldset>
    //                 <legend>在{scaleNames[scale]}: 中输入温度值</legend>
    //                 <input value={temperature} onChange={this.handleChange} />
    //             </fieldset>
    //         );
    //     }
    // }

    // class Calculator extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {temperature: '', scale: 'c'};
    //     }

    //     handleCelsiusChange = (temperature) => {
    //         this.setState({scale: 'c', temperature});
    //     }

    //     handleFahrenheitChange = (temperature) => {
    //         this.setState({scale: 'f', temperature});
    //     }

    //     render() {
    //         const scale = this.state.scale,
    //             temperature = this.state.temperature,
    //             celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature,
    //             fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    //         return (
    //             <div>
    //                 <TemperatureInput scale="c" temperature={celsius} onTempratureChange={this.handleCelsiusChange} />
    //                 <TemperatureInput scale="f" temperature={fahrenheit} onTempratureChange={this.handleFahrenheitChange} />
    //                 <BoilingVerdict celsius={parseFloat(celsius)} />
    //             </div>
    //         );
    //     }
    // }

    // ReactDOM.render(
    //     <Calculator />,
    //     document.getElementById('myTest')
    // )


// ----------------------------------------------------------------------------------------------------------

// 1. 内联样式
    const appClass = require('./App.css');
    class Header extends React.Component {
        constructor() {
            super();
            this.state = {
                miniHeader: false,
            };
        };
        switchHeader = () => {
            this.setState({
                miniHeader: !this.state.miniHeader,
            })
        };
        render() {
            console.log(appClass)
            const componentStyle = {
                // 内联样式中的表达式
                header: {
                    backgroundColor: '#333333',
                    color: '#ffffff',
                    paddingTop: (this.state.miniHeader) ? '3px' : '15px',
                    paddingBottom: (this.state.miniHeader) ? '3px' : '15px',
                }
            };
            return (
                <header style={componentStyle.header} onClick={this.switchHeader}>
                    <h1>这里是头部</h1>
                </header>
            )
        };
    }
    ReactDOM.render(
        <Header />,
        document.getElementById('myTest')
    )






registerServiceWorker();
