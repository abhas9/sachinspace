import React from 'react';

export default React.createClass({
	render() {
		let buttons = [];
		for (let i = 0; i < this.props.views.length; i++) {
			buttons.push(<button key = {i} className = {this.props.view === this.props.views[i].view ? 'button-primary' : ''}
								 onClick={event =>{
                                    this.props.onClick(this.props.views[i].view);
						          }}
                                 style ={{marginLeft: '10px'}}>
                            {this.props.views[i].text}   
                        </button>);
		}
        return <div className = 'view-buttons-wrp'>{buttons}</div>;
	}
});