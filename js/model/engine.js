/*
 * fileName: engines.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// engine
	Model.Engine = Backbone.Model.extend({
		initialize: function() {
			// TODO code goes here.
		},
		urlRoot: '/engines',
		defaults: {
			engineId: 0,
			model: '',
			manufacturerId: 0, // (foreign key)
			productManufacturer: new Model.ProductManufacturer(), // product manufacturer reference
			aircrafts: new Model.Aircrafts(), // list of aircrafts
		}
	});

	// collection of engines
	Model.Engines = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/engines',
		model: Model.Engine
	});
});