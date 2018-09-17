/**
 * 功能：所有动作配置
 * 作者：安超
 * 日期： 2018/3/19
 */
import { createAction, createActions } from 'framework'
import * as actionTypesPublic from '@/actions/actionTypes'

const actionCreator = createActions({
    setUserTimestamp: createAction(actionTypesPublic.SET_USERTIMESTAMP_PUBLIC)
})

export default actionCreator
