/*
 * fileName: owner.js
 * date: May 14, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */
AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
	// model
	// owner
	Model.Owner = Backbone.Model.extend({
		initialize: function() {
			// TODO code goes here.
		},
		urlRoot: '/owners',
		defaults: {
			ownerId: 0,
			username: '', // (foreign key)
			firstName: '',
			mi: '',
			lastName: '',
			streetAddress1: '',
			streetAddress2: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
			totalHoursFlight: new Date(),
			user: new Model.User(), // user reference
			aircrafts: new Model.Aircrafts(), // list of aircrafts
			pilotLicenseTypes: new Model.PilotLicenseTypes(), // list of pilot license types
			pilotRatingTypes: new Model.PilotRatingTypes(), // list of pilot rating types
		}
	});

	// Collection of models
	Model.Owners = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/owners',
		model: Model.Owner
	});
});