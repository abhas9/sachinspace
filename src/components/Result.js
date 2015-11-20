import React from 'react';
import masterdata from '../store/masterdata.js';


export default React.createClass({
	getInitialState() {
		return {
			filters: {}
		}
    },
    componentDidMount() {
        document.addEventListener('filterChange', this.filterChangeHandler, false);
    },
    filterChangeHandler(e) {
        console.log(e);
        this.setState(prevState => {
        	prevState.filters[e.detail.propName] = e.detail.filterFunction;
        	return prevState;
        });
    },
    getFilteredData() {
    	let data = masterdata;
    	for (let filter in this.state.filters) {
    		if (this.state.filters.hasOwnProperty(filter)) {
    			data = this.state.filters[filter](data);
    		}
    	}
    	return data;
    },
    render() {
    	let data = this.getFilteredData();
        return (
        <div>
      		{JSON.stringify(data)}
  		</div>
        )
    }
});
