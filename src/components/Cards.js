import React from 'react';
import Card from './Card.js';
import MasonryComponent from 'react-masonry-component';

let Masonry = MasonryComponent(React);

export default React.createClass({
  render() {
  	let cards = [];
  	for (let i = 0; i < this.props.data.length; i++) {
  		cards.push(<Card key = {i} {...this.props.data[i]} />)
  	}
  	let  masonryOptions = {
		    transitionDuration: 0
		};
    return (
      <Masonry className={'cards'} 
                elementType={'div'} 
                options={masonryOptions} 
                disableImagesLoaded={false}>
          {cards}
      </Masonry>
    )
  }
});
