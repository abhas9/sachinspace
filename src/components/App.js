import React from 'react';
import masterdata from '../store/masterdata.js';
import Filters from './Filters.js';
import Result from './Result.js';

export default React.createClass({
  render() {
    return (
      <div>
          <Filters />
          <Result />
      </div>
    )
  }
});
