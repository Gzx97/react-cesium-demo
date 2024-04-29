import axios, { AxiosResponse } from 'axios';
import { Exception } from '../ex/exception';
import { getTenantUserToken } from '../util/storage.utils';
import { message } from 'antd';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

axiosInstance.interceptors.request.use((request) => {
    request.headers = Object.assign({}, request.headers);
    let token = getTenantUserToken();
    if (token) {
        request.headers['Authorization'] = 'Bearer ' + token;
    }
    return request;
});

const onFulfilled = (response: AxiosResponse) => {
    if (response.request.responseType === 'blob') {
        return response;
    }
    return response.data;
};

const onRejected = async (error: any) => {
    if (!error || !error.response) {
        throw new Exception(500, '服务器异常，请稍后重试');
    }

    let status = error.response.status;
    if (status === 401 || status === 403) {
        message.error('没有权限，请先登录');
        window.location.href = `/#/sign-in`;
    } else if (status === 500) {
        throw new Exception(500, '服务器繁忙，请稍后重试');
    } else if (status === 504) {
        throw new Exception(504, '请求超时，服务器错误');
    } else if (status === 400) {
        throw new Exception(400, '请求参数错误');
    } else {
        throw (
            error.response.data || new Exception(status, '系统异常，请稍后重试')
        );
    }
};

axiosInstance.interceptors.response.use(onFulfilled, onRejected);

export default axiosInstance;
