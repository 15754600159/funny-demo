/**
 * 功能：收缩组件
 * 作者：安超
 * 日期：2018/8/8
 */
import { React, PropTypes, noop } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import classNames from 'classnames'

class Collapse extends ReactComponentBase{
    constructor(props){
        super(props)
        const { show } = props
        this.state = {
            show
        }
    }
    
    onShowChange = () => {
        this.setState((prevState) => {
            const newShow = !prevState.show
            this.props.onShowChange(newShow)
            return {
                show: newShow
            }
        })
    }
    
    render(){
        return (
            <div style={{ border: '1px solid red', width: 300, height: 300 }} key={this.props.show}>
                <div className={classNames({ hide: !this.state.show })} style={{ border: '1px solid red', width: 100, height: 100 }}>内容</div>
                <button type="button" onClick={this.onShowChange}>显示隐藏</button>
            </div>
        )
    }
}

Collapse.getDerivedStateFromProps = (props) => {
    const { show } = props

    return {
        show
    }
}

Collapse.defaultProps = {
    show: true,
    onShowChange: noop
}

Collapse.propTypes = {
    show: PropTypes.bool
}

export default Collapse
