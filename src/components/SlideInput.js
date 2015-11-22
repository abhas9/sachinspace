import React from 'react';

export default React.createClass({
    getInitialState() {
        return { value: this.props.values.indexOf(this.props.value)};
    },

    handleChange(event) {
        this.props.changeHandler(this.props.values[parseInt(event.target.value, 10)]);
        this.setState(prevState => {
            return { value: parseInt(event.target.value, 10) };
        })
    },

    stopPropagation(event) {
        event.stopPropagation();
    },

    render() {
        return (
            <div className="range-input-wrp">
            <input
                className = 'range-input'
                type = 'range'
                min = '0'
                max = { this.props.values.length - 1 }
                onChange = { this.handleChange }
                onMouseDown = { this.stopPropagation }
                value = { this.state.value }/>
        </div>
        );
    }
});