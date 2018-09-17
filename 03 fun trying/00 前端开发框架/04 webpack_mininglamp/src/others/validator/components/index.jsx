import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import Collapse from './collapse'
import './scss/index.scss'

class Validator extends ReactComponentBase{
    constructor(props){
        super(props)
        this.state = {
            show: true,
            status: ''
        }
    }
    
    onShowChange = (show) => {
        this.setState({ show })
    }
    
    showAndHide = () => {
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }
    
    appendUserTimestamp = () => {
        this.props.setUserTimestamp(Date.now().toString())
    }
    
    render(){
        return (
            <div className="validatormain-others">
                <button type="button" onClick={this.showAndHide}>显示隐藏</button>
                <Collapse show={this.state.show} onShowChange={this.onShowChange} />
                <Validator.TabTitle />
                <Validator.TabContent />
                <div>
                    <button type="button" onClick={this.appendUserTimestamp}>在当前用户名的后面追加时间戳</button>
                    <div>{this.state.status}</div>
                </div>
            </div>
        )
    }
}

Validator.getDerivedStateFromProps = ({ timestamp }, state) => ({
    ...state,
    status: timestamp.length === 0 ? '' : `时间戳改变了,同时倒数第二位数是${timestamp.slice(-2, -1)}`
})

Validator.TabTitle = class TabTitle extends ReactComponentBase {
    constructor(props){
        super(props)
        
        this.state = {
            title: '验证标题'
        }
    }
    
    render(){
        return (
            <div>{this.state.title}</div>
        )
    }
}

Validator.TabContent = class TabContent extends ReactComponentBase {
    constructor(props){
        super(props)
        
        this.state = {
            content: '这里是一些内容'
        }
    }
    
    render(){
        return (
            <div>{this.state.content}</div>
        )
    }
}

export default Validator
