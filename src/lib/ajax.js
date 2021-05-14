import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import md5 from "@/lib/md5";
// import qs from "qs";
// import cache from "./cache";
// const axios2 = axios;
Vue.use(VueAxios, axios);
// Vue.prototype.axios2 = axios2;
axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.prototype.$apiStatus = {
    errorNum: 0,
    showError: false
}
Vue.prototype.apiRequestList = {};

function errorMsg(msg, options = {}) {
    // console.log('showError--', Vue.prototype.$apiStatus.showError)
    if (msg && !options.hideErrorMsg) {
        if (!Vue.prototype.$apiStatus.showError) {
            Vue.prototype.$message.error(msg).then(() => {
                Vue.prototype.$apiStatus.showError = false;
            })
        }
        Vue.prototype.$apiStatus.showError = true;
    }
}

// 请求拦截
axios.interceptors.request.use(
    config => {
        // console.log(config)
        if (typeof config.data === "string") {
            config.data = JSON.parse(config.data);
        } else {
            // config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
            // config.data = qs.stringify(config.data);
        }
        const sessionid = localStorage.getItem('sessionid') || '';
        if (sessionid) {
            config.headers["sessionid"] = sessionid;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// 响应拦截
axios.interceptors.response.use(
    response => {
        // if(response.data.retCode === "000000"){
        //     return response;
        // }else{
        //
        // }
        if (response.config.url.indexOf('login') != -1) {
            sessionStorage.setItem('sessionid', response.headers.sessionid)
        }
        const sessionid = response.headers.sessionid;
        if (sessionid) {
            localStorage.setItem('sessionid', sessionid)
        }
        // console.log('response', response)
        return Promise.resolve(response);
    },
    error => {
        return Promise.reject(error);
    }
);
/**
 *
 * @param {string} url
 * @param {string} method
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const ajax = (url, method, data = {}, options = {}) => {
    if (options.retry !== 0) {
        options.retry = options.retry || 0;// 默认重复请求次数
    }
    options.delay = options.delay || 5000;// 默认重新请求时间;
    let md5Str;
    if (typeof data === "object") {
        md5Str = md5(JSON.stringify(data))
    } else {
        md5Str = md5(data)
    }
    // console.log(md5Str)
    const urlKey = url.replace(/\//g, '_') + '_data_' + md5Str;
    // console.log(urlKey);
    if (!Vue.prototype.apiRequestList[urlKey]) {
        // 写入队列
        Vue.prototype.apiRequestList[urlKey] = {
            url: url,
            timer: null,
            retry: options.retry
        };
    }

    const request = () => {
        return new Promise((resolve, reject) => {
            const userInfoStr = localStorage.getItem('userInfo') || "{}";
            const headers = {}
            try {
                const userInfo = JSON.parse(userInfoStr) || {};
                if (userInfo.name && userInfo.belong) {
                    headers["TrgServiceId"] = url;
                    headers["TxDeptCode"] = userInfo.belong[0].orgId;
                    headers["TxUserId"] = userInfo.name;
                }
            } catch (e) {
                console.log(e)
            }
            if (options.type === 'file') {
                // headers['Content-Type'] = 'multipart/form-data'
                headers['Content-Type'] = 'raw'
            }
            const requestParam = {
                method: method,
                url: url,
                timeout: 0,
                headers: headers
            };
            if (method === 'GET') {
                requestParam.params = data;
            } else {
                requestParam.data = data;
            }
            axios(requestParam).then(res => {
                // 请求JSON文件直接返回
                if (url.indexOf('.json') !== -1) {
                    resolve(res.data);
                } else {
                    if (res.data.errorCode === "0" || res.data.errorCode === 0 || res.data.returnCode === '0') {
                        resolve(res.data);
                    } else if (res.data.Form) {
                        if (res.data.Form.length > 0) {
                            const data = res.data.Form[0].FormData || {};
                            if (Object.keys(data).length > 0 && !data.RetMsgCode && !data.RetMessage) {
                                resolve(data);
                            } else {
                                errorMsg(data.RetMessage || "unknown error")
                                reject(data)
                            }
                        } else {
                            errorMsg(res.data.RetMessage || "unknown error")
                            reject(res.data)
                        }
                    } else if (res.data.returnCode) {
                        reject(res.data);
                    } else {
                        errorMsg(res.data.errorMsg || "unknown error")
                        reject(res.data)
                    }
                }
            }).catch(err => {
                console.log("--------------fail-----------------", err);
                console.log(err.response);
                err.response = err.response || {};
                const msg = err.response.statusText || err.errorMsg || err.returnMsg || 'unknown error';
                if (err.response.status === 403 || err.response.status === 400) {
                    localStorage.clear();
                    window.location.href = '/login'
                    // Vue.prototype.$router.push({ path: 'Login' });
                }
                // if (status === 404) {
                //
                // } else if (status === 503) {
                //
                // }
                console.log('msg', msg)
                errorMsg(msg)
                reject(err.response || err);
            })
        })
    }
    if (Vue.prototype.apiRequestList[urlKey].retry) {
        let times = Vue.prototype.apiRequestList[urlKey].retry;
        return new Promise((resolve, reject) => {
            const attempt = () => {
                request().then(resolve).catch(
                    err => {
                        Vue.prototype.apiRequestList[urlKey] = Vue.prototype.apiRequestList[urlKey] || {};
                        // console.log(Vue.prototype.apiRequestList);
                        if (times === 0 || Vue.prototype.apiRequestList[urlKey].retry === 0) {
                            console.log('error reject---', err);
                            reject(err);
                        } else {
                            times--;
                            if (Vue.prototype.apiRequestList[urlKey]) {
                                Vue.prototype.apiRequestList[urlKey].timer = setTimeout(function() {
                                    attempt();
                                }, options.delay);
                            }
                        }
                    });
            };
            attempt();
        });
        // return request();
    } else {
        return request();
    }
}
export default {
    get: (url, data, options) => {
        return ajax(url, "GET", data, options);
    },
    post: (url, data, options) => {
        let param;
        if (data?.isOldBody) {
            param = {
                Form: [
                    {
                        FormHead: {
                            FormID: data.FormID
                        },
                        FormData: data.body || {}
                    }
                ]
            }
        } else {
            param = data;
        }
        return ajax(url, "POST", param, options);
    }
}
