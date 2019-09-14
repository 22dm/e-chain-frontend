/**
 * ajax请求配置
 */
import axios from 'axios'
// import router from '../router/index.js'
// import store from '../vuex/store'
// import * as types from '../vuex/types'


// axios默认配置
axios.defaults.timeout = 5000; // 超时时间
axios.defaults.baseURL = 'http://172.19.180.255:3000/'; // 默认地址

//整理数据
axios.defaults.transformRequest = function(data) {
    data = JSON.stringify(data);
    return data;
};

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
    config => {
        //config.data = JSON.stringify(config.data);
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        // if (cookie.get("token")) {
        //   //用户每次操作，都将cookie设置成2小时
        //   cookie.set("token",cookie.get("token") ,1/12);
        //   cookie.set("name",cookie.get("name") ,1/12);
        //   config.headers.token = cookie.get("token");
        //   config.headers.name= cookie.get("name");

        if (localStorage.Authorization) {
            config.headers.Authorization = 'Bearer ' + localStorage.token
        }
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           store.commit(types.LOGOUT);
//           router.currentRoute.path !== 'login' &&
//           router.replace({
//             path: 'login',
//             query: { redirect: router.currentRoute.path }
//           })
//       }
//     }
//     console.log(JSON.stringify(error));
//     return Promise.reject(error.response)   // 返回接口返回的错误信息
//   });

const http = {

    /** get 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    /** get 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    get: function(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                    params: params
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    /** post 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    post: function(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

};
export default http;
//
// export default axios;