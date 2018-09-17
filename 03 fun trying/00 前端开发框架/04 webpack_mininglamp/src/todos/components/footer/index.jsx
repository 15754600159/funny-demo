/**
 * 功能： 页脚
 * 作者：安超
 * 日期： 2018/4/24
 */

import { React, PropTypes } from 'framework/Util'
import config from 'conf'
import classNames from 'classnames/bind'
import './scss/index.scss'

const { constant } = config

const Footer = function ({
    todos, todoFilter, clearCompletedTodo, setFilter
}) {
    function onRenderLi(filter, name) {
        if (filter === todoFilter) {
            return (
                <li>
                    <span
                        role="presentation"
                        className="selected"
                        onClick={() => setFilter(filter)}
                    >{name}
                    </span>
                </li>
            )
        }
        return (
            <li>
                <span
                    role="presentation"
                    onClick={() => setFilter(filter)}
                >{name}
                </span>
            </li>
        )
    }
    
    const nCompletedCount = todos.filter(oTodo => !oTodo.get('completed')).size
    const completedCls = classNames('pull-right', 'clear-completed', { hide: todos.size - nCompletedCount <= 0 })
    
    return (
        <footer className={classNames('footer-todos', { hide: todos.size === 0 })}>
            <div
                id="todo-count"
                className="pull-left"
            >
                <strong>{todos.size}</strong> items left
            </div>
            <ul className="filters list-unstyled list-inline">
                {onRenderLi(constant.VisibilityFilters.SHOW_ALL, 'All')}
                {onRenderLi(constant.VisibilityFilters.SHOW_ACTIVE, 'Active')}
                {onRenderLi(constant.VisibilityFilters.SHOW_COMPLETED, 'Completed')}
            </ul>
            <button
                type="button"
                className={completedCls}
                onClick={clearCompletedTodo}
            >Clear completed
            </button>
        </footer>
    )
}


Footer.propTypes = {
    todos: PropTypes.object.isRequired,
    todoFilter: PropTypes.string.isRequired,
    clearCompletedTodo: PropTypes.func.isRequired,
    setFilter: PropTypes.func.isRequired
}

export default Footer
