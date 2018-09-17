/**
 * Created by anchao on 2016/6/29.
 */
import { createAction, createActions } from 'framework'
import * as actionTypes from './actionTypes'

const actionCreator = createActions({
    getAllTodo: {
        url: '/api/getTodos',
        method: 'GET',
        hasLoading: true,
        actionType: actionTypes.GET_ALL_TODO
    },
    addTodo: {
        url: '/api/addTodo',
        method: 'POST',
        handleError: true,
        actionType: actionTypes.ADD_TODO
    },
    removeTodo: {
        url: '/api/removeTodo',
        method: 'DELETE',
        handleError: true,
        actionType: actionTypes.REMOVE_TODO
    },
    updateTodo: {
        url: '/api/updateTodo',
        method: 'PUT',
        handleError: true,
        actionType: actionTypes.UPDATE_TODO
    },
    checkedAllTodo: createAction(actionTypes.CHECKED_ALL_TODO),
    setFilter: createAction(actionTypes.SET_VISIBILITY_FILTER),
    clearCompletedTodo: createAction(actionTypes.CLEAR_COMPLETED_TODO)
})

export default actionCreator
