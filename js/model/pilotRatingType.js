/*
 * fileName: pilotRatingType.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// pilot rating type
 	Model.PilotRatingType = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/pilotRatingTypes',
 		defaults: {
 			ratingTypeId: 0,
 			ratingType: '',
 			owners: new Model.Owners(), // list of owners
 		}
 	});

 	// collection of pilot rating types
 	Model.PilotRatingTypes = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/pilotRatingTypes',
 		model: Model.PilotRatingType
 	});
 });