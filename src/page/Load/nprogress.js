import React from "react"
import BaseComponent from '../baseComponent'
import { Button } from 'antd';


export default class Nprogress extends BaseComponent{
    
    render(){
        return(
            <div>
                <p>
                    <Button icon="caret-right" onClick={this.nprogressStart} />
                    <span> NProgress.start() — 显示进度条</span>
                </p>
                <p style={{marginTop: 20}}>
                    <Button icon="caret-right" onClick={this.nprogressDone} />
                    <span>  NProgress.done() — 进度条完成</span>
                </p>
            </div>
        )
    }
}