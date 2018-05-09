
// 引入axios库，vue中用于异步数据请求库，类似于ajax
import axios from 'axios';

let base = '';

// 这里的做法是把所有的api获取都封装成了一个返回promise的方法，后面调用这个方法，就可以返回一个promise
// 还有另一种做法是封装一个通用的做法，在每个调用的地方，通过传入api地址的方式，调用通用方法获取一个promise

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };