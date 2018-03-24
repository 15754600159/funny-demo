import React from 'react';
import { connect } from 'react-redux';
import { addGUN, addGUNAsync } from './index.redux';

const mapStatetoProps = (state) => {
    return {num: state};
}
const actionCreators = { addGUN, addGUNAsync };

@connect(
    mapStatetoProps, // 你要什么属性放到props里
    actionCreators // 你要什么方法放到props里
)
class App extends React.Component{
    componentDidMount = () => {
        // this.props.getData();
    }

    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGUN}>申请武器</button>
                <button onClick={this.props.addGUNAsync}>拖两天再给</button>
            </div>
        );
    }
}

export default App;