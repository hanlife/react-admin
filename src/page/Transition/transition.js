import React from 'react';
import BaseComponent from '../baseComponent'
import PageBreadcrumb from '../pageBreadcrumb'
import { Card, Col, Row, Switch } from 'antd';

export default class Transition extends BaseComponent {
    constructor(props){
      super(props)
      this.state = {
        animated: false,
        animatedOne: -1
      };
      this.handleAddItem = this.handleAddItem.bind(this);
      this.breadcrumb = [[null, 'Transition']]
    }
    animatedAll = (checked) => {
        checked && this.setState({animated: true});
        !checked && this.setState({animated: false});
    };
    animatedOne = (i) => {
        this.setState({animatedOne: i});
    };
    animatedOneOver = () => {
        this.setState({animatedOne: -1});
    };
    componentWillMount(){
      
    }
    handleAddItem() {
        
    }
    render() {
      const animations = [
        'bounce', 'flash', 'rubberBand', 'shake', 'headShake',
        'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown',
        'bounceInLeft', 'bounceInRight', 'bounceOut', 'bounceOutDown', 'bounceOutLeft',
        'bounceOutLeft', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft',
        'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut',
        'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
        'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
        'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
        'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
        'hinge', 'jackInTheBox', 'rollIn', 'rollOut','zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp',
        'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown',
        'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
    ];
      return (
        <div>
            <PageBreadcrumb breadcrumb={this.breadcrumb}/>
            <Row className="mb-m" style={{margin:"10px 0"}}>
                <a className="mr-s">全部动画(单个动画请移动鼠标)</a>
                <Switch onChange={this.animatedAll} />
            </Row>
            <Row gutter={16}>
              {animations.map((v, i) => (
                  <Col className="gutter-row" style={{margin:"5px 0"}} md={6} key={i}>
                      <div className="gutter-box">
                          <Card
                              className={`${this.state.animated || (this.state.animatedOne === i) ? v : ''} animated`}
                              onMouseEnter={() => this.animatedOne(i)}
                              onMouseLeave={() => this.animatedOneOver()}
                          >
                              <div className="pa-m text-center">
                                  <h3>{v}</h3>
                              </div>
                          </Card>
                      </div>
                  </Col>
              ))}
            </Row>
        </div>
      );
    }
}