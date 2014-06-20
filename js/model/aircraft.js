/*
 * fileName: aircraft.js
 * date: May 19, 2014
 * author: Nordanne Isahac <den.isahac@gmail.com>
 *
 */

 AircraftUpgrade.module('Model', function(Model, AircraftUpgrade, Backbone, Marionette, $, _) {
 	// model
 	// aircraft
 	Model.Aircraft = Backbone.Model.extend({
 		initialize: function() {
 			// TODO code goes here.
 		},
 		urlRoot: '/aircrafts',
 		defaults: {
 			aircraftId: 0,
 			categoryId: 0, // (foreign key)
 			make: '',
 			model: '',
 			//pdfOfTCDS: '', // pdfOfTCDS blob
 			year: new Date().getFullYear(),
 			registrationNNo: '',
 			serialNo: '',
 			engineId: 0, // (foreign key)
 			propellerId: 0, // (foreign key)
 			totalAirframeHours: new Date(),
 			tcNo: '',
 			tsmo: new Date(),
 		/*	exteriorPicture1: '', // exteriorPicture1 tinyblob
			exteriorPicture2: '', // exteriorPicture2 tinyblob
			exteriorPicture3: '', // exteriorPicture3 tinyblob
			interiorPicture1: '', // interiorPicture1 tinyblob
			interiorPicture2: '', // interiorPicture2 tinyblob
			interiorPicture3: '', // interiorPicture3 tinyblob
			panelPicture1: '', // panelPicture1 tinyblob
			panelPicture2: '', // panelPicture2 tinyblob
			panelPicture3: '', // panelPicture3 tinyblob
			cowlingPicture1: '', // cowlingPicture1 tinyblob
			cowlingPicture2: '', // cowlingPicture2 tinyblob
		*/
			aircraftCategory: new Model.AircraftCategory(), // aircraft category reference
			engine: new Model.Engine(), // engine reference
			propeller: new Model.Propeller(), // propeller reference
			owners: new Model.Owners(), // list of owners
			products: new Model.Products(), // list of products
 		}
 	});

	// collection of aircrafts
	Model.Aircrafts = Backbone.Collection.extend({
		initialize: function() {
			// TODO code goes here.
		},
		url: '/aircrafts',
		model: Model.Aircraft
	});
 });