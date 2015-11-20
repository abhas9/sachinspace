import React from 'react';
import Multiselect from './Multiselect.js';

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
            default: throw new Error("Unsupported Filter type");
        }

        return (
            component
        );
    }
});
