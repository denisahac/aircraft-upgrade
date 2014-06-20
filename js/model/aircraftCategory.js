/*
 * fileName: aircraftCategory.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// aircraft category
 	Model.AircraftCategory = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/aircraftCategories',
 		defaults: {
 			categoryId: 0,
 			categoryName: '',
 			aircrafts: new Model.Aircrafts(), // list of aircrafts
 		}
 	});

 	// collection of aircraft categories
 	Model.AircraftCategories = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},	
 		url: '/aircraftCategories',
 		model: Model.AircraftCategory
 	});
 });