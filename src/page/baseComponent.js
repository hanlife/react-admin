import React from 'react';

export default class BaseComponent extends React.Component {
    constructor() {
        super();
    }
    // 公共方法
    common(){
        console.log('common')
    }
}