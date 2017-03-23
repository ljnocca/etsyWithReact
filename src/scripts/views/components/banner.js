import React from 'react'

var Banner = React.createClass({
	_handleKeyDown: function(eventObj){
		if(eventObj.keyCode === 13){
			location.hash = `search/${eventObj.target.value}`
			eventObj.target.value = ''
		}
	},

	render: function(){
		return(
			<div className="banner">
				<h1>Etsy 2.0</h1>
				<input type="text" placeholder="search Etsy" onKeyDown={this._handleKeyDown}/>
				<a href="#home">Home</a>
				<a href="#add">Add Your own Listing</a>
			</div>
			)
	}
})

export default Banner