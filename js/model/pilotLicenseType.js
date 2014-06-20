/*
 * fileName: pilotLicenseType.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// pilot license type
 	Model.PilotLicenseType = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/pilotLicenseTypes',
 		defaults: {
 			licenseTypeId: 0,
 			licenseType: '',
 			owners: new Model.Owners(), // list of owners
 		}
 	});

 	// collection of pilot license types
 	Model.PilotLicenseTypes = Backbone.Collection.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		url: '/pilotLicenseTypes',
 		model: Model.PilotLicenseType
 	});
 });