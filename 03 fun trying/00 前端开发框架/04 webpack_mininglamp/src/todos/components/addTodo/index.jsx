/**
 * 功能：增加todo组件
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'framework/Util'
import dialog from 'dialog'
import './scss/index.scss'

function AddTodo({ addTodo }) {
    function addTodoEv(e) {
        if (e.which === 13) {
            const sTxt = e.currentTarget.value.trim()
            if (sTxt.length > 0) {
                addTodo({
                    data: { id: Date.now(), text: sTxt, completed: false }
                })
                e.currentTarget.value = ''
            } else {
                dialog.alert({
                    infoType: 'error',
                    content: <div>内容不能为空</div>
                })
            }
        }
    }
    
    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="newtodo-todos"
                placeholder="What needs to be done?"
                onKeyDown={addTodoEv}
            />
        </header>
    )
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo
