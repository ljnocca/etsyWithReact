import React from 'react'
import Banner from './components/banner'

var ActiveListings = React.createClass({
	render: function(){
		console.log(this)
		return(
			<div className="etsy-listings">
				<Banner />
				<ListingCollection collection={this.props.etsyColl} />
			</div>
			)
	}
})

var ListingCollection = React.createClass({
	_makeListings: function(){
		var newArray = []
		for (var i = 0; i<this.props.collection.models.length; i++){
			newArray.push(<Listings model={this.props.collection.models[i]} />)
		}
		return newArray
	},
	render: function(){

		return(
			<div>
				{this._makeListings()}
			</div>
			)
	}
})

var Listings = React.createClass({

	render: function(){
		return(
			<div className = 'listing_div'>
				<a href={`#details/${this.props.model.get('listing_id')}`}>
					<img src={this.props.model.get('Images')[0].url_570xN}/>
					<h4>{this.props.model.get('title')}</h4>
					<h5>{'$'}{this.props.model.get('price')}</h5>
				</a>
			</div>
			)
	}
})


export default ActiveListings