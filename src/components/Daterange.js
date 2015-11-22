import React from 'react';
import Select from 'react-select';
import masterdata from '../store/masterdata.js';
import _ from 'lodash';
import Nouislider from 'react-nouislider';

export default React.createClass({
    getInitialState() {
            let sortedProp = _.sortBy(masterdata, o => {
                return this.timestamp(o[this.props.propname]);
            }).map(o => {
                return o[this.props.propname];
            });
            sortedProp = sortedProp.filter(function(o) {
                return typeof o !== "undefined";
            });

            this.min = sortedProp[0];
            this.max = sortedProp[sortedProp.length - 1];

            let filterEventDetailsObj = this.filterEventDetails([this.min, this.max], !this.props.optional);
            let event = new CustomEvent('filterChange', filterEventDetailsObj);
            document.dispatchEvent(event);
            debugger;
            return {
                start: [this.timestamp(this.min), this.timestamp(this.max)],
                disabled: this.props.optional
            };
        },
        componentWillMount() {

        },

        componentDidMount() {

        },

        rangeChangeHandler(start) {
            debugger;
            start = start.map(s => parseInt(s));
            this.setState({
                start
            });
            let component = this;
            let filterEventDetailsObj = this.filterEventDetails(start, true);
            let event = new CustomEvent('filterChange', filterEventDetailsObj);
            document.dispatchEvent(event);
        },

        filterEventDetails(val, enabled) {
            let component = this;
            return {
                detail: {
                    propName: component.props.propname,
                    enabled: enabled,
                    filterFunction: function(data) {
                        return data.filter(function(d) {
                            return component.timestamp(d[component.props.propname]) >= component.timestamp(
                                    val[0]) && component.timestamp(d[component.props.propname]) <=
                                component.timestamp(
                                    val[1]);
                        });
                    }
                }
            };
        },

        toggleFilter(e) {
            this.setState(prevState => {
                prevState.disabled = !e.target.checked;
                return prevState;
            });
            let filterEventDetailsObj = this.filterEventDetails(this.state.start, e.target.checked);
            let event = new CustomEvent('filterChange', filterEventDetailsObj);
            document.dispatchEvent(event);
        },

        timestamp(str) {
            return new Date(str).getTime();
        },

        render() {
            let filterSwitch = '';
            if (this.props.optional) {
                filterSwitch =
                    <input type='checkbox' name='filterState' checked={!this.state.disabled} onChange={this.toggleFilter} />
            }
            let style = {
                display: (this.state.disabled) ? 'none' : 'block'
            };
            let component = this;

            function formatDate(timestamp) {
                timestamp = parseInt(timestamp);
                var a = new Date(timestamp);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
                    'Nov', 'Dec'
                ];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var time = month + ', ' + year;
                return time;
            }
            debugger;
            return (
                <div>
                    {filterSwitch}
                    <div style = {style}>
                        <Nouislider 
                            range = {{
                                        min: this.timestamp(this.min),
                                        max: this.timestamp(this.max)
                                    }}
                            step = {30 * 24 * 60 * 60 * 1000}
                            start = { this.state.start }
                            onChange = { this.rangeChangeHandler }
                            disabled={ this.state.disabled }
                            tooltips = {{ format : formatDate }}/>
                    </div>
                </div>
            );
        }
});
