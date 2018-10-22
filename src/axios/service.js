import Api from './https'
import {message} from 'antd';
import {Storage} from '../uitl';

const Service = {};

/**
 * 重写一个service自用消息框，同一时间只能弹出一条消息
 * @type {{error}}
 */
Service.message = (() => {
    // 报错数量
    let num = 0;

    return {
        error: (msg, time, callBack) => {
            console.log(num)
            if (num === 0) {
                message.error(msg, time, () => {
                    if (!!callBack) callBack();
                    if (num > 0) num--;
                });
                num++;
            }
        }
    };
})();

/**
 * 处理公共错误
 */
Service.handleCommonError = function (res) {
    let data = res.data;
    return new Promise((resolve, reject) => {
        if (parseInt(data.code) === 1000) {
           resolve(data);
        } else if (parseInt(data.code) === -8) {
            Service.message.error("登陆过期，请重新登录！", 2, () => {
                window.location.href = window.location.host + '/login'
            });
        } else {
            reject(data.message);
            Service.message.error(data.message, 2);
        }
    }).catch(function(reason) {
        console.log('catch:', reason);
    })
};

// 本地用户信息对象
let localUserInfo = null;

/**
 * 获取本地用户信息
 * @returns {*}
 */
Service.getLocalUserInfo = function () {
    if (localUserInfo !== null) {
        return localUserInfo;
    }
    // 本地用户信息
    let userInfo = Storage.get('USER_INFO');
    if (userInfo === null) {
        Service.message.error('您还没有登录，请先登录！');
        window.location.href = window.location.host + '/login'
    }
    return localUserInfo = userInfo;
};

/**
 * 设置本地用户信息
 * @param params
 */
Service.setLocalUserInfo = function (params) {
    // 设置本地用户信息
    Storage.set('USER_INFO', params);
    // 重置内存里的用户信息
    localUserInfo = null;
};

/**
 * 获取本地token信息
 * @returns {null}
 */
Service.getLocalToken = function () {
    // 用户信息
    let userInfo = this.getLocalUserInfo();
    if (userInfo === null) {
        return null;
    }
    return userInfo['token'] || null;
};

// 登录
Service.getLogin = function(params){
    let request = {};
    // 帐号
    request['username'] = params['userName'] || '';
    // 密码
    request['password'] = params['password'] || '';
    console.log(request)
    if (request['username'] === '') {
        Service.message.error('[帐号]不能为空！');
        return null;
    }
    if (request['password'] === '') {
        Service.message.error('[密码]不能为空！');
        return null;
    }
    
    return Api.post('/test', request).then(Service.handleCommonError);
}

// 测试加载
Service.testLoad = async function(load){
    return Api.get('/home', {}, load).then(Service.handleCommonError);
}
Service.testMeseage = async function(load){
    // await写法
    let data = await Api.get('/testMeseage', {})
    // 此处二次处理data.list数据

    return Service.handleCommonError(data)
}


export default Service;
