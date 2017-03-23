import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import ActiveListings from './views/activeListings'
import DetailedListings from './views/detailedListings'
import {EtsyCollection} from './models/etsyModels'
import {EtsyModel} from './models/etsySearchModel'
import STORE from './store.js'

import AddedListings from './views/addedListings'

var app = function(){
	var EtsyRouter = Backbone.Router.extend({
		routes:{
			'home': 'handleActiveListings',
			'add': 'handleAddedListings',
			'search/:query': 'handleEtsySearch',
			'details/:id': 'handleDetails',
			'*default': 'handleRedirect'
		},

		handleAddedListings:function(){
			ReactDOM.render(<AddedListings listingColl={STORE.data.listingCollection}/>, document.querySelector('.container'))
		},


		handleActiveListings: function(){
			var collectionInstance = new EtsyCollection()
			var promise = collectionInstance.fetch({
				dataType: 'jsonp',
				data:{
					'api_key': 'puo5vvna7bdawlcb885za35d',
					includes : 'Images'
				}

			})

			promise.then(function(){
				ReactDOM.render(<ActiveListings etsyColl={collectionInstance}/>,

				document.querySelector('.container'))
			})
		},

		handleEtsySearch: function(searchQuery){
			var searchInstance = new EtsyCollection()
			var promise = searchInstance.fetch({
				dataType: 'jsonp',
				data:{
					'api_key': 'puo5vvna7bdawlcb885za35d',
					includes : 'Images',
					keywords: searchQuery
				}
			})
			promise.then(function(){
				ReactDOM.render(<ActiveListings etsyColl={searchInstance}/>,
				document.querySelector('.container'))
			})
		},
		handleDetails: function(listingID){
			var modelInstance = new EtsyModel()
			modelInstance.url+= listingID + '.js'
			var promise = modelInstance.fetch({
				dataType: 'jsonp',
				data:{
					'api_key': 'puo5vvna7bdawlcb885za35d',
					includes : 'Images'
				}
			})
			promise.then(function(){
				console.log('working?')
				ReactDOM.render(<DetailedListings etsyModel={modelInstance}/>,
					document.querySelector('.container'))
			})
		},
		handleRedirect: function(){
			location.hash = 'home'
		}
	})
	new EtsyRouter
	Backbone.history.start()
}


// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..