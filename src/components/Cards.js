import React from 'react';
import Card from './Card.js';


export default React.createClass({
  render() {
  	let cards = [];
  	for (let i = 0; i < this.props.data.length; i++) {
  		cards.push(<Card key = {i} {...this.props.data[i]} />)
  	}
    return (
      <div>
          {cards}
          <div style = {{clear: 'both'}}></div>
      </div>
    )
  }
});
