import React from 'react';
import NProgress from 'nprogress';
import BaseLayout from './baseLayout'
import 'nprogress/nprogress.css';

export default class BaseComponent extends React.Component {
    // 顶部进度条
    static nprogressStart = () => {
        NProgress.start();
    };
    static nprogressDone = () => {
        NProgress.done();
    };
    // 加载中
    static openSpin(){
        BaseLayout.openSpin()
    }

    /**
     * 关闭等待弹窗
    */
    static closeSpin() {
        BaseLayout.closeSpin()
    }
    
    static common(){
        console.log('common')
    }
}