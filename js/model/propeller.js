/*
 * fileName: propeller.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// propeller
	Model.Propeller = Backbone.Model.extend({
		initialize: function() {
			// TODO code goes here.
		},
		urlRoot: '/propellers',
		defaults: {
			propellerId: 0,
			model: '',
			manufacturerId: 0, // (foreign key)
			//picture: '', // picture tinyblob
			productManufacturer: new Model.ProductManufacturer(), // product manufacturer reference
			aircrafts: new Model.Aircrafts(), // list of aircrafts
		}
	});

	// collection of propellers
	Model.Propellers = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/propellers',
		model: Model.Propeller
	});
});