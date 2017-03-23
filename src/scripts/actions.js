import STORE from './store.js'
import {ListingModel} from './models/addedListingsModels.js'

const ACTIONS = {
	addListing: function(listingData) {

		var newListing = new ListingModel(listingData) // creates a 
			// new instance of IssueModel, setting the issueData
			// from the form as its .attributes. this data (username, 
			// status, etc.) is what backbone will put into the body
			// of the post request when we use .save()

		newListing.save() // backbone will here submit a post request
			// on our behalf.
			.then(
				// .then can actually take two callbacks, one to 
					// handle a good response, and one to handle
					// an error.
				function(response) {
					alert('saved one for ya!')
					ACTIONS.fetchAllListings()
				},
				function(err) {
					alert('problem saving your issue!')
					console.log(err)
				}
			)
	},

	fetchAllListings: function() {
		var listingColl = STORE.get('listingCollection')
		// backbone && jquery, on our behalf, will add a "GET" 
		// verb to the header of our request when we use 
		// .fetch()
		listingColl.fetch()
			.then(function() {
				STORE.set({
					listingCollection: listingColl
				})
			})
	}
}

export default ACTIONS