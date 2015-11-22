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
    if (visualizationConfig.time.indexOf(this.state.key) < 0 && true) {
      let grouped = _.groupBy(this.props.data, this.state.key);
      let groups = Object.keys(grouped);
      
      for (let i = 0; i < groups.length; i++) {
        let o = {};
        o[this.state.key] = groups[i];
        for (let j = 0; j <visualizationConfig.matrix.length; j++) {
          o[visualizationConfig.matrix[j]] = _.sum(grouped[groups[i]],visualizationConfig.matrix[j]);
        }
        data.push(o)
      }
    } else {
      let grouped = _.groupBy(this.props.data, o => {
        if (this.data.length) {}
      });
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
          type: 'category'
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
