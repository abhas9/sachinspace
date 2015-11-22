import React from 'react';
import filtersConfig from '../config/filters.js'
import Filter from './Filter.js';

export default React.createClass({
  render() {
    let filters = [];
    for (let i = 0; i < filtersConfig.length; i++) {
      filters.push(<Filter 
                    key = {filtersConfig[i].key}
                    propname={filtersConfig[i].key}
                    type={filtersConfig[i].type}
                    title={filtersConfig[i].title}
                    optional={filtersConfig[i].optional} />);
    }
    return (
      <div className = 'filters-wrp'>
          {filters}
      </div>
    )
  }
});
