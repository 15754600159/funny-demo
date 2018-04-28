// 合并所有reducer
import { combineReducers } from 'redux';

import { loading } from './js/redux/loading.redux';

export default combineReducers({ loading });

