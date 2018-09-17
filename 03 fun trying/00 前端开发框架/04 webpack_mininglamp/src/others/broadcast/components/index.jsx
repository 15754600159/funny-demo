/**
 * 功能：广播模式
 * 作者：安超
 * 日期： 2018/3/19
 */
import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import './scss/index.scss'

class BroadCastView extends ReactComponentBase {
    state = {
        status: '时间戳为空'
    }
    
    appendUserTimestamp = () => {
        this.props.setUserInfoTimestamp(Date.now().toString())
    }
    
    render() {
        return (
            <div className="broadcast-main-others">
                <div>
                    <button type="button" onClick={this.appendUserTimestamp}>在当前用户名的后面追加时间戳</button>
                </div>
                <div>
                    当前状态：{this.state.status}
                </div>
            </div>
        )
    }
}

BroadCastView.getDerivedStateFromProps = ({ timestamp }) => ({
    status: timestamp.length === 0 ? '' : `时间戳改变了同时以${timestamp.slice(-1)}结尾`
})

export default BroadCastView
