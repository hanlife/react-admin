import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class ReposChart extends React.Component {
    constructor(props){
        super(props)
    }
    getOption = () => ({
        title : {
          text: '仓库Stars详情',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
          {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
          ],
          itemStyle: {
            emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
          }
        ]
    });
    
    onChartClick = (param, echarts) => {
        console.log(param, echarts);
        alert('chart click');
        this.setState({
            cnt: this.state.cnt + 1,
        })
    };
    
    onChartLegendselectchanged = (param, echart) => {
        console.log(param, echart);
        alert('chart legendselectchanged');
    };
    
    onChartReady = (echarts) => {
        console.log('echart is ready', echarts);
    };
    render () {
        return (
            <ReactEcharts
                option={this.getOption()}
                style={{height: '300px', width: '100%'}}
                className='echarts-for-echarts'
                theme='my_theme' />
        )
    }
}