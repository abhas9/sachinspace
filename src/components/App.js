import React from 'react';
import masterdata from '../store/masterdata.js';
import Filter from './Filter.js';
import Result from './Result.js';

export default React.createClass({
  render() {
    return (
      <div>
          <Filter propname='opposition' type='multiselect' title='Vs' optional={false} />
          <Filter propname='ground' type='multiselect' title='Ground' optional={true} />
          <Filter propname='batting_score' type='range' title='Ground' optional={true} />
          <Filter propname='date' type='daterange' title='Ground' optional={false} />


          <Result />
          <h1>Hello Master Blaster</h1>
      </div>
    )
  }
});
