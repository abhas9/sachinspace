import React from 'react';
import Multiselect from './Multiselect.js';
import Range from './Range.js';
import Daterange from './Daterange.js';

export default React.createClass({
    componentWillMount() {
        //store.
    },

    componentDidMount() {

    },

    render() {
        let component;
        switch(this.props.type) {
            case "multiselect": component = <Multiselect propname={this.props.propname} title={this.props.title} optional={this.props.optional} />
                                break;
            case "range": component = <Range propname={this.props.propname} title={this.props.title} optional={this.props.optional} />
                                break;
            case "daterange": component = <Daterange propname={this.props.propname} title={this.props.title} optional={this.props.optional} />
                                break;
            default: throw new Error("Unsupported Filter type");
        }

        return (
            component
        );
    }
});
