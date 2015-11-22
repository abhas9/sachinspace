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
    render() {
    	let data = this.getFilteredData();
        return (
        <div>
      		{JSON.stringify(data)}
  		</div>
        )
    }
});
