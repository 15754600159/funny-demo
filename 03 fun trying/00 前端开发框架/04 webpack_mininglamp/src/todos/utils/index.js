/**
 * 功能： 模块公共方法
 * 作者：安超
 * 日期：2018/7/27
 */

import config from 'conf'

const Utils = {
    selectByFilter: (aTodos, sFilter) => {
        switch (sFilter) {
            case config.constant.VisibilityFilters.SHOW_ALL:
                return aTodos
            case config.constant.VisibilityFilters.SHOW_COMPLETED:
                return aTodos.filter(oTodo => oTodo.get('completed'))
            case config.constant.VisibilityFilters.SHOW_ACTIVE:
                return aTodos.filter(oTodo => !oTodo.get('completed'))
            default:
                return aTodos
        }
    }
}

export default Utils
