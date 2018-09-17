/**
 * 功能：拖拽功能实现
 * 作者：安超
 * 日期：2018/7/6
 */

import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Box from './box'
import './scss/index.scss'

const dragSecTarget = {
    drop(props, monitor, component){
        if (!component) return

        const item = monitor.getItem()
        const delta = monitor.getDifferenceFromInitialOffset()
        const top = Math.round(item.top + delta.y)
        const left = Math.round(item.left + delta.x)

        component.changePosition(top, left)
    }
}

@DragDropContext(HTML5Backend)
@DropTarget('BOX', dragSecTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))

class DragView extends ReactComponentBase{
    constructor(props){
        super(props)

        this.state = {
            top: 0,
            left: 0
        }
    }

    changePosition = (top, left) => {
        this.setState({
            top,
            left
        })
    }

    render(){
        const { top, left } = this.state
        const { connectDropTarget } = this.props
        const HTML = (
            <div className="dragging-sec-others">
                <Box
                    top={top}
                    left={left}
                />
            </div>
        )

        return connectDropTarget
            && connectDropTarget(HTML)
    }
}

export default DragView
