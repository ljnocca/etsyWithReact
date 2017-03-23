import Backbone from 'backbone'

export const ListingModel = Backbone.Model.extend({
	url: '/api/listings',
	idAttribute: '_id'
})

export const ListingCollection = Backbone.Collection.extend({
	comparator: function(mod) {

		return new Date(mod.get('createdAt')).getTime() * -1
	},
	model: ListingModel,
	url: '/api/listings'
})