import React from 'react';
import Select from 'react-select';
import masterdata from '../store/masterdata.js';
import _ from 'lodash';

export default React.createClass({
    getInitialState() {
            this.options = _.sortBy(_.unique(masterdata, this.props.propname).map(o => {
                return {
                    value: o[this.props.propname],
                    label: o[this.props.propname]
                };
            }), o => o.value.toLowerCase());
            let initialValue = this.options.map(o => o.value).join(",");
            let filterEventDetailsObj = this.filterEventDetails(initialValue, !this.props.optional);
            let event = new CustomEvent('filterChange', filterEventDetailsObj);
            document.dispatchEvent(event);
            return {
                value: initialValue,
                disabled: this.props.optional
            };
        },
        componentWillMount() {

        },

        componentDidMount() {

        },

        selectChangeHandler(val) {
            val = val.map(function(v) {
                return v.value
            });
            this.setState(prevState => {
                prevState.value = val;
                return prevState;
            });
            let filterEventDetailsObj = this.filterEventDetails(val, true);
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
                            return val.indexOf(d[component.props.propname]) >= 0;
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
            let filterEventDetailsObj = this.filterEventDetails(this.state.value, e.target.checked);
            let event = new CustomEvent('filterChange', filterEventDetailsObj);
            document.dispatchEvent(event);
        },

        render() {
            let filterSwitchAndLabel = '';
            let labelClass = (this.props.title.indexOf(' ') > 0) ? ' small-label' : ''; 
            if (this.props.optional) {
                filterSwitchAndLabel =
                    <div className = 'checkbox-wrp'>
                        <input type = 'checkbox' id = {this.props.propname + 'Checkbox'} name = 'filterState' checked = {!this.state.disabled} onChange={this.toggleFilter} />
                        <label htmlFor={this.props.propname + 'Checkbox'} className = {'checkbox-label' + labelClass}>{this.props.title}</label>
                    </div>;
            }   else {
                filterSwitchAndLabel = <label className = {'select-label' + labelClass}>{this.props.title}</label>;
            }
            return (
                <div className = 'filter-wrp multiselect'>
                    {filterSwitchAndLabel}
                    <Select
                    name="form-field-name"
                    value={this.state.value}
                    multi={true}
                    options={this.options}
                    onChange={this.selectChangeHandler} 
                    disabled={this.state.disabled}/>
                </div>);
        }
});
