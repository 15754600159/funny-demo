/**
 * Created by anchao on 2016/6/30.
 */

import { connect, createSelector } from 'framework/Util'
import actionCreator from '../../actions/actionCreator'
import Footer from '../../components/footer'
import Utils from '../../utils'

const todosSelector = state => state.todos
const todosByFilterSelector = createSelector([todosSelector], oTodos => ({
    todos: Utils.selectByFilter(oTodos.todoList.list, oTodos.todoFilter),
    todoFilter: oTodos.todoFilter
}))

export default connect(todosByFilterSelector, actionCreator)(Footer)
