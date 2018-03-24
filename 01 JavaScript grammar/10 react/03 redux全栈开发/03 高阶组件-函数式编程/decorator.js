import React from 'react';

// 属性代理
function WrapperHello(Comp) {
    class WrapComp extends React.Component{
        render() {
            return (
                <div>
                    <p>这是HOC高阶组件特有的元素</p>
                    <Comp {...this.props}></Comp>
                </div>
            );
        }
    }
    return WrapComp;
}

// 反向继承
function WrapperHello1(Comp) {
    class WrapComp extends Comp{
        componentDidMount() {
            console.log('高阶组件新增的声明周期');
        }
        render() {
            return (
                <div>
                    <Comp {...this.props}></Comp>
                </div>
            );
        }
    }
    return WrapComp;
}

@WrapperHello
class Hello extends React.Component{
    render() {
        return <h2>hello, react decorator!</h2>;
    }
}