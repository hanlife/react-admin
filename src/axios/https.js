import axios from 'axios';
import qs from "qs";
import BaseLayout from './baseLayout'
import { message } from 'antd';

// 创建axios默认请求
axios.defaults.baseURL = "/";
// 配置超时时间
axios.defaults.timeout = 100000;
// 配置请求拦截
axios.interceptors.request.use(config => {
  config.setHeaders([
    // 在这里设置请求头与携带token信息

  ]);
  return config;
});
// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    console.log(response);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

var Api = {
    requestNum: 0
}
/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
Api.get = function(url, params, loading=false) {
  return new Promise((resolve, reject) => {
    // 请求数量加一
    Api.requestNum++;
    setTimeout(() => {
        if (Api.requestNum > 0) {
           if(loading) BaseLayout.openSpin();
        }
    }, 1000);
    
    axios
      .get(url, params)
      .then(res => {
        // 请求数量减一
        Api.requestNum--;
        if (Api.requestNum <= 0) {
            if(loading) BaseLayout.closeSpin()
        }

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
Api.post = function(url, data, loading=false) {
  return new Promise((resolve, reject) => {
    qs.stringify(data)

    Api.requestNum++;
    setTimeout(() => {
        if (Api.requestNum > 0) {
           if(loading) BaseLayout.openSpin();
        }
    }, 1000);
    
    axios
      .post(url, data)
      .then(res => {
        console.log(res);
        
        // 请求数量减一
        Api.requestNum--;
        if (Api.requestNum <= 0) {
            if(loading) BaseLayout.closeSpin()
        }

        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default Api;


