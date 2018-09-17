/**
 * 功能：可视todo列表
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'framework/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import Todo from './Todo'
import './scss/index.scss'

class VisibleTodoList extends ReactComponentBase {
    componentDidMount() {
        this.props.getAllTodo()
    }
    
    render() {
        const {
            todos,
            checkedAllTodo, removeTodo, updateTodo
        } = this.props
        const bCheckedAll = todos.filter(item => item.get('completed')).size === todos.size
        
        return (
            <section className="main-todos">
                <input
                    className="toggle-all"
                    type="checkbox"
                    checked={bCheckedAll}
                    onChange={() => checkedAllTodo(!bCheckedAll)}
                />
                <ul className="todo-list list-unstyled">
                    {
                        todos.size === 0 && <li><div className="view text-center">没有数据！</div></li>
                    }
                    {
                        todos.size > 0 && todos.map(oTodo => (
                            <Todo
                                key={oTodo.get('id')}
                                data={oTodo}
                                onUpdateTodo={updateTodo}
                                removeTodo={removeTodo}
                            />
                        ))
                    }
                </ul>
            </section>
        )
    }
}

VisibleTodoList.propTypes = {
    todos: PropTypes.object.isRequired,
    getAllTodo: PropTypes.func.isRequired,
    checkedAllTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired
}

export default VisibleTodoList
