import React from 'react';
import Select from 'react-select';
import masterdata from '../store/masterdata.js';
import _ from 'lodash';
import Nouislider from 'react-nouislider';


export default React.createClass({
    getInitialState() {
            let sortedProp = _.sortBy(masterdata, this.props.propname).map(o => {
                return o[this.props.propname];
            });
            sortedProp = sortedProp.filter(function(o){
                return typeof o !== "undefined";
            });
            this.min = sortedProp[0];
            this.max = sortedProp[sortedProp.length - 1];
            return {
                start: [this.min, this.max]
            };
        },
        componentWillMount() {

        },

        componentDidMount() {

        },

        rangeChangeHandler(start) {
            start = start.map(s => parseInt(s));
            this.setState({start});
            let component = this;
            let event = new CustomEvent('filterChange', {
                detail: {
                    propName: component.props.propname,
                    filterFunction: function(data) {
                        return data.filter(function(d) {
                            return d[component.props.propname] >= start[0] && d[component.props.propname] <= start[1];
                        });
                    }
                }
            });
            document.dispatchEvent(event);
        },

        render() {
            return ( <Nouislider range = {
                    {
                        min: this.min,
                        max: this.max
                    }
                }
                step = {1}
                start = {this.state.start}
                onChange = {this.rangeChangeHandler}
                tooltips />
            );
        }
});
