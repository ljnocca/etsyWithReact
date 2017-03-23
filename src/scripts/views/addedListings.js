import React from 'react'
import Banner from './components/banner'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

var AddedListings = React.createClass({

	componentWillMount:function(){
		ACTIONS.fetchAllListings()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	_handleSubmit: function(eventObj) {
		eventObj.preventDefault()
		var formEl = eventObj.target
		var listingData = {
			itemName: formEl.itemName.value,
			price: formEl.price.value,
			itemDescription: formEl.description.value
		}
		if (this._validate(listingData)) {
			// do something
		}
		formEl.reset()

		ACTIONS.addListing(listingData)
		
	},
	_validate: function(data) {
	
	},
	render: function() {
		console.log(this.props.listingColl)
		return(
			<div className="addedListing">
				<Banner />
				<form onSubmit={this._handleSubmit} className='listing-form' >
		 			<input className="inputClass" name="itemName" type="text" placeholder="your item" />
		 			<input className="inputClass" name="price" type="text" placeholder="price" />
		 			<input className="inputClass" name="itemDescription" type="text" placeholder="describe your item" />
		 			<button className="inputClass" type="submit">post my listing!</button>
		 			<ListingCollection collection={this.props.listingColl} />
		 		</form>
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
		console.log(this)
		return(
			<div>
				{this._makeListings()}
			</div>
			)
	}
})

var Listings = React.createClass({

	render: function(){
		console.log(this)
		return(
			<div className = 'listing_div'>
				<h3> {this.props.model.get('itemName')} </h3>
				<h5> {this.props.model.get('price')} </h5>
				<p> {this.props.model.get('itemDescription')} </p>
			</div>
			)
	}
})

export default AddedListings