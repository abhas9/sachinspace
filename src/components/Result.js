import React from 'react';
import masterdata from '../store/masterdata.js';
import resultsConfig from '../config/results.js';
import _ from 'lodash';

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

        getSummary(data, type) {
            let summary = [];

            for (let i = 0; i < resultsConfig.length; i++) {
                let count = data.filter(function(d) {
                    return typeof d[resultsConfig[i].key] !== "undefined";
                }).length;
                if (resultsConfig[i].type === 'count' && type === 'total') {
                    let sum = _.sum(data, resultsConfig[i].key);
                    summary.push({
                        title: resultsConfig[i].title,
                        value: sum
                    });
                } else if (resultsConfig[i].type === 'count' && type === 'average') {
                    let sum = _.sum(data, resultsConfig[i].key);

                    let average = sum / count;
                    summary.push({
                        title: resultsConfig[i].title,
                        value: average
                    });
                } else if (resultsConfig[i].type === 'group') {
                    let grouped = _.groupBy(data, resultsConfig[i].key);
                    debugger;
                    let value = {};
                    for (let group in grouped) {
                        if (grouped.hasOwnProperty(group)) {
                            if (type === 'total') {
                                value[group] = grouped[group].length;
                            } else if (type === 'average') {
                                value[group] = (grouped[group].length / count) * 100;
                            }
                        }
                    }
                    summary.push({
                        title: resultsConfig[i].title,
                        value: value
                    });
                }
            }
            return summary;
        },

        render() {
            let data = this.getFilteredData();
            let summary = this.getSummary(data, this.state.view);
            let component = this;
            return (
                <div>
        	<button className={this.state.view === 'total'? 'button-primary' : ''}
        			onClick={function(){
        				component.setState(prevState => {
        					prevState.view = 'total';
        					return prevState;
        				})
        			}
        		} >Total</button>
        	<button className={this.state.view === 'average'? 'button-primary' : ''}
        			onClick={function(){
        				component.setState(prevState => {
        					prevState.view = 'average';
        					return prevState;
        				})
        			}
        		}>Average</button>
      		<pre>{JSON.stringify(summary, null, 2)}</pre>
      		<pre>{JSON.stringify(data,null, 2)}</pre>
  		</div>
            )
        }
});
