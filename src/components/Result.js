import React from 'react';
import masterdata from '../store/masterdata.js';
import resultsConfig from '../config/results.js';
import _ from 'lodash';
import Cards from './Cards.js';
import Visualization from './Visualization.js';
import views from '../config/views.js';
import ViewButtons from './ViewButtons.js';

export default React.createClass({
    getInitialState() {
            return {
                filters: {},
                view: 'total'
            }
        },
        componentDidMount() {
            document.addEventListener('filterChange', this.filterChangeHandler, false);
        },
        filterChangeHandler(e) {
            console.log(e);
            this.setState(prevState => {
                prevState.filters[e.detail.propName] = {
                    filterFunction: e.detail.filterFunction,
                    enabled: e.detail.enabled
                }
                return prevState;
            });
        },

        getFilteredData() {
            let data = masterdata;
            for (let filter in this.state.filters) {
                if (this.state.filters.hasOwnProperty(filter)) {
                    if (this.state.filters[filter].enabled) {
                        data = this.state.filters[filter].filterFunction(data);
                    }
                }
            }
            return data;
        },
        updateView(view) {
            this.setState(prevState => {
                prevState.view = view;
                return prevState;
            });
        },
        getSummary(data, type) {
            let summary = [];
            for (let i = 0; i < resultsConfig.length; i++) {
                let count = data.filter(function(d) {
                    return typeof d[resultsConfig[i].key] !== "undefined";
                }).length;
                let maxOrMin = ['maximum', 'minimum'];
                let maxOrMinFunction = ['max', 'min'];
                if (resultsConfig[i].type === 'count' && type === 'total') {
                     let sum = _.sum(data, resultsConfig[i].key);
                    summary.push({
                        title: resultsConfig[i].title,
                        value: sum
                    });
                } else if (resultsConfig[i].type === 'count' && maxOrMin.indexOf(type) >= 0) {
                    let value = _[maxOrMinFunction[maxOrMin.indexOf(type)]](data, resultsConfig[i].key);
                    summary.push({
                        title: resultsConfig[i].title,
                        value: value[resultsConfig[i].key]
                    });
                } else if (resultsConfig[i].type === 'count' && type === 'average') {
                    let sum = _.sum(data, resultsConfig[i].key);

                    let average = Math.round((sum * 100) / count) / 100;
                    summary.push({
                        title: resultsConfig[i].title,
                        value: average
                    });
                } else if (resultsConfig[i].type === 'group') {
                    let grouped = _.groupBy(data, resultsConfig[i].key);
                    let value = {};
                    for (let group in grouped) {
                        if (grouped.hasOwnProperty(group)) {
                            if (type === 'total') {
                                value[group] = grouped[group].length;
                            } else if (type === 'average') {
                                value[group] = (Math.round((grouped[group].length / count) * 10000) / 100 )+ '%';
                            } 
                        }
                    }
                    if (Object.getOwnPropertyNames(value).length > 0) {
                        summary.push({
                            title: resultsConfig[i].title,
                            value: value
                        });
                    }
                }
            }
            return summary;
        },

        render() {
            let data = this.getFilteredData();
            let summary = this.getSummary(data, this.state.view);
            let component = this;
            return (
            <div className = 'results-outer'>
	            <ViewButtons view = {this.state.view} views = {views} onClick = {this.updateView} />
	            <div className = 'results-wrp'>
		            
		        	<div className = 'results-visualization-wrp'>
                        <h4>Summary</h4>
                        <Cards data = {summary} />
                        <hr />
                        <Visualization data = {data} id = 'summary-chart' view = {this.state.view}/>
                        <h4>Search Results</h4>
                        <Cards data = {data} />

		      		</div>
	  			</div>
  			</div>
            )
        }
});
