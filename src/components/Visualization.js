import React from 'react';
import SlideInput from './SlideInput.js';
import visualizationConfig from '../config/visualization.js';
import _ from 'lodash';
import c3 from 'c3';

export default React.createClass({
  getInitialState() {
      this.keys = visualizationConfig.group.concat(visualizationConfig.time);
      return {
        key: this.keys[0]
      };
  },

  xAxisChangeHandler(index) {
    this.setState(prevState => {
      prevState.key = index
      return prevState;
    });
  },
  renderChart() {
    let data = [];
    let grouped = {};
    if (visualizationConfig.time.indexOf(this.state.key) < 0) {
      grouped = _.groupBy(this.props.data, this.state.key);
    } else {
      let max = _.max(this.props.data, d => {
        if (!d.hasOwnProperty(this.state.key)) return -Infinity;
        return new Date(d[this.state.key]).getTime();
      });
      let min = _.min(this.props.data, d => {
        if (!d.hasOwnProperty(this.state.key)) return Infinity;
        return new Date(d[this.state.key]).getTime();
      });
      let groupByTime = '';
      let dateDiff = new Date(max[this.state.key]).getTime() - new Date(min[this.state.key]).getTime();
      if (dateDiff >= 94694400000) { // more than 3 years
        groupByTime = 'year';
      } else if (dateDiff >= 2592000000){
        groupByTime = 'month';
      } else {
        groupByTime = 'day';
      }
      grouped = _.groupBy(this.props.data, o => {
        let date = new Date(o[this.state.key]);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                    'Nov', 'Dec'];
        if (groupByTime === 'year') {
          return date.getFullYear();
        } else if (groupByTime === 'month'){
          return date.getFullYear() + ',' + months[date.getMonth()];
        } else {
          return date.getFullYear() + ',' + months[date.getMonth()] + ',' + date.getDate();
        }
      });
    }
    let groups = Object.keys(grouped);

    for (let i = 0; i < groups.length; i++) {
        let o = {};
        o[this.state.key] = groups[i];
        for (let j = 0; j <visualizationConfig.matrix.length; j++) {    
          if (this.props.view === 'total') {  
            o[visualizationConfig.matrix[j]] = _.sum(grouped[groups[i]],visualizationConfig.matrix[j]);
          } else if (this.props.view === 'average') {
            o[visualizationConfig.matrix[j]] = _.sum(grouped[groups[i]],visualizationConfig.matrix[j]);
            o[visualizationConfig.matrix[j]] = Math.round(o[visualizationConfig.matrix[j]] * 100 / grouped[groups[i]].length) / 100;
          } else if (this.props.view === 'maximum') {
            o[visualizationConfig.matrix[j]] = _.max(grouped[groups[i]],visualizationConfig.matrix[j])[visualizationConfig.matrix[j]];
          } else if (this.props.view === 'minimum') {
            o[visualizationConfig.matrix[j]] = _.min(grouped[groups[i]],visualizationConfig.matrix[j])[visualizationConfig.matrix[j]]; 
          }
        }
        data.push(o)
    }

    c3.generate({
        bindto: "#" + this.props.id,
        data: {
        json: data,
        keys: {
            x: this.state.key,
            value: visualizationConfig.matrix,
        }
      },
      axis: {
        x: {
          type: 'category',
          label: this.state.key
        }
      }
    });
  },
  componentDidMount() {
    this.renderChart();
  },
  componentDidUpdate() {
    this.renderChart();
  },
  render() {
    return (
      <div className={'visualization'}>
        <div id = {this.props.id}></div>
        <SlideInput values = {this.keys} changeHandler = {this.xAxisChangeHandler} value = {this.state.key}/>
      </div>
    )
  }
});
