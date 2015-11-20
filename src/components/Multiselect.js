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
            return {
                value: this.options.map(o => o.value).join(",")
            };
        },
        componentWillMount() {

        },

        componentDidMount() {

        },

        logChange(val) {
            console.log("Selected: ", val);
            this.setState({
                value: val
            });
            let component = this;
            let event = new CustomEvent('filterChange', {
                detail: {
                    propName: component.props.propname,
                    filterFunction: function(data) {
                        let values = val.map(function(v) {
                            return v.value
                        });
                        return data.filter(function(d) {
                            return values.indexOf(d[component.props.propname]) >= 0;
                        });
                    }
                }
            });
            document.dispatchEvent(event);
        },

        render() {

            return (
                <Select
            name="form-field-name"
            value={this.state.value}
            multi={true}
            options={this.options}
            onChange={this.logChange} />
            );
        }
});
