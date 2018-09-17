/**
 * 功能：可拖拽的块
 * 作者：安超
 * 日期：2018/7/6
 */

import { React } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import { DragSource } from 'react-dnd'
import './scss/box.scss'

const dragSecTarget = {
    beginDrag({ top, left }){
        return {
            top,
            left
        }
    }
}

@DragSource('BOX', dragSecTarget, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))

class Box extends ReactComponentBase{
    render(){
        const {
            top, left, connectDragSource, isDragging 
        } = this.props
        if (isDragging) return null
        return connectDragSource
            && connectDragSource(<div className="box-drag-others" style={{ top, left }} />)
    }
}

export default Box
