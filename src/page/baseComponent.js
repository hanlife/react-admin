import React from 'react';
import NProgress from 'nprogress';
import BaseLayout from './baseLayout'
import 'nprogress/nprogress.css';

export default class BaseComponent extends React.Component {
    // 顶部进度条
    nprogressStart = () => {
        NProgress.start();
    };
    nprogressDone = () => {
        NProgress.done();
    };
    // 加载中
    openSpin(){
        BaseLayout.openSpin()
    }

    /**
     * 关闭等待弹窗
    */
    closeSpin() {
        BaseLayout.closeSpin()
    }
    
    common(){
        console.log('common')
    }
}