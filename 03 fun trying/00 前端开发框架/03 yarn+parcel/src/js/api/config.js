import axios from 'axios';
import { Spin } from 'antd';

import Loading from '../component/loading/loading';

// 拦截请求
axios.interceptors.request.use((config) => {
    Loading.show();
    return config;
})

// 拦截响应
axios.interceptors.response.use((config) => {
    Loading.hide();
    return config;
})